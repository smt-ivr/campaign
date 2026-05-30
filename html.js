export const htmlContent = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>קמפיין</title>
    <link rel="stylesheet" href="/campaign/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;800&display=swap" rel="stylesheet">
</head>
<body>

    <a href="/campaign/dashboard" class="personal-area-btn" title="כניסה למתרימים">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    </a>

    <div class="elegant-wrapper">
        <main class="main-card">
            
            <section class="info-panel">
                <div class="info-content">
                    <h1 id="campaign-title" data-i18n="loadingTitle">טוען...</h1>
                    
                    <div class="elegant-stats">
                        <div class="stat-circle">
                            <svg viewBox="0 0 36 36" class="circular-chart">
                                <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path class="circle" id="progress-circle" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <text x="18" y="20.35" class="percentage" id="progress-text">0%</text>
                            </svg>
                        </div>
                        <div class="stat-text">
                            <div class="raised" id="total-raised">₪0</div>
                            
                            <div class="currency-breakdown animate-fade-in">
                                <div class="currency-badge ils-badge" title="סך הכל בשקלים">
                                    <span id="total-ils-badge">₪0</span>
                                </div>
                                <div class="currency-badge usd-badge" title="סך הכל בדולרים">
                                    <span id="total-usd-badge">$0</span>
                                </div>
                            </div>
                            
                            <div class="target"><span data-i18n="raisedFrom">מתוך</span> <span id="target-amount">₪0</span></div>
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
                    <div class="currency-toggle-inline" id="currency-toggle">
                        <button type="button" class="curr-btn active" data-val="1">₪</button>
                        <button type="button" class="curr-btn" data-val="2">$</button>
                    </div>
                    <input type="number" id="custom-amount" data-i18n-placeholder="enterAmount" placeholder="סכום לתרומה" class="hero-amount-input" autofocus>
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
                    <iframe id="NedarimFrame" src="about:blank" scrolling="no"></iframe>
                </div>
                
                <button id="pay-btn" class="elegant-submit" disabled data-i18n="enterAmountBtn">הזן סכום</button>
            </section>

        </main>
    </div>

    <div class="sweet-overlay" id="modal-overlay"></div>
    <div class="sweet-alert" id="custom-modal">
        <div class="sa-icon" id="modal-icon"></div>
        <h3 id="modal-title"></h3>
        <p id="modal-text"></p>
        <button class="modal-btn" onclick="closeModal()">OK</button>
    </div>

    <script src="/campaign/app.js"></script>
</body>
</html>`;
