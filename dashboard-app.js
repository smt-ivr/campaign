export const dashboardJs = 'const API_BASE_URL = "https://smti.uk/campaign/api";' +
'let currentSolicitorId = localStorage.getItem("dash_solicitor_id");' +
'' +
'document.addEventListener("DOMContentLoaded", () => {' +
'    if (currentSolicitorId) {' +
'        showDashboard();' +
'    } else {' +
'        showAuth();' +
'    }' +
'});' +
'' +
'function switchTab(tab) {' +
'    document.getElementById("login-form").style.display = tab === "login" ? "block" : "none";' +
'    document.getElementById("register-form").style.display = tab === "register" ? "block" : "none";' +
'    const btns = document.querySelectorAll(".tab-btn");' +
'    btns[0].className = tab === "login" ? "tab-btn active" : "tab-btn";' +
'    btns[1].className = tab === "register" ? "tab-btn active" : "tab-btn";' +
'}' +
'' +
'function showAuth() {' +
'    document.getElementById("auth-section").style.display = "block";' +
'    document.getElementById("manage-section").style.display = "none";' +
'}' +
'' +
'function showDashboard() {' +
'    document.getElementById("auth-section").style.display = "none";' +
'    document.getElementById("manage-section").style.display = "block";' +
'    loadSolicitorData();' +
'}' +
'' +
'async function doLogin() {' +
'    const phone = document.getElementById("login-phone").value.trim();' +
'    const pass = document.getElementById("login-pass").value.trim();' +
'    const errEl = document.getElementById("login-err");' +
'    ' +
'    if (!phone || !pass) { errEl.innerText = "יש למלא טלפון וסיסמה"; return; }' +
'    errEl.innerText = "מתחבר...";' +
'    ' +
'    try {' +
'        const res = await fetch(API_BASE_URL + "/solicitor/login", {' +
'            method: "POST",' +
'            headers: { "Content-Type": "application/json" },' +
'            body: JSON.stringify({ phone: phone, password: pass })' +
'        });' +
'        const data = await res.json();' +
'        ' +
'        if (data.status === "success" && data.data && data.data.id) {' +
'            localStorage.setItem("dash_solicitor_id", data.data.id);' +
'            currentSolicitorId = data.data.id;' +
'            errEl.innerText = "";' +
'            showDashboard();' +
'        } else {' +
'            errEl.innerText = data.message || "פרטים שגויים";' +
'        }' +
'    } catch (e) {' +
'        errEl.innerText = "שגיאת תקשורת, נסה שוב";' +
'    }' +
'}' +
'' +
'async function doRegister() {' +
'    const name = document.getElementById("reg-name").value.trim();' +
'    const phone = document.getElementById("reg-phone").value.trim();' +
'    const email = document.getElementById("reg-email").value.trim();' +
'    const pass = document.getElementById("reg-pass").value.trim();' +
'    const errEl = document.getElementById("reg-err");' +
'' +
'    if (!name || !phone || !pass) { errEl.innerText = "שם, טלפון וסיסמה הם חובה"; return; }' +
'    errEl.innerText = "פותח יעד...";' +
'' +
'    try {' +
'        const res = await fetch(API_BASE_URL + "/solicitor/register", {' +
'            method: "POST",' +
'            headers: { "Content-Type": "application/json" },' +
'            body: JSON.stringify({ name: name, phone: phone, email: email, password: pass })' +
'        });' +
'        const data = await res.json();' +
'        ' +
'        if (data.status === "success" && data.data && data.data.id) {' +
'            localStorage.setItem("dash_solicitor_id", data.data.id);' +
'            currentSolicitorId = data.data.id;' +
'            errEl.innerText = "";' +
'            showDashboard();' +
'        } else {' +
'            errEl.innerText = data.message || "שגיאה ביצירת המתרים";' +
'        }' +
'    } catch (e) {' +
'        errEl.innerText = "שגיאת תקשורת, נסה שוב";' +
'    }' +
'}' +
'' +
'function doLogout() {' +
'    localStorage.removeItem("dash_solicitor_id");' +
'    currentSolicitorId = null;' +
'    document.getElementById("login-phone").value = "";' +
'    document.getElementById("login-pass").value = "";' +
'    showAuth();' +
'}' +
'' +
'async function loadSolicitorData() {' +
'    if (!currentSolicitorId) return;' +
'    try {' +
'        const res = await fetch(API_BASE_URL + "/solicitors");' +
'        const result = await res.json();' +
'        if (result.status === "success") {' +
'            const myData = result.data.find(s => s.id == currentSolicitorId);' +
'            if (myData) {' +
'                document.getElementById("dash-name").innerText = "שלום " + myData.name;' +
'                document.getElementById("dash-raised").innerText = "₪" + (myData.raised || 0).toLocaleString("en-US");' +
'                document.getElementById("dash-target").innerText = "₪" + (myData.target_amount || 0).toLocaleString("en-US");' +
'                ' +
'                const baseUrl = window.location.protocol + "//" + window.location.host + "/campaign";' +
'                document.getElementById("personal-link").value = baseUrl + "?id=" + currentSolicitorId;' +
'            } else {' +
'                doLogout();' +
'            }' +
'        }' +
'    } catch (e) { console.error("שגיאה בטעינת נתונים"); }' +
'}' +
'' +
'async function updateTarget() {' +
'    const newTarget = document.getElementById("new-target-val").value;' +
'    const msgEl = document.getElementById("target-msg");' +
'    ' +
'    if (!newTarget || newTarget <= 0) { msgEl.style.color="red"; msgEl.innerText = "הזן סכום תקין"; return; }' +
'    msgEl.style.color="#38a169"; msgEl.innerText = "מעדכן...";' +
'    ' +
'    try {' +
'        const res = await fetch(API_BASE_URL + "/solicitor/" + currentSolicitorId + "/target", {' +
'            method: "PUT",' +
'            headers: { "Content-Type": "application/json" },' +
'            body: JSON.stringify({ target: parseInt(newTarget) })' +
'        });' +
'        const data = await res.json();' +
'        if (data.status === "success") {' +
'            msgEl.innerText = "היעד עודכן בהצלחה!";' +
'            document.getElementById("dash-target").innerText = "₪" + parseInt(newTarget).toLocaleString("en-US");' +
'            document.getElementById("new-target-val").value = "";' +
'            setTimeout(() => { msgEl.innerText = ""; }, 3000);' +
'        } else {' +
'            msgEl.style.color="red"; msgEl.innerText = "שגיאה בעדכון";' +
'        }' +
'    } catch (e) {' +
'        msgEl.style.color="red"; msgEl.innerText = "שגיאת תקשורת";' +
'    }' +
'}' +
'' +
'function copyLink() {' +
'    const linkInput = document.getElementById("personal-link");' +
'    linkInput.select();' +
'    linkInput.setSelectionRange(0, 99999);' +
'    navigator.clipboard.writeText(linkInput.value);' +
'    ' +
'    const btn = document.querySelector(".copy-btn");' +
'    const originalText = btn.innerText;' +
'    btn.innerText = "הועתק!";' +
'    btn.style.background = "#38a169";' +
'    setTimeout(() => {' +
'        btn.innerText = originalText;' +
'        btn.style.background = "#3182ce";' +
'    }, 2000);' +
'}';
