export const jsContent = `const API_BASE_URL = 'https://smti.uk/campaign/api'; 
let currentDonationAmount = 0;
let campaignConfig = { mosadId: '', apiValid: '', groupe: '', category: '' };

let lockedSolicitorId = null;
let isSolicitorRequired = false;
let solicitorLoaded = false;

let selectedCurrency = '1'; 
let minAmountLimit = 0;

const formatMoney = (num) => num.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('custom-amount').focus();
    parseUrlParameters();
    fetchCampaignInfo();
    fetchSolicitors();
    fetchDonationConfig();
    setupEventListeners();
});

function parseUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const idParam = urlParams.get('id') || urlParams.get('solicitor');
    if (idParam) {
        lockedSolicitorId = parseInt(idParam);
        isSolicitorRequired = true;
        sessionStorage.setItem('savedSolicitorId', lockedSolicitorId); 
    } else {
        const savedId = sessionStorage.getItem('savedSolicitorId');
        if (savedId) {
            lockedSolicitorId = parseInt(savedId);
            isSolicitorRequired = true;
        }
    }

    if (isSolicitorRequired) {
        const sel = document.getElementById('solicitor-select');
        sel.innerHTML = '<option value="">טוען את המתרים...</option>';
    }

    const amountParam = urlParams.get('amount');
    const amountEl = document.getElementById('custom-amount');
    if (amountParam) {
        amountEl.value = amountParam;
        currentDonationAmount = parseFloat(amountParam);
    }

    const currParam = urlParams.get('currency');
    if (currParam === '2') {
        updateCurrencyVisuals('2');
    }

    const lockParam = urlParams.get('lock_amount');
    if (lockParam === '1' || lockParam === 'true') {
        amountEl.disabled = true;
    }

    const minParam = urlParams.get('min_amount');
    if (minParam) {
        minAmountLimit = parseFloat(minParam);
    }

    if (window.history.replaceState && window.location.search) {
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({path: cleanUrl}, '', cleanUrl);
    }
}

function updateCurrencyVisuals(val) {
    selectedCurrency = val;
    const symbol = val === '2' ? '$' : '₪';
    
    document.querySelectorAll('.curr-btn').forEach(btn => {
        if(btn.dataset.val === val) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    const floatingSymbol = document.querySelector('.floating-symbol');
    if(floatingSymbol) floatingSymbol.innerText = symbol;
    
    document.getElementById('custom-amount').dispatchEvent(new Event('input'));
}

async function fetchCampaignInfo() {
    try {
        const res = await fetch(\`\${API_BASE_URL}/info\`);
        const result = await res.json();
        
        if (result.status === 'success') {
            const data = result.data;
            document.getElementById('campaign-title').innerText = data.campaign_name || 'הכנסת כלה';
            document.getElementById('target-amount').innerText = \`₪\${data.target.toLocaleString('he-IL')}\`;
            
            document.getElementById('total-raised').innerText = \`₪\${formatMoney(data.total_raised)}\`;
            
            const ilsBadge = document.getElementById('total-ils-badge');
            const usdBadge = document.getElementById('total-usd-badge');
            
            if(ilsBadge) ilsBadge.innerText = \`₪\${formatMoney(data.total_ils || 0)}\`;
            if(usdBadge) usdBadge.innerText = \`$\${formatMoney(data.total_usd || 0)}\`;

            const percentage = data.percentage || 0;
            setTimeout(() => {
                const circle = document.getElementById('progress-circle');
                if (circle) circle.setAttribute('stroke-dasharray', \`\${percentage}, 100\`);
                
                const text = document.getElementById('progress-text');
                if (text) text.textContent = \`\${percentage}%\`;
            }, 100);
        }
    } catch (err) { console.error('שגיאה:', err); }
}

async function fetchSolicitors() {
    try {
        const res = await fetch(\`\${API_BASE_URL}/solicitors\`);
        const result = await res.json();
        
        if (result.status === 'success') {
            const listEl = document.getElementById('solicitors-list');
            const selectEl = document.getElementById('solicitor-select');
            listEl.innerHTML = '';
            
            if (!isSolicitorRequired) selectEl.innerHTML = '<option value="">בחר מתרים</option>';
            else selectEl.innerHTML = ''; 
            
            result.data.sort((a, b) => b.raised - a.raised).forEach(sol => {
                const target = sol.target_amount || 0;
                const percentage = sol.percentage || 0;
                const visualPercentage = percentage > 100 ? 100 : percentage;
                
                listEl.innerHTML += \`
                    <div class="solicitor-item">
                        <div class="sol-info">
                            <span class="sol-name">\${sol.name}</span>
                            <span class="sol-stats">
                                <span class="sol-total">₪\${formatMoney(sol.raised)}</span> מתוך ₪\${target.toLocaleString('he-IL')}
                            </span>
                        </div>
                        <div class="sol-breakdown">
                            <span class="sol-badge-ils">₪\${formatMoney(sol.raised_ils)}</span>
                            <span class="sol-badge-usd">$\${formatMoney(sol.raised_usd)}</span>
                        </div>
                        <div class="sol-progress">
                            <div class="sol-progress-bar">
                                <div class="sol-progress-fill" style="width: \${visualPercentage}%;"></div>
                            </div>
                            <span class="sol-percent">\${percentage}%</span>
                        </div>
                    </div>\`;
                    
                selectEl.innerHTML += \`<option value="\${sol.id}">\${sol.name}</option>\`;
            });

            if (isSolicitorRequired) {
                let found = result.data.find(s => s.id == lockedSolicitorId);
                if (!found) selectEl.innerHTML += \`<option value="\${lockedSolicitorId}">מתרים \${lockedSolicitorId}</option>\`;
                
                selectEl.value = lockedSolicitorId;
                selectEl.disabled = true;
                selectEl.style.background = '#e2e8f0';
                solicitorLoaded = true;
                document.getElementById('custom-amount').dispatchEvent(new Event('input'));
            } else {
                solicitorLoaded = true;
            }
        }
    } catch (err) { 
        console.error('שגיאה בטעינת מתרימים:', err); 
        solicitorLoaded = true; 
        document.getElementById('custom-amount').dispatchEvent(new Event('input'));
    }
}

async function fetchDonationConfig() {
    try {
        const res = await fetch(\`\${API_BASE_URL}/donation-info\`);
        const result = await res.json();
        if (result.status === 'success') {
            campaignConfig.mosadId = result.data.mosad_id;
            campaignConfig.apiValid = result.data.api_valid;
            campaignConfig.groupe = result.data.groupe || '';
            campaignConfig.category = result.data.category || '';
            initIframe();
        }
    } catch (err) { console.error('שגיאה:', err); }
}

function isValidIsraeliID(id) {
    id = String(id).trim();
    if (id.length > 9 || isNaN(id)) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    let sum = 0;
    for (let i = 0; i < id.length; i++) {
        let incNum = Number(id[i]) * ((i % 2) + 1);
        sum += incNum > 9 ? incNum - 9 : incNum;
    }
    return sum % 10 === 0;
}

function validateField(inputEl, type) {
    const val = inputEl.value.trim();
    if (val === '') { inputEl.classList.remove('input-error'); return true; }
    
    let isValid = true;
    if (type === 'email') isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val);
    else if (type === 'phone') isValid = /^0[2-9]\\d{7,8}$/.test(val.replace(/[-]/g, ''));
    else if (type === 'zeout') isValid = isValidIsraeliID(val);

    if (!isValid) {
        inputEl.classList.add('input-error'); return false;
    } else {
        inputEl.classList.remove('input-error'); return true;
    }
}

function setupEventListeners() {
    const amountInput = document.getElementById('custom-amount');
    
    document.querySelectorAll('.curr-btn').forEach(btn => {
        btn.addEventListener('click', (e) => updateCurrencyVisuals(e.target.dataset.val));
    });

    document.getElementById('email').addEventListener('blur', function() { validateField(this, 'email'); });
    document.getElementById('phone').addEventListener('blur', function() { validateField(this, 'phone'); });
    document.getElementById('zeout').addEventListener('blur', function() { validateField(this, 'zeout'); });
    
    ['email', 'phone', 'zeout'].forEach(id => {
        document.getElementById(id).addEventListener('input', function() { this.classList.remove('input-error'); });
    });

    amountInput.addEventListener('input', () => {
        const amount = parseFloat(amountInput.value) || 0;
        const payBtn = document.getElementById('pay-btn');
        const symbol = selectedCurrency === '2' ? '$' : '₪';
        
        if (isSolicitorRequired && !solicitorLoaded) {
             payBtn.innerText = 'מזהה מתרים...'; payBtn.disabled = true; return;
        }

        if (amount > 0 && amount >= minAmountLimit) {
            currentDonationAmount = amount;
            payBtn.innerText = \`לתשלום מאובטח \${symbol}\${amount.toLocaleString()}\`;
            payBtn.disabled = false;
        } else if (amount > 0 && amount < minAmountLimit) {
            currentDonationAmount = 0;
            payBtn.innerText = \`מינימום לתרומה: \${symbol}\${minAmountLimit}\`;
            payBtn.disabled = true;
        } else {
            currentDonationAmount = 0;
            payBtn.innerText = 'הזן סכום';
            payBtn.disabled = true;
        }
    });

    document.getElementById('pay-btn').addEventListener('click', processPayment);
}

function initIframe() {
    const iframe = document.getElementById('NedarimFrame');
    iframe.src = "https://matara.pro/nedarimplus/iframe?language=he&v=" + Date.now();
    iframe.onload = () => {
        if (iframe.src !== "about:blank") iframe.contentWindow.postMessage({'Name': 'GetHeight'}, "*");
    };
}

function processPayment() {
    if (currentDonationAmount <= 0) return;
    
    if (!campaignConfig.apiValid) {
        showModal('שגיאה', 'חסרות הגדרות סליקה מהשרת (API Valid). נסה שוב מאוחר יותר או רענן את הדף.', 'error');
        return;
    }

    const emailEl = document.getElementById('email');
    const phoneEl = document.getElementById('phone');
    const zeoutEl = document.getElementById('zeout');
    
    validateField(emailEl, 'email');
    validateField(phoneEl, 'phone');
    validateField(zeoutEl, 'zeout');

    const emailVal = emailEl.classList.contains('input-error') ? '' : emailEl.value.trim();
    const phoneVal = phoneEl.classList.contains('input-error') ? '' : phoneEl.value.trim();
    const zeoutVal = zeoutEl.classList.contains('input-error') ? '' : zeoutEl.value.trim();

    const payBtn = document.getElementById('pay-btn');
    payBtn.innerText = 'מעבד...';
    payBtn.disabled = true;

    let rawComment = document.getElementById('comment').value || '';
    const solSelect = document.getElementById('solicitor-select');
    const solName = solSelect.options[solSelect.selectedIndex]?.text || '';
    if (solSelect.value) rawComment += \` | מתרים: \${solName}\`;

    const iframe = document.getElementById('NedarimFrame');
    iframe.contentWindow.postMessage({
        'Name': 'FinishTransaction2',
        'Value': {
            'Mosad': campaignConfig.mosadId,
            'ApiValid': campaignConfig.apiValid,
            'Amount': currentDonationAmount,
            'FirstName': document.getElementById('fname').value,
            'LastName': document.getElementById('lname').value,
            'Mail': emailVal,
            'Phone': phoneVal,
            'Zeout': zeoutVal,
            'Groupe': campaignConfig.groupe,
            'Category': campaignConfig.category,
            'Comment': rawComment,
            'Param1': solSelect.value, 
            'PaymentType': 'Ragil',
            'Currency': selectedCurrency, 
            'CallBack': \`\${API_BASE_URL}/webhook\`
        }
    }, "*");
}

window.addEventListener('message', function(event) {
    if (!event.origin.includes("matara.pro") && !event.origin.includes("nedarimplus")) return;
    if (!event.data || !event.data.Name) return;

    if (event.data.Name === 'Height') {
        document.getElementById('iframe-loader').style.display = 'none';
    }
    
    if (event.data.Name === 'TransactionResponse') {
        const payBtn = document.getElementById('pay-btn');
        if (event.data.Value.Status === 'Error') {
            showModal('שגיאה בתשלום', event.data.Value.Message, 'error');
            const symbol = selectedCurrency === '2' ? '$' : '₪';
            payBtn.innerText = \`לתשלום מאובטח \${symbol}\${currentDonationAmount.toLocaleString()}\`;
            payBtn.disabled = false;
        } else {
            showModal('תזכו למצוות!', \`התרומה התקבלה בהצלחה.\\nאישור עסקה: \${event.data.Value.TransactionId}\`, 'success');
            resetForm();
            fetchCampaignInfo(); 
            fetchSolicitors();   
        }
    }
});

function resetForm() {
    document.getElementById('custom-amount').value = '';
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('zeout').value = '';
    document.getElementById('comment').value = '';
    
    ['email', 'phone', 'zeout'].forEach(id => document.getElementById(id).classList.remove('input-error'));
    
    currentDonationAmount = 0;
    const payBtn = document.getElementById('pay-btn');
    payBtn.innerText = 'הזן סכום';
    payBtn.disabled = true;
    
    document.getElementById('iframe-loader').style.display = 'flex';
    initIframe();
    document.getElementById('custom-amount').focus();
}

function showModal(title, text, type) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerText = text;
    document.getElementById('modal-icon').className = \`sa-icon sa-\${type}\`;
    document.getElementById('modal-overlay').classList.add('show');
    document.getElementById('custom-modal').classList.add('show');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('show');
    document.getElementById('custom-modal').classList.remove('show');
}
`;
