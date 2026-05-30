export const dashboardHtml = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>אזור מתרימים</title>
    <link rel="stylesheet" href="/campaign/dashboard.css">
    <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;800&display=swap" rel="stylesheet">
</head>
<body>
    <a href="/campaign" class="back-btn">חזרה לקמפיין</a>
    <div class="dashboard-wrapper">
        
        <div id="auth-section" class="dash-card auth-card">
            <div id="login-form" class="auth-form">
                <h2>כניסת מתרים</h2>
                <input type="text" id="login-identifier" placeholder="אימייל / טלפון / מספר מתרים">
                <input type="password" id="login-pass" placeholder="סיסמה">
                <button onclick="doLogin()" class="action-btn">היכנס</button>
                <p id="login-err" class="err-msg"></p>
                <div class="auth-switch">
                    <span>אין לך יעד?</span>
                    <a href="#" onclick="switchAuth('register'); return false;">הרשמה ופתיחת יעד</a>
                </div>
            </div>

            <div id="register-form" class="auth-form" style="display:none;">
                <h2>הרשמה ופתיחת יעד</h2>
                <div class="form-grid">
                    <input type="text" id="reg-name" placeholder="שם מלא (יוצג בקמפיין)">
                    <input type="email" id="reg-email" placeholder="אימייל (חובה)">
                    <input type="text" id="reg-phone" placeholder="מספר טלפון">
                    <input type="number" id="reg-target" placeholder="יעד לגיוס (בשקלים)">
                    <input type="password" id="reg-pass" placeholder="בחר סיסמה">
                    <input type="password" id="reg-pass-confirm" placeholder="אימות סיסמה">
                </div>
                <button onclick="doRegister()" class="action-btn">הירשם ופתח יעד</button>
                <p id="reg-err" class="err-msg"></p>
                <div class="auth-switch">
                    <span>כבר רשום?</span>
                    <a href="#" onclick="switchAuth('login'); return false;">התחבר כאן</a>
                </div>
            </div>
        </div>

        <div id="manage-section" class="dash-card wide-card" style="display:none;">
            <div class="user-header">
                <h2 id="dash-name">שלום מתרים</h2>
                <button onclick="doLogout()" class="logout-btn">התנתק</button>
            </div>
            
            <div class="dashboard-grid">
                <div class="main-stats-panel">
                    <div class="stats-grid">
                        <div class="stat-box">
                            <span>סך הכל גויס</span>
                            <strong id="dash-raised">₪0</strong>
                            <div class="currency-breakdown">
                                <span class="badge badge-ils" id="dash-ils" title="שקלים">₪0</span>
                                <span class="badge badge-usd" id="dash-usd" title="דולרים">$0</span>
                            </div>
                        </div>
                        <div class="stat-box">
                            <span>יעד נוכחי</span>
                            <strong id="dash-target">₪0</strong>
                            <div class="progress-container">
                                <div class="progress-bar" id="dash-progress" style="width: 0%;"></div>
                            </div>
                            <span id="dash-percentage" class="progress-text">0%</span>
                        </div>
                    </div>
                    
                    <div class="actions-panel">
                        <div class="update-target-box">
                            <h3>עדכון יעד גיוס</h3>
                            <div class="target-input-row">
                                <input type="number" id="new-target-val" placeholder="הכנס יעד חדש">
                                <button onclick="updateTarget()" class="update-btn">עדכן יעד</button>
                            </div>
                            <p id="target-msg" class="success-msg"></p>
                        </div>

                        <div class="link-box">
                            <h3>הקישור האישי שלך</h3>
                            <p>שתף את הקישור הזה כדי שתרומות יכנסו ישירות ליעד שלך:</p>
                            <input type="text" id="personal-link" readonly>
                            <button onclick="copyLink()" class="copy-btn">העתק קישור</button>
                        </div>
                    </div>
                </div>
                
                <div class="donations-history">
                    <h3>התרומות האחרונות שלך</h3>
                    <div id="donations-list" class="donations-list">
                        <p style="text-align:center; color:#718096; font-size:0.9rem;">טוען נתונים...</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <script src="/campaign/dashboard.js"></script>
</body>
</html>`;
