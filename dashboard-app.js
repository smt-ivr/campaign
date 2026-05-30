export const dashboardJs = 'const API_BASE_URL = "https://smti.uk/campaign/api";\n' +
'let currentSolicitorId = localStorage.getItem("dash_solicitor_id");\n' +
'let currentSolicitorPass = localStorage.getItem("dash_solicitor_pass");\n' +
'\n' +
'document.addEventListener("DOMContentLoaded", () => {\n' +
'    if (currentSolicitorId && currentSolicitorPass) {\n' +
'        showDashboard();\n' +
'    } else {\n' +
'        showAuth();\n' +
'    }\n' +
'});\n' +
'\n' +
'function switchTab(tab) {\n' +
'    document.getElementById("login-form").style.display = tab === "login" ? "block" : "none";\n' +
'    document.getElementById("register-form").style.display = tab === "register" ? "block" : "none";\n' +
'    const btns = document.querySelectorAll(".tab-btn");\n' +
'    btns[0].className = tab === "login" ? "tab-btn active" : "tab-btn";\n' +
'    btns[1].className = tab === "register" ? "tab-btn active" : "tab-btn";\n' +
'}\n' +
'\n' +
'function showAuth() {\n' +
'    document.getElementById("auth-section").style.display = "block";\n' +
'    document.getElementById("manage-section").style.display = "none";\n' +
'}\n' +
'\n' +
'function showDashboard() {\n' +
'    document.getElementById("auth-section").style.display = "none";\n' +
'    document.getElementById("manage-section").style.display = "block";\n' +
'    loadDashboardData();\n' +
'}\n' +
'\n' +
'async function doLogin() {\n' +
'    const identifier = document.getElementById("login-identifier").value.trim();\n' +
'    const pass = document.getElementById("login-pass").value.trim();\n' +
'    const errEl = document.getElementById("login-err");\n' +
'    \n' +
'    if (!identifier || !pass) { errEl.innerText = "יש למלא פרטי זיהוי וסיסמה"; return; }\n' +
'    errEl.innerText = "מתחבר...";\n' +
'    \n' +
'    try {\n' +
'        const res = await fetch(API_BASE_URL + "/solicitor/login", {\n' +
'            method: "POST",\n' +
'            headers: { "Content-Type": "application/json" },\n' +
'            body: JSON.stringify({ identifier: identifier, password: pass })\n' +
'        });\n' +
'        const data = await res.json();\n' +
'        \n' +
'        if (data.status === "success" && data.data && data.data.id) {\n' +
'            localStorage.setItem("dash_solicitor_id", data.data.id);\n' +
'            localStorage.setItem("dash_solicitor_pass", pass);\n' +
'            currentSolicitorId = data.data.id;\n' +
'            currentSolicitorPass = pass;\n' +
'            errEl.innerText = "";\n' +
'            showDashboard();\n' +
'        } else {\n' +
'            errEl.innerText = data.message || "פרטים שגויים";\n' +
'        }\n' +
'    } catch (e) {\n' +
'        errEl.innerText = "שגיאת תקשורת, נסה שוב";\n' +
'    }\n' +
'}\n' +
'\n' +
'async function doRegister() {\n' +
'    const name = document.getElementById("reg-name").value.trim();\n' +
'    const email = document.getElementById("reg-email").value.trim();\n' +
'    const phone = document.getElementById("reg-phone").value.trim();\n' +
'    const pass = document.getElementById("reg-pass").value.trim();\n' +
'    const errEl = document.getElementById("reg-err");\n' +
'\n' +
'    if (!name || !email || !pass) { errEl.innerText = "שם, אימייל וסיסמה הם חובה"; return; }\n' +
'    errEl.innerText = "פותח יעד...";\n' +
'\n' +
'    try {\n' +
'        const res = await fetch(API_BASE_URL + "/solicitor/register", {\n' +
'            method: "POST",\n' +
'            headers: { "Content-Type": "application/json" },\n' +
'            body: JSON.stringify({\n' +
'                name: name, email: email, phone: phone, password: pass, confirm_password: pass, target_amount: 5000\n' +
'            })\n' +
'        });\n' +
'        const data = await res.json();\n' +
'        \n' +
'        if (data.status === "success" && data.id) {\n' +
'            localStorage.setItem("dash_solicitor_id", data.id);\n' +
'            localStorage.setItem("dash_solicitor_pass", pass);\n' +
'            currentSolicitorId = data.id;\n' +
'            currentSolicitorPass = pass;\n' +
'            errEl.innerText = "";\n' +
'            showDashboard();\n' +
'        } else {\n' +
'            errEl.innerText = data.message || "שגיאה ביצירת המתרים";\n' +
'        }\n' +
'    } catch (e) {\n' +
'        errEl.innerText = "שגיאת תקשורת, נסה שוב";\n' +
'    }\n' +
'}\n' +
'\n' +
'function doLogout() {\n' +
'    localStorage.removeItem("dash_solicitor_id");\n' +
'    localStorage.removeItem("dash_solicitor_pass");\n' +
'    currentSolicitorId = null;\n' +
'    currentSolicitorPass = null;\n' +
'    document.getElementById("login-identifier").value = "";\n' +
'    document.getElementById("login-pass").value = "";\n' +
'    showAuth();\n' +
'}\n' +
'\n' +
'async function loadDashboardData() {\n' +
'    if (!currentSolicitorId || !currentSolicitorPass) return;\n' +
'    try {\n' +
'        const res = await fetch(API_BASE_URL + "/solicitor/dashboard?id=" + currentSolicitorId + "&p=" + encodeURIComponent(currentSolicitorPass));\n' +
'        const result = await res.json();\n' +
'        if (result.status === "success") {\n' +
'            const myData = result.data;\n' +
'            document.getElementById("dash-name").innerText = "שלום " + myData.name;\n' +
'            document.getElementById("dash-raised").innerText = "₪" + (myData.total_raised || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n' +
'            document.getElementById("dash-target").innerText = "₪" + (myData.target || 0).toLocaleString("en-US");\n' +
'            \n' +
'            const baseUrl = window.location.protocol + "//" + window.location.host + "/campaign";\n' +
'            document.getElementById("personal-link").value = baseUrl + "?id=" + currentSolicitorId;\n' +
'        } else {\n' +
'            doLogout();\n' +
'        }\n' +
'    } catch (e) { console.error("שגיאה בטעינת נתונים"); }\n' +
'}\n' +
'\n' +
'async function updateTarget() {\n' +
'    const newTarget = document.getElementById("new-target-val").value;\n' +
'    const msgEl = document.getElementById("target-msg");\n' +
'    \n' +
'    if (!newTarget || newTarget <= 0) { msgEl.style.color="red"; msgEl.innerText = "הזן סכום תקין"; return; }\n' +
'    msgEl.style.color="#38a169"; msgEl.innerText = "מעדכן...";\n' +
'    \n' +
'    try {\n' +
'        const res = await fetch(API_BASE_URL + "/solicitor/update", {\n' +
'            method: "POST",\n' +
'            headers: { "Content-Type": "application/json" },\n' +
'            body: JSON.stringify({ id: parseInt(currentSolicitorId), password: currentSolicitorPass, new_target: parseInt(newTarget) })\n' +
'        });\n' +
'        const data = await res.json();\n' +
'        if (data.status === "success") {\n' +
'            msgEl.innerText = "היעד עודכן בהצלחה!";\n' +
'            document.getElementById("dash-target").innerText = "₪" + parseInt(newTarget).toLocaleString("en-US");\n' +
'            document.getElementById("new-target-val").value = "";\n' +
'            setTimeout(() => { msgEl.innerText = ""; }, 3000);\n' +
'        } else {\n' +
'            msgEl.style.color="red"; msgEl.innerText = data.message || "שגיאה בעדכון";\n' +
'        }\n' +
'    } catch (e) {\n' +
'        msgEl.style.color="red"; msgEl.innerText = "שגיאת תקשורת";\n' +
'    }\n' +
'}\n' +
'\n' +
'function copyLink() {\n' +
'    const linkInput = document.getElementById("personal-link");\n' +
'    linkInput.select();\n' +
'    linkInput.setSelectionRange(0, 99999);\n' +
'    navigator.clipboard.writeText(linkInput.value);\n' +
'    \n' +
'    const btn = document.querySelector(".copy-btn");\n' +
'    const originalText = btn.innerText;\n' +
'    btn.innerText = "הועתק!";\n' +
'    btn.style.background = "#38a169";\n' +
'    setTimeout(() => {\n' +
'        btn.innerText = originalText;\n' +
'        btn.style.background = "#3182ce";\n' +
'    }, 2000);\n' +
'}';
