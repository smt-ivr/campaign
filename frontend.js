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
        personalArea: "מתרימים",
        paymentsLabel: "תשלומים",
        paymentCalc: "חישוב תשלומים:",
        paymentsOf: "תשלומים של",
        perMonth: "בחודש",
        recentDonations: "תרומות אחרונות",
        noDonations: "טרם התקבלו תרומות פומביות"
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
        personalArea: "Solicitor Login",
        paymentsLabel: "Payments",
        paymentCalc: "Payment breakdown:",
        paymentsOf: "payments of",
        perMonth: "per month",
        recentDonations: "Recent Donations",
        noDonations: "No public donations yet"
    }
};

const t = (key) => translations[currentLang][key] || key;

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    injectPaymentsAndDonationsUI();
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
    
    const pLabel = document.getElementById('payments-label-text');
    if (pLabel) pLabel.innerText = t('paymentsLabel');
    updatePaymentBreakdown();
}

function injectPaymentsAndDonationsUI() {
    // הזרקת סגנונות CSS ייעודיים למודל התרומות ולכפתור המעוצב
    if (!document.getElementById('custom-donations-styles')) {
        const style = document.createElement('style');
        style.id = 'custom-donations-styles';
        style.innerHTML = \`
            /* כפתור תרומות מודרני */
            .btn-donations-modern {
                background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
                border: 1px solid #cbd5e1;
                color: #334155;
                padding: 6px 18px;
                border-radius: 24px;
                font-size: 0.95rem;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                transition: all 0.3s ease;
                margin: 10px;
                font-family: inherit;
            }
            .btn-donations-modern:hover {
                background: #fff;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                border-color: #94a3b8;
                transform: translateY(-1px);
            }
            .btn-donations-modern svg { width: 18px; height: 18px; fill: #ef4444; }
            
            /* רקע מודל ייעודי */
            .donations-overlay {
                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);
                z-index: 9998; display: none; opacity: 0; transition: opacity 0.3s ease;
            }
            .donations-overlay.show { display: block; opacity: 1; }
            
            /* קונטיינר מודל תרומות */
            .donations-modal-container {
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.95);
                background: #f8fafc; width: 92%; max-width: 550px; height: 85vh; max-height: 700px;
                border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                z-index: 9999; display: none; opacity: 0; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                flex-direction: column; overflow: hidden; font-family: inherit;
            }
            .donations-modal-container.show { display: flex; opacity: 1; transform: translate(-50%, -50%) scale(1); }
            
            /* כותרת מודל */
            .donations-modal-header {
                padding: 20px 24px; border-bottom: 1px solid #e2e8f0;
                display: flex; justify-content: space-between; align-items: center;
                background: #ffffff;
            }
            .donations-modal-header h3 { margin: 0; font-size: 1.4rem; color: #1e293b; font-weight: 800; display:flex; align-items:center; gap:10px; }
            .donations-close-btn {
                background: #f1f5f9; border: none; font-size: 1.5rem; cursor: pointer; color: #64748b;
                width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
                transition: all 0.2s; padding: 0; line-height: 1;
            }
            .donations-close-btn:hover { background: #fee2e2; color: #ef4444; }
            
            /* גוף מודל (התרומות) */
            .donations-modal-body {
                padding: 16px; overflow-y: auto; flex: 1; background: #f8fafc;
            }
            
            /* עיצוב כרטיסיית תרומה בודדת */
            .donation-card {
                background: #ffffff; margin-bottom: 16px; padding: 18px; border-radius: 16px;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
                border: 1px solid #f1f5f9; display: flex; flex-direction: column; gap: 10px;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .donation-card:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.08); border-color: #e2e8f0; }
            .donation-header { display: flex; justify-content: space-between; align-items: center; }
            .donation-name { font-weight: 800; color: #0f172a; font-size: 1.15rem; }
            .donation-amount { 
                background: #ecfdf5; color: #059669; padding: 6px 14px; 
                border-radius: 20px; font-weight: 800; font-size: 1.1rem; border: 1px solid #d1fae5;
            }
            .donation-comment {
                background: #f1f5f9; padding: 12px 14px; border-radius: 10px; color: #475569;
                font-size: 0.95rem; font-style: italic; position: relative; border-right: 4px solid #cbd5e1;
            }
            html[dir="ltr"] .donation-comment { border-right: none; border-left: 4px solid #cbd5e1; }
            .donation-footer {
                display: flex; justify-content: space-between; font-size: 0.85rem; color: #94a3b8;
                margin-top: 4px; font-weight: 500;
            }
            
            /* פס גלילה מותאם */
            .donations-modal-body::-webkit-scrollbar { width: 8px; }
            .donations-modal-body::-webkit-scrollbar-track { background: transparent; }
            .donations-modal-body::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; border: 2px solid #f8fafc; }
            .donations-modal-body::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        \`;
        document.head.appendChild(style);
    }

    // הזרקת ה-HTML של המודל הייעודי
    if (!document.getElementById('donations-modal-overlay')) {
        const modalHtml = \`
            <div id="donations-modal-overlay" class="donations-overlay"></div>
            <div id="donations-modal" class="donations-modal-container">
                <div class="donations-modal-header">
                    <h3>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#ef4444"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/></svg>
                        <span data-i18n="recentDonations">\${t('recentDonations')}</span>
                    </h3>
                    <button class="donations-close-btn" onclick="closeDonationsModal()">&times;</button>
                </div>
                <div class="donations-modal-body" id="donations-modal-body"></div>
            </div>
        \`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        document.getElementById('donations-modal-overlay').addEventListener('click', closeDonationsModal);
    }

    // הזרקת שדה תשלומים (Tashlumim)
    const amountGroup = document.querySelector('.amount-input-group') || document.getElementById('custom-amount')?.parentElement;
    if (amountGroup && !document.getElementById('tashlumim-select')) {
        amountGroup.style.display = 'flex';
        amountGroup.style.gap = '10px';
        amountGroup.style.alignItems = 'center';
        amountGroup.style.position = 'relative';
        
        if (document.getElementById('custom-amount')) {
            document.getElementById('custom-amount').style.flex = '2';
        }

        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'form-group';
        selectWrapper.style.margin = '0';
        selectWrapper.style.flex = '1';
        selectWrapper.innerHTML = \`
            <select id="tashlumim-select" class="form-input" style="height: 50px; padding: 0 10px; margin: 0; cursor:pointer;">
                \${Array.from({length: 12}, (_, i) => \`<option value="\${i+1}">\${i+1} \${t('paymentsLabel') || 'תשלומים'}</option>\`).join('')}
            </select>
        \`;
        amountGroup.appendChild(selectWrapper);

        const breakdownDiv = document.createElement('div');
        breakdownDiv.id = 'payments-breakdown-text';
        breakdownDiv.style.fontSize = '13px';
        breakdownDiv.style.marginTop = '4px';
        breakdownDiv.style.color = '#4a5568';
        breakdownDiv.style.fontWeight = '500';
        breakdownDiv.style.width = '100%';
        amountGroup.parentNode.insertBefore(breakdownDiv, amountGroup.nextSibling);
    }

    // הזרקת כפתור תרומות אחרונות מעוצב
    const headerTitle = document.getElementById('campaign-title');
    if (headerTitle && !document.getElementById('btn-view-donations')) {
        const btnDonations = document.createElement('button');
        btnDonations.id = 'btn-view-donations';
        btnDonations.className = 'btn-donations-modern';
        btnDonations.innerHTML = \`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/></svg>
            <span data-i18n="recentDonations">\${t('recentDonations')}</span>
        \`;
        headerTitle.parentNode.insertBefore(btnDonations, headerTitle.nextSibling);
        btnDonations.addEventListener('click', openDonationsModal);
    }
}

function updatePaymentBreakdown() {
    const amountInput = document.getElementById('custom-amount');
    const selectTashlumim = document.getElementById('tashlumim-select');
    const breakdownEl = document.getElementById('payments-breakdown-text');
    
    if (!amountInput || !selectTashlumim || !breakdownEl) return;
    
    const amount = parseFloat(amountInput.value) || 0;
    const payments = parseInt(selectTashlumim.value) || 1;
    const symbol = selectedCurrency === '2' ? '$' : '₪';

    if (amount > 0 && payments > 1) {
        const perMonth = (amount / payments).toFixed(2);
        breakdownEl.innerText = t('paymentCalc') + ' ' + payments + ' ' + t('paymentsOf') + ' ' + symbol + parseFloat(perMonth).toLocaleString() + ' ' + t('perMonth');
        breakdownEl.style.display = 'block';
    } else {
        breakdownEl.style.display = 'none';
    }
}

window.closeDonationsModal = function() {
    document.getElementById('donations-modal-overlay').classList.remove('show');
    document.getElementById('donations-modal').classList.remove('show');
};

async function openDonationsModal() {
    const overlay = document.getElementById('donations-modal-overlay');
    const modal = document.getElementById('donations-modal');
    const body = document.getElementById('donations-modal-body');
    
    // מציג את המודל החדש במצב טעינה
    body.innerHTML = '<div style="text-align:center; padding:40px; color:#64748b; font-size:1.1rem;">' + t('loadingData') + '</div>';
    overlay.classList.add('show');
    modal.classList.add('show');
    
    try {
        const res = await fetch(API_BASE_URL + '/donations-public');
        const result = await res.json();
        
        if (result.status === 'success' && result.data && result.data.length > 0) {
            let html = '';
            
            result.data.forEach(don => {
                const sym = don.currency === '2' ? '$' : '₪';
                const dateStr = don.created_at ? don.created_at.split(' ')[0] : '';
                
                html += \`
                    <div class="donation-card">
                        <div class="donation-header">
                            <span class="donation-name">\${don.donor_name || 'תורם אנונימי'}</span>
                            <span class="donation-amount">\${sym}\${formatMoney(don.amount)}</span>
                        </div>
                        \${don.comment ? \`<div class="donation-comment">\${don.comment}</div>\` : ''}
                        <div class="donation-footer">
                            <span>\${dateStr}</span>
                        </div>
                    </div>
                \`;
            });
            body.innerHTML = html;
        } else {
            body.innerHTML = '<div style="text-align:center; padding:40px; color:#94a3b8; font-size:1.1rem;">' + t('noDonations') + '</div>';
        }
    } catch (err) {
        console.error(err);
        body.innerHTML = '<div style="text-align:center; padding:40px; color:#ef4444; font-weight:bold;">' + t('errTitle') + '</div>';
    }
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
    
    const amountInput = document.getElementById('custom-amount');
    if (amountInput) amountInput.dispatchEvent(new Event('input'));
    updatePaymentBreakdown();
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

            injectPaymentsAndDonationsUI();
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
    
    // עטיפה של מאזין ל-select אחרי שהוא הוזרק למסך כדי שלא ייפול באתחול
    document.addEventListener('change', (e) => {
        if(e.target.id === 'tashlumim-select') {
            updatePaymentBreakdown();
        }
    });
    
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
        
        updatePaymentBreakdown();
        
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

    const firstNameVal = document.getElementById('fname').value.trim();
    const lastNameVal = document.getElementById('lname').value.trim();

    let rawComment = document.getElementById('comment').value || '';
    const solSelect = document.getElementById('solicitor-select');
    const solName = solSelect ? (solSelect.options[solSelect.selectedIndex]?.text || '') : '';
    const finalSolId = solSelect ? solSelect.value : (lockedSolicitorId || '');
    if (finalSolId && solName) rawComment += ' | מתרים: ' + solName; 

    const tashlumimSelect = document.getElementById('tashlumim-select');
    const tashlumimVal = tashlumimSelect ? tashlumimSelect.value : '1';

    const iframe = document.getElementById('NedarimFrame');
    iframe.contentWindow.postMessage({
        'Name': 'FinishTransaction2',
        'Value': {
            'Mosad': campaignConfig.mosadId,
            'ApiValid': campaignConfig.apiValid,
            'Amount': currentDonationAmount,
            'Tashlumim': tashlumimVal, 
            'ClientName': firstNameVal + ' ' + lastNameVal, 
            'FirstName': firstNameVal,
            'LastName': lastNameVal,
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
    
    const tashlumimSelect = document.getElementById('tashlumim-select');
    if (tashlumimSelect) tashlumimSelect.value = '1';
    updatePaymentBreakdown();

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
    
    const modalTextEl = document.getElementById('modal-text');
    modalTextEl.innerHTML = text; 
    
    const iconEl = document.getElementById('modal-icon');
    if (iconEl) {
        if (type) iconEl.className = 'sa-icon sa-' + type;
        else iconEl.className = '';
    }
    
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
    
    selectedCurrency = currentLang === 'en' ? '2' : '1'; 
    updateCurrencyVisuals(selectedCurrency);
    
    applyTranslations();
    updateLangButtons();
    
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
    const iconEl = document.getElementById('modal-icon');
    if (iconEl) iconEl.className = ''; 
    document.getElementById('modal-overlay').classList.add('show');
    document.getElementById('custom-modal').classList.add('show');
};
`;
