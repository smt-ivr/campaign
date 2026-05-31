export const jsContent = `const API_BASE_URL = 'https://smti.uk/campaign/api'; 
let currentDonationAmount = 0;
let campaignConfig = { mosadId: '', apiValid: '', groupe: '', CallBackMailError: '' };

let lockedSolicitorId = null;
let isSolicitorRequired = false;
let solicitorLoaded = false;

let selectedCurrency = '1'; 
let minAmountLimit = 0;
let currentLang = 'he';

const formatMoney = (num) => num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const translations = {
    he: {
        loadingTitle: "קמפיין הכנסת כלה",
        defaultCampaignName: "קמפיין",
        raisedFrom: "מתוך",
        solicitorsTitle: "מתרימי הקמפיין",
        loadingData: "טוען נתונים...",
        donateTitle: "השותפות שלך",
        enterAmount: "סכום לתרומה",
        fname: "שם פרטי",
        lname: "שם משפחה",
        phone: "טלפון",
        zeout: "תעודת זהות (לא חובה)",
        email: "אימייל",
        comment: "הערות",
        selectSolicitor: "בחר מתרים",
        loadingSolicitors: "טוען מתרימים...",
        loadingIframe: "טוען סליקה מאובטחת...",
        enterAmountBtn: "הזן סכום",
        paySecure: "לתשלום מאובטח",
        minAmount: "מינימום לתרומה:",
        identifyingSol: "מזהה מתרים...",
        processing: "מעבד...",
        errTitle: "שגיאה",
        errConfig: "חסרות הגדרות סליקה מהשרת (API Valid). נסה שוב מאוחר יותר או רענן את הדף.",
        errPay: "שגיאה בתשלום",
        successTitle: "תזכו למצוות!",
        successMsg: "התרומה התקבלה בהצלחה.\\nאישור עסקה:",
        solPrefix: "מתרים",
        personalArea: "מתרימים"
    },
    en: {
        loadingTitle: "קמפיין הכנסת כלה",
        defaultCampaignName: "Campaign",
        raisedFrom: "raised out of",
        solicitorsTitle: "Campaign Solicitors",
        loadingData: "Loading data...",
        donateTitle: "Your Partnership",
        enterAmount: "Donation Amount",
        fname: "First Name",
        lname: "Last Name",
        phone: "Phone",
        zeout: "ID (Optional)",
        email: "Email",
        comment: "Comments",
        selectSolicitor: "Select Solicitor",
        loadingSolicitors: "Loading solicitors...",
        loadingIframe: "Loading secure payment...",
        enterAmountBtn: "Enter Amount",
        paySecure: "Secure Payment",
        minAmount: "Min Donation:",
        identifyingSol: "Identifying solicitor...",
        processing: "Processing...",
        errTitle: "Error",
        errConfig: "Missing payment configuration from server. Please try again later.",
        errPay: "Payment Error",
        successTitle: "Thank You!",
        successMsg: "Donation received successfully.\\nTransaction ID:",
        solPrefix: "Solicitor",
        personalArea: "Solicitor Login"
    }
};

const t = (key) => translations[currentLang][key] || key;

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    document.getElementById('custom-amount').focus();
    parseUrlParameters();
    fetchCampaignInfo();
    fetchSolicitors();
    fetchDonationConfig();
    setupEventListeners();
});

function initLanguage() {
    const path = window.location.pathname;
    
    let detected = null;
    if (path.includes('/en')) detected = 'en';
    else if (path.includes('/he')) detected = 'he';
    
    if (detected) {
        currentLang = detected;
        localStorage.setItem('campaign_lang', currentLang);
    } else {
        const saved = localStorage.getItem('campaign_lang');
        if (saved && translations[saved]) {
            currentLang = saved;
        } else if (navigator.language.startsWith('en')) {
            currentLang = 'en';
        }
    }
    
    if (currentLang === 'en') {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        selectedCurrency = '2'; 
        updateCurrencyVisuals('2');
    }

    applyTranslations();
    updateLangButtons();
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerText = translations[currentLang][key];
        }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) {
            el.placeholder = translations[currentLang][key];
        }
    });
}

function parseUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const idParam = urlParams.get('id') || urlParams.get('solicitor');
    if (idParam) {
        lockedSolicitorId = parseInt(idParam);
        isSolicitorRequired = true;
        localStorage.setItem('savedSolicitorId', lockedSolicitorId); 
    } else {
        const savedId = localStorage.getItem('savedSolicitorId');
        if (savedId) {
            lockedSolicitorId = parseInt(savedId);
            isSolicitorRequired = true;
        }
    }

    if (isSolicitorRequired) {
        const sel = document.getElementById('solicitor-select');
        if (sel) sel.innerHTML = '<option value="">' + t('loadingSolicitors') + '</option>';
    }

    const amountParam = urlParams.get('amount');
    const amountEl = document.getElementById('custom-amount');
    if (amountParam && amountEl) {
        amountEl.value = amountParam;
        currentDonationAmount = parseFloat(amountParam);
    }

    const currParam = urlParams.get('currency');
    if (currParam) {
        updateCurrencyVisuals(currParam);
    }

    const lockCurrParam = urlParams.get('lock_currency');
    if ((lockCurrParam === '1' || lockCurrParam === 'true') && currParam) {
        const toggleEl = document.getElementById('currency-toggle');
        if (toggleEl) {
            toggleEl.style.pointerEvents = 'none';
            toggleEl.style.opacity = '0.7';
        }
    }

    const lockParam = urlParams.get('lock_amount');
    if ((lockParam === '1' || lockParam === 'true') && amountEl) {
        amountEl.disabled = true;
    }

    const minParam = urlParams.get('min_amount');
    if (minParam) {
        minAmountLimit = parseFloat(minParam);
    }

    if (window.history.replaceState && idParam) {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete('id');
        currentUrl.searchParams.delete('solicitor');
        window.history.replaceState({}, document.title, currentUrl.toString());
    }
}

function updateCurrencyVisuals(val) {
    selectedCurrency = val;
    
    document.querySelectorAll('.curr-btn').forEach(btn => {
        if(btn.dataset.val === val) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    document.getElementById('custom-amount').dispatchEvent(new Event('input'));
}

async function fetchCampaignInfo() {
    try {
        const res = await fetch(API_BASE_URL + '/info');
        const result = await res.json();
        
        if (result.status === 'success') {
            const data = result.data;
            document.getElementById('campaign-title').innerText = data.campaign_name || t('defaultCampaignName');
            document.getElementById('target-amount').innerText = '₪' + data.target.toLocaleString('en-US');
            
            document.getElementById('total-raised').innerText = '₪' + formatMoney(data.total_raised);
            
            const ilsBadge = document.getElementById('total-ils-badge');
            const usdBadge = document.getElementById('total-usd-badge');
            
            if(ilsBadge) ilsBadge.innerText = '₪' + formatMoney(data.total_ils || 0);
            if(usdBadge) usdBadge.innerText = '$' + formatMoney(data.total_usd || 0);

            const percentage = data.percentage || 0;
            setTimeout(() => {
                const circle = document.getElementById('progress-circle');
                if (circle) circle.setAttribute('stroke-dasharray', percentage + ', 100');
                
                const text = document.getElementById('progress-text');
                if (text) text.textContent = percentage + '%';
            }, 100);
        }
    } catch (err) { console.error(err); }
}

async function fetchSolicitors() {
    try {
        const res = await fetch(API_BASE_URL + '/solicitors');
        const result = await res.json();
        
        if (result.status === 'success') {
            const listEl = document.getElementById('solicitors-list');
            const selectEl = document.getElementById('solicitor-select');
            listEl.innerHTML = '';
            
            if (!isSolicitorRequired) selectEl.innerHTML = '<option value="">' + t('selectSolicitor') + '</option>';
            else selectEl.innerHTML = ''; 
            
            result.data.sort((a, b) => b.raised - a.raised).forEach(sol => {
                const target = sol.target_amount || 0;
                const percentage = sol.percentage || 0;
                const visualPercentage = percentage > 100 ? 100 : percentage;
                
                listEl.innerHTML += 
                    '<div class="solicitor-item">' +
                        '<div class="sol-info">' +
                            '<span class="sol-name">' + sol.name + '</span>' +
                            '<span class="sol-stats">' +
                                '<span class="sol-total">₪' + formatMoney(sol.raised) + '</span> ' + t('raisedFrom') + ' ₪' + target.toLocaleString('en-US') +
                            '</span>' +
                        '</div>' +
                        '<div class="sol-breakdown">' +
                            '<span class="sol-badge-ils">₪' + formatMoney(sol.raised_ils) + '</span>' +
                            '<span class="sol-badge-usd">$' + formatMoney(sol.raised_usd) + '</span>' +
                        '</div>' +
                        '<div class="sol-progress">' +
                            '<div class="sol-progress-bar">' +
                                '<div class="sol-progress-fill" style="width: ' + visualPercentage + '%;"></div>' +
                            '</div>' +
                            '<span class="sol-percent">' + percentage + '%</span>' +
                        '</div>' +
                    '</div>';
                    
                if (selectEl) selectEl.innerHTML += '<option value="' + sol.id + '">' + sol.name + '</option>';
            });

            if (isSolicitorRequired && selectEl) {
                let found = result.data.find(s => s.id == lockedSolicitorId);
                if (!found) selectEl.innerHTML += '<option value="' + lockedSolicitorId + '">' + t('solPrefix') + ' ' + lockedSolicitorId + '</option>';
                
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
        solicitorLoaded = true; 
        document.getElementById('custom-amount').dispatchEvent(new Event('input'));
    }
}

async function fetchDonationConfig() {
    try {
        const res = await fetch(API_BASE_URL + '/donation-info');
        const result = await res.json();
        if (result.status === 'success') {
            campaignConfig.mosadId = result.data.mosad_id;
            campaignConfig.apiValid = result.data.api_valid;
            campaignConfig.groupe = result.data.groupe || '';
            campaignConfig.CallBackMailError = result.data.CallBackMailError || '';
            initIframe();
        }
    } catch (err) { console.error(err); }
}

function validateField(inputEl, type) {
    const val = inputEl.value.trim();
    if (val === '') { inputEl.classList.remove('input-error'); return true; }
    
    let isValid = true;
    
    if (type === 'email') {
        isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val);
    } 
    else if (type === 'phone') {
        isValid = val.length >= 5; 
    } 
    else if (type === 'zeout') {
        isValid = /^[0-9]+$/.test(val); 
    }

    if (!isValid) {
        inputEl.classList.add('input-error'); 
        return false;
    } else {
        inputEl.classList.remove('input-error'); 
        return true;
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
             payBtn.innerText = t('identifyingSol'); payBtn.disabled = true; return;
        }

        if (amount > 0 && amount >= minAmountLimit) {
            currentDonationAmount = amount;
            payBtn.innerText = t('paySecure') + ' ' + symbol + amount.toLocaleString();
            payBtn.disabled = false;
        } else if (amount > 0 && amount < minAmountLimit) {
            currentDonationAmount = 0;
            payBtn.innerText = t('minAmount') + ' ' + symbol + minAmountLimit;
            payBtn.disabled = true;
        } else {
            currentDonationAmount = 0;
            payBtn.innerText = t('enterAmountBtn');
            payBtn.disabled = true;
        }
    });

    document.getElementById('pay-btn').addEventListener('click', processPayment);
}

function initIframe() {
    const iframe = document.getElementById('NedarimFrame');
    const nedarimLang = currentLang === 'en' ? 'en' : 'he';
    iframe.src = 'https://matara.pro/nedarimplus/iframe?language=' + nedarimLang + '&v=' + Date.now();
    iframe.onload = () => {
        if (iframe.src !== "about:blank") iframe.contentWindow.postMessage({'Name': 'GetHeight'}, "*");
    };
}

function processPayment() {
    if (currentDonationAmount <= 0) return;
    
    if (!campaignConfig.apiValid) {
        showModal(t('errTitle'), t('errConfig'), 'error');
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
    payBtn.innerText = t('processing');
    payBtn.disabled = true;

    let rawComment = document.getElementById('comment').value || '';
    const solSelect = document.getElementById('solicitor-select');
    const solName = solSelect ? (solSelect.options[solSelect.selectedIndex]?.text || '') : '';
    const finalSolId = solSelect ? solSelect.value : (lockedSolicitorId || '');
    if (finalSolId && solName) rawComment += ' | Solicitor: ' + solName;

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
            'CallBackMailError': campaignConfig.CallBackMailError,
            'Comment': rawComment,
            'Param1': finalSolId, 
            'PaymentType': 'Ragil',
            'Currency': selectedCurrency, 
            'CallBack': API_BASE_URL + '/webhook'
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
            showModal(t('errPay'), event.data.Value.Message, 'error');
            const symbol = selectedCurrency === '2' ? '$' : '₪';
            payBtn.innerText = t('paySecure') + ' ' + symbol + currentDonationAmount.toLocaleString();
            payBtn.disabled = false;
        } else {
            showModal(t('successTitle'), t('successMsg') + ' ' + event.data.Value.TransactionId, 'success');
            resetForm();
            fetchCampaignInfo(); 
            fetchSolicitors();   
        }
    }
});

function resetForm() {
    const amountEl = document.getElementById('custom-amount');
    if (!amountEl.disabled) amountEl.value = '';
    
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('zeout').value = '';
    document.getElementById('comment').value = '';
    
    ['email', 'phone', 'zeout'].forEach(id => document.getElementById(id).classList.remove('input-error'));
    
    if (!amountEl.disabled) {
        currentDonationAmount = 0;
        const payBtn = document.getElementById('pay-btn');
        payBtn.innerText = t('enterAmountBtn');
        payBtn.disabled = true;
    }
    
    document.getElementById('iframe-loader').style.display = 'flex';
    initIframe();
    document.getElementById('custom-amount').focus();
}

function showModal(title, text, type) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerText = text;
    document.getElementById('modal-icon').className = 'sa-icon sa-' + type;
    document.getElementById('modal-overlay').classList.add('show');
    document.getElementById('custom-modal').classList.add('show');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('show');
    document.getElementById('custom-modal').classList.remove('show');
}

/* ======== לוגיקת החלפת שפה ותמונה ======== */
window.setLanguage = function(lang) {
    if (currentLang === lang) return; 

    localStorage.setItem('campaign_lang', lang);
    currentLang = lang;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'he' ? 'rtl' : 'ltr';
    
    // החלפת מטבע בהתאם לשפה
    selectedCurrency = currentLang === 'en' ? '2' : '1'; 
    updateCurrencyVisuals(selectedCurrency);
    
    applyTranslations();
    updateLangButtons();
    
    // רענון טופס סליקה
    document.getElementById('iframe-loader').style.display = 'flex';
    initIframe();
};

function updateLangButtons() {
    const btnHe = document.getElementById('btn-lang-he');
    const btnEn = document.getElementById('btn-lang-en');
    if (btnHe && btnEn) {
        if (currentLang === 'he') {
            btnHe.classList.add('active');
            btnEn.classList.remove('active');
        } else {
            btnEn.classList.add('active');
            btnHe.classList.remove('active');
        }
    }
}

window.showImage = function(src) {
    document.getElementById('modal-title').innerText = '';
    document.getElementById('modal-text').innerHTML = '<img src="' + src + '" style="max-width:100%; border-radius:8px; display:block; margin:0 auto;">';
    document.getElementById('modal-icon').className = ''; 
    document.getElementById('modal-overlay').classList.add('show');
    document.getElementById('custom-modal').classList.add('show');
};
`;
