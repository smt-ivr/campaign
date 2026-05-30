export const dashboardJs = `const API_BASE_URL = "https://smti.uk/campaign/api";
let currentSolicitorId = localStorage.getItem("dash_solicitor_id");
let currentSolicitorPass = localStorage.getItem("dash_solicitor_pass");

document.addEventListener("DOMContentLoaded", () => {
    if (currentSolicitorId && currentSolicitorPass) {
        showDashboard();
    } else {
        showAuth();
    }
});

function switchTab(tab) {
    document.getElementById("login-form").style.display = tab === "login" ? "block" : "none";
    document.getElementById("register-form").style.display = tab === "register" ? "block" : "none";
    const btns = document.querySelectorAll(".tab-btn");
    btns[0].className = tab === "login" ? "tab-btn active" : "tab-btn";
    btns[1].className = tab === "register" ? "tab-btn active" : "tab-btn";
}

function showAuth() {
    document.getElementById("auth-section").style.display = "block";
    document.getElementById("manage-section").style.display = "none";
}

function showDashboard() {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("manage-section").style.display = "block";
    loadDashboardData();
}

async function doLogin() {
    const identifier = document.getElementById("login-identifier").value.trim();
    const pass = document.getElementById("login-pass").value.trim();
    const errEl = document.getElementById("login-err");
    
    if (!identifier || !pass) { errEl.innerText = "יש למלא פרטי זיהוי וסיסמה"; return; }
    errEl.innerText = "מתחבר...";
    
    try {
        const res = await fetch(API_BASE_URL + "/solicitor/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identifier: identifier, password: pass })
        });
        const data = await res.json();
        
        if (data.status === "success" && data.data && data.data.id) {
            localStorage.setItem("dash_solicitor_id", data.data.id);
            localStorage.setItem("dash_solicitor_pass", pass);
            currentSolicitorId = data.data.id;
            currentSolicitorPass = pass;
            errEl.innerText = "";
            showDashboard();
        } else {
            errEl.innerText = data.message || "פרטים שגויים";
        }
    } catch (e) {
        errEl.innerText = "שגיאת תקשורת, נסה שוב";
    }
}

async function doRegister() {
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const phone = document.getElementById("reg-phone").value.trim();
    const pass = document.getElementById("reg-pass").value.trim();
    const errEl = document.getElementById("reg-err");

    if (!name || !email || !pass) { errEl.innerText = "שם, אימייל וסיסמה הם חובה"; return; }
    errEl.innerText = "פותח יעד...";

    try {
        const res = await fetch(API_BASE_URL + "/solicitor/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name, email: email, phone: phone, password: pass, confirm_password: pass, target_amount: 5000
            })
        });
        const data = await res.json();
        
        if (data.status === "success" && data.id) {
            localStorage.setItem("dash_solicitor_id", data.id);
            localStorage.setItem("dash_solicitor_pass", pass);
            currentSolicitorId = data.id;
            currentSolicitorPass = pass;
            errEl.innerText = "";
            showDashboard();
        } else {
            errEl.innerText = data.message || "שגיאה ביצירת המתרים";
        }
    } catch (e) {
        errEl.innerText = "שגיאת תקשורת, נסה שוב";
    }
}

function doLogout() {
    localStorage.removeItem("dash_solicitor_id");
    localStorage.removeItem("dash_solicitor_pass");
    currentSolicitorId = null;
    currentSolicitorPass = null;
    document.getElementById("login-identifier").value = "";
    document.getElementById("login-pass").value = "";
    showAuth();
}

async function loadDashboardData() {
    if (!currentSolicitorId || !currentSolicitorPass) return;
    try {
        const res = await fetch(API_BASE_URL + "/solicitor/dashboard?id=" + currentSolicitorId + "&p=" + encodeURIComponent(currentSolicitorPass));
        const result = await res.json();
        
        if (result.status === "success") {
            const myData = result.data;
            document.getElementById("dash-name").innerText = "שלום " + myData.name;
            document.getElementById("dash-raised").innerText = "₪" + (myData.total_raised || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            document.getElementById("dash-target").innerText = "₪" + (myData.target || 0).toLocaleString("en-US");
            
            // עדכון נתונים מורחבים מהשרת
            if (document.getElementById("dash-ils")) document.getElementById("dash-ils").innerText = "₪" + (myData.total_ils || 0).toLocaleString("en-US");
            if (document.getElementById("dash-usd")) document.getElementById("dash-usd").innerText = "$" + (myData.total_usd || 0).toLocaleString("en-US");
            
            const perc = myData.percentage || 0;
            if (document.getElementById("dash-progress")) document.getElementById("dash-progress").style.width = Math.min(perc, 100) + "%";
            if (document.getElementById("dash-percentage")) document.getElementById("dash-percentage").innerText = perc + "%";
            
            // עדכון רשימת תרומות
            const listEl = document.getElementById("donations-list");
            if (listEl) {
                if (myData.donations && myData.donations.length > 0) {
                    let html = '';
                    myData.donations.forEach(d => {
                        const isUsd = d.currency === '2' || d.currency === 'USD';
                        const symbol = isUsd ? '$' : '₪';
                        const dateObj = new Date(d.created_at);
                        const dateStr = isNaN(dateObj) ? d.created_at : dateObj.toLocaleDateString('he-IL') + ' ' + dateObj.toLocaleTimeString('he-IL', {hour: '2-digit', minute:'2-digit'});
                        
                        html += \`
                        <div class="donation-item">
                            <div class="d-header">
                                <span class="d-name">\${d.donor_name || 'תורם אנונימי'}</span>
                                <span class="d-amount">\${symbol}\${d.amount.toLocaleString("en-US")}</span>
                            </div>
                            <div class="d-footer">
                                <span class="d-date">\${dateStr}</span>
                                \${d.comment ? \`<span class="d-comment">\${d.comment}</span>\` : ''}
                            </div>
                        </div>\`;
                    });
                    listEl.innerHTML = html;
                } else {
                    listEl.innerHTML = '<p style="text-align:center; color:#718096; font-size:0.9rem;">עדיין אין תרומות ליעד זה.</p>';
                }
            }

            const baseUrl = window.location.protocol + "//" + window.location.host + "/campaign";
            document.getElementById("personal-link").value = baseUrl + "?id=" + currentSolicitorId;
        } else {
            doLogout();
        }
    } catch (e) { console.error("שגיאה בטעינת נתונים"); }
}

async function updateTarget() {
    const newTarget = document.getElementById("new-target-val").value;
    const msgEl = document.getElementById("target-msg");
    
    if (!newTarget || newTarget <= 0) { msgEl.style.color="red"; msgEl.innerText = "הזן סכום תקין"; return; }
    msgEl.style.color="#38a169"; msgEl.innerText = "מעדכן...";
    
    try {
        const res = await fetch(API_BASE_URL + "/solicitor/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: parseInt(currentSolicitorId), password: currentSolicitorPass, new_target: parseInt(newTarget) })
        });
        const data = await res.json();
        if (data.status === "success") {
            msgEl.innerText = "היעד עודכן בהצלחה!";
            document.getElementById("dash-target").innerText = "₪" + parseInt(newTarget).toLocaleString("en-US");
            document.getElementById("new-target-val").value = "";
            loadDashboardData(); // טעינה מחדש כדי לעדכן אחוזים
            setTimeout(() => { msgEl.innerText = ""; }, 3000);
        } else {
            msgEl.style.color="red"; msgEl.innerText = data.message || "שגיאה בעדכון";
        }
    } catch (e) {
        msgEl.style.color="red"; msgEl.innerText = "שגיאת תקשורת";
    }
}

function copyLink() {
    const linkInput = document.getElementById("personal-link");
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(linkInput.value);
    
    const btn = document.querySelector(".copy-btn");
    const originalText = btn.innerText;
    btn.innerText = "הועתק!";
    btn.style.background = "#38a169";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "#3182ce";
    }, 2000);
}`;
