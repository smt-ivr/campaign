export const htmlContent = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>קמפיין הכנסת כלה</title>
    <link rel="icon" type="image/png" href="https://www.matara.pro/nedarimplus/logo.png">
    <link rel="stylesheet" href="/campaign/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;800&display=swap" rel="stylesheet">
</head>
<body>

    <div class="elegant-wrapper">
        
        <div class="top-controls">
            <a href="/campaign/dashboard" class="personal-area-btn" title="כניסה למתרימים">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span data-i18n="personalArea">מתרימים</span>
            </a>

            <div class="lang-toggle-inline">
                <button type="button" class="lang-btn active" id="btn-lang-he" onclick="setLanguage('he')">עברית</button>
                <button type="button" class="lang-btn" id="btn-lang-en" onclick="setLanguage('en')">EN</button>
            </div>
        </div>

        <div class="floating-recommendation">
            <div class="rec-title">המלצה</div>
            <div class="recommendation-wrapper" onclick="showImage('https://smt-tel-manager.netlify.app/%D7%94%D7%9E%D7%9C%D7%A6%D7%94.png')" title="לחץ להגדלה">
                <img src="https://smt-tel-manager.netlify.app/%D7%94%D7%9E%D7%9C%D7%A6%D7%94.png" alt="המלצה" class="recommendation-img" draggable="false">
            </div>
        </div>

        <main class="main-card">
            
            <section class="info-panel">
                <div class="info-content">
                    <h1 id="campaign-title" data-i18n="loadingTitle">קמפיין הכנסת כלה</h1>
                    
                    <div class="elegant-stats">
                        <div class="stat-circle">
                            <svg viewBox="0 0 36 36" class="circular-chart">
                                <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path class="circle" id="progress-circle" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <text x="18" y="20.35" class="percentage" id="progress-text"></text>
                            </svg>
                        </div>
                        <div class="stat-text">
                            <div class="raised" id="total-raised"><span class="mini-spinner"></span></div>
                            
                            <div class="currency-breakdown animate-fade-in">
                                <div class="currency-badge ils-badge" title="סך הכל בשקלים">
                                    <span id="total-ils-badge"><span class="mini-spinner"></span></span>
                                </div>
                                <div class="currency-badge usd-badge" title="סך הכל בדולרים">
                                    <span id="total-usd-badge"><span class="mini-spinner"></span></span>
                                </div>
                            </div>
                            
                            <div class="target"><span data-i18n="raisedFrom">מתוך</span> <span id="target-amount"><span class="mini-spinner"></span></span></div>
                        </div>
                    </div>

                    <div class="mini-leaderboard">
                        <h3 data-i18n="solicitorsTitle">מתרימי הקמפיין</h3>
                        <div class="scroll-list" id="solicitors-list">
                            <div style="opacity: 0.5; font-size: 0.9rem; text-align: center;" data-i18n="loadingData">טוען נתונים...</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="donate-panel">
                <h2 data-i18n="donateTitle">השותפות שלך</h2>
                
                <div class="unified-amount-wrapper">
                    <input type="number" id="custom-amount" data-i18n-placeholder="enterAmount" placeholder="סכום לתרומה" class="hero-amount-input" autofocus>
                    <div class="currency-toggle-inline" id="currency-toggle">
                        <button type="button" class="curr-btn active" data-val="1">₪</button>
                        <button type="button" class="curr-btn" data-val="2">$</button>
                    </div>
                </div>

                <div class="compact-form">
                    <div class="input-group">
                        <input type="text" id="fname" data-i18n-placeholder="fname" placeholder="שם פרטי">
                        <input type="text" id="lname" data-i18n-placeholder="lname" placeholder="שם משפחה">
                        <input type="tel" id="phone" data-i18n-placeholder="phone" placeholder="טלפון">
                        <input type="text" id="zeout" data-i18n-placeholder="zeout" placeholder="תעודת זהות (לא חובה)" maxlength="9">
                        <input type="email" id="email" data-i18n-placeholder="email" placeholder="אימייל">
                        <select id="solicitor-select">
                            <option value="" data-i18n="loadingSolicitors">טוען מתרימים...</option>
                        </select>
                    </div>
                    <input type="text" id="comment" data-i18n-placeholder="comment" placeholder="הערות">
                </div>

                <div class="payment-area">
                    <div id="iframe-loader" class="loader-overlay" data-i18n="loadingIframe">טוען סליקה מאובטחת...</div>
                    <iframe id="NedarimFrame" src="about:blank" scrolling="auto"></iframe>
                </div>
                
                <button id="pay-btn" class="elegant-submit" disabled data-i18n="enterAmountBtn">הזן סכום</button>
            </section>

        </main>
    </div>

    <div class="sweet-overlay" id="modal-overlay"></div>
    <div class="sweet-alert" id="custom-modal">
        <div class="sa-icon" id="modal-icon"></div>
        <h3 id="modal-title"></h3>
        <div id="modal-text"></div>
        <button class="modal-btn" onclick="closeModal()">OK</button>
    </div>

    <script src="/campaign/app.js"></script>
</body>
</html>`;
