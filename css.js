export const cssContent = `:root {
    --bg: #eef2f5;
    --card-bg: #ffffff;
    --text: #2d3748;
    --text-light: #718096;
    --gold: #d4af37;
    --dark-blue: #1a365d;
    --border: #e2e8f0;
    --radius: 20px;
}

body {
    font-family: 'Assistant', sans-serif;
    background: linear-gradient(135deg, #f6f8fd 0%, #eef2f5 100%);
    color: var(--text);
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    text-align: center;
}

* { box-sizing: border-box; }

.elegant-wrapper { width: 100%; max-width: 1100px; padding: 10px; }

/* ======== כפתורים עליונים מרחפים (אזור אישי ושפה) ======== */
.top-controls {
    position: absolute !important;
    top: 20px !important;
    right: 20px !important;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 99999 !important;
}

.personal-area-btn {
    background: var(--dark-blue);
    color: white;
    padding: 8px 20px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    transition: 0.3s;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: 0.5px;
}
.personal-area-btn:hover { background: var(--gold); transform: translateY(-2px); box-shadow: 0 6px 15px rgba(212,175,55,0.3); }
.personal-area-btn svg { flex-shrink: 0; }

.lang-switch {
    background: #ffffff;
    color: var(--dark-blue);
    border: 2px solid var(--border);
    padding: 8px 18px;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 800;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    font-family: inherit;
}
.lang-switch:hover {
    border-color: var(--dark-blue);
    color: var(--gold);
}

[dir="ltr"] .top-controls { right: auto !important; left: 20px !important; flex-direction: row-reverse; }
/* ========================================================= */

.main-card {
    background: var(--card-bg);
    border-radius: var(--radius);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    display: flex;
    align-items: stretch;
    overflow: hidden;
    height: auto;
    max-height: 95vh;
    width: 100%;
}

.info-panel {
    width: 32%; background: var(--dark-blue); color: white;
    padding: 25px 20px; display: flex; flex-direction: column;
    text-align: center;
}

.info-content { 
    display: flex; 
    flex-direction: column; 
    flex-grow: 1; 
}

.info-content h1 { margin: 0 0 15px 0; font-size: 1.5rem; font-weight: 800; color: var(--gold); flex-shrink: 0; }

.elegant-stats { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-bottom: 15px; flex-shrink: 0; }
.stat-circle { width: 100px; }
.circular-chart { display: block; margin: 0 auto; max-width: 100%; max-height: 250px; }
.circle-bg { fill: none; stroke: rgba(255,255,255,0.1); stroke-width: 2.5; }
.circle { fill: none; stroke-width: 2.5; stroke-linecap: round; stroke: var(--gold); transition: stroke-dasharray 1s ease-out; }
.percentage { fill: white; font-family: sans-serif; font-size: 0.55em; text-anchor: middle; font-weight: bold; }

.stat-text { text-align: center; }
.stat-text .raised { font-size: 2rem; font-weight: 800; line-height: 1; }
.stat-text .target { font-size: 0.95rem; color: #cbd5e0; margin-top: 5px; }

.currency-breakdown { display: flex; justify-content: center; gap: 12px; margin: 12px 0 10px 0; }
.currency-badge {
    padding: 5px 14px; border-radius: 20px; font-size: 0.95rem; font-weight: 700;
    display: flex; align-items: center; gap: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); backdrop-filter: blur(5px);
}
.ils-badge { background: rgba(255, 255, 255, 0.1); color: #e2e8f0; border: 1px solid rgba(255, 255, 255, 0.2); }
.usd-badge { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }

.animate-fade-in { animation: fadeInBreakdown 0.8s ease-out forwards; opacity: 0; }
@keyframes fadeInBreakdown { 0% { opacity: 0; transform: translateY(-5px); } 100% { opacity: 1; transform: translateY(0); } }

/* ======== עיצוב תמונת ההמלצה ======== */
.recommendation-wrapper {
    margin: 10px 0 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: zoom-in;
    flex-shrink: 0;
}
.recommendation-img {
    max-width: 90%;
    height: auto;
    max-height: 120px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: transform 0.3s ease, box-shadow 0.3s;
    border: 1px solid rgba(255,255,255,0.1);
}
.recommendation-img:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}
/* ==================================== */

.mini-leaderboard { 
    display: flex; 
    flex-direction: column; 
    flex-grow: 1; 
    position: relative; 
    overflow: hidden; 
}
.mini-leaderboard h3 { 
    font-size: 1.05rem; 
    border-bottom: 1px solid rgba(255,255,255,0.2); 
    padding-bottom: 8px; 
    margin: 0; 
    text-align: center; 
    height: 32px; 
}

.scroll-list { 
    position: absolute; 
    top: 40px; 
    bottom: 0; 
    left: 0; 
    right: 0; 
    overflow-y: auto; 
    padding-right: 5px; 
}
.scroll-list::-webkit-scrollbar { width: 4px; }
.scroll-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 4px; }

.solicitor-item { display: flex; flex-direction: column; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); text-align: right; }
.sol-info { display: flex; justify-content: space-between; margin-bottom: 6px; align-items: center; }
.sol-name { font-weight: 700; font-size: 1rem; color: var(--gold); }
.sol-stats { font-size: 0.85rem; color: #cbd5e0; }
.sol-total { font-weight: 800; color: white; font-size: 0.95rem; }

.sol-breakdown { display: flex; gap: 8px; margin-bottom: 10px; font-size: 0.8rem; }
.sol-badge-ils { background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 12px; color: #e2e8f0; }
.sol-badge-usd { background: rgba(16, 185, 129, 0.15); padding: 2px 8px; border-radius: 12px; color: #34d399; }

.sol-progress { display: flex; align-items: center; gap: 8px; justify-content: flex-start; }
.sol-progress-bar { flex-grow: 1; background: rgba(255,255,255,0.15); height: 6px; border-radius: 4px; overflow: hidden; }
.sol-progress-fill { background: var(--gold); height: 100%; transition: width 1s ease-in-out; }

.sol-percent { 
    font-size: 0.8rem; font-weight: bold; min-width: 55px; width: auto; 
    color: var(--gold); text-align: left; direction: ltr; flex-shrink: 0; white-space: nowrap; 
}

.donate-panel {
    width: 68%; padding: 20px 30px; display: flex; flex-direction: column; justify-content: space-between; text-align: center;
}
.donate-panel h2 { margin: 0 0 10px 0; font-size: 1.3rem; color: var(--dark-blue); font-weight: 800; }

.unified-amount-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    border: 2px solid #e2e8f0; 
    border-radius: 12px;
    padding: 6px 10px;
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03); 
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
}

.unified-amount-wrapper:focus-within {
    border-color: var(--dark-blue);
    box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
}

.hero-amount-input {
    flex-grow: 1;
    width: 100%;
    padding: 8px 10px;
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--dark-blue);
    border: none;
    background: transparent;
    text-align: center;
    outline: none;
    font-family: inherit;
    letter-spacing: 0.5px;
}
.hero-amount-input::placeholder { color: #cbd5e0; font-weight: 600; font-size: 1.15rem; letter-spacing: normal; }
.hero-amount-input::-webkit-outer-spin-button, .hero-amount-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.hero-amount-input[type=number] { -moz-appearance: textfield; }

.currency-toggle-inline {
    display: flex;
    background: #f1f5f9; 
    border-radius: 8px;
    padding: 3px;
    gap: 2px;
    flex-shrink: 0;
}
.curr-btn {
    display: flex; align-items: center; justify-content: center;
    min-width: 42px; height: 36px; font-size: 1.15rem; font-weight: 800; cursor: pointer; border: none;
    background: transparent; color: #94a3b8; border-radius: 6px; transition: all 0.25s ease; font-family: inherit;
}
.curr-btn:hover:not(.active) { color: var(--dark-blue); background: rgba(226, 232, 240, 0.5); }
.curr-btn.active { background: #ffffff; color: var(--dark-blue); box-shadow: 0 2px 5px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.05); }

.compact-form { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 10px; }
.input-group { display: contents; } 
#fname { order: 1; } #lname { order: 2; } #phone { order: 3; } #zeout { order: 4; } #email { order: 5; } #solicitor-select { order: 6; } #comment { order: 7; grid-column: span 3; } 

.compact-form input, .compact-form select { 
    width: 100%; padding: 8px; border: 1px solid var(--border); border-radius: 6px; 
    font-size: 0.9rem; font-family: inherit; background: #f8fafc; outline: none; transition: 0.2s; text-align: center;
}
.compact-form input:focus, .compact-form select:focus { border-color: var(--gold); background: white; }

.input-error { border-color: #e53e3e !important; background-color: #fff5f5 !important; color: #e53e3e; animation: blink-error 1s infinite; }
@keyframes blink-error { 0%, 100% { border-color: #e53e3e; box-shadow: 0 0 5px rgba(229,62,62,0.4); } 50% { border-color: transparent; box-shadow: none; } }

#solicitor-select { background-color: #e8f4fd; border: 1px solid var(--dark-blue); color: var(--dark-blue); font-weight: 600; }
#solicitor-select:focus { background-color: #d1e8ff; }

.payment-area { width: 100%; height: 310px; flex-shrink: 0; position: relative; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden; }
.loader-overlay { position: absolute; inset: 0; background: #f8fafc; border-radius: 6px; border: 1px dashed #cbd5e0; display: flex; flex-direction: column; justify-content: center; align-items: center; color: var(--text-light); font-weight: bold; font-size: 0.95rem; z-index: 1; text-align: center; }
.loader-overlay::before { content: ""; width: 35px; height: 35px; margin-bottom: 10px; border: 3px solid #e2e8f0; border-top-color: var(--gold); border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
#NedarimFrame { width: 100%; height: 310px !important; border: none; position: relative; z-index: 2; background: transparent; }

.elegant-submit { width: 100%; padding: 10px; background: var(--dark-blue); color: white; border: none; border-radius: 8px; font-size: 1.15rem; font-weight: 700; font-family: inherit; cursor: pointer; transition: 0.3s; margin-top: 5px; text-align: center; }
.elegant-submit:hover:not(:disabled) { background: var(--gold); box-shadow: 0 4px 10px rgba(212,175,55,0.3); }
.elegant-submit:disabled { background: #e2e8f0; color: #a0aec0; cursor: not-allowed; box-shadow: none; }

.sweet-overlay { position: fixed; inset: 0; background: transparent; z-index: 10000; display: none; opacity: 0; transition: 0.3s ease; pointer-events: none; }
.sweet-alert { background: white; width: 90%; max-width: 380px; padding: 30px 20px; border-radius: var(--radius); text-align: center; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.8); display: none; z-index: 10001; opacity: 0; transition: 0.3s ease; box-shadow: 0 15px 40px rgba(0,0,0,0.15); border: 1px solid var(--border); box-sizing: border-box; }
.sweet-alert.show, .sweet-overlay.show { display: block; opacity: 1; transform: translate(-50%, -50%) scale(1); pointer-events: auto; }
.sweet-alert h3 { color: var(--dark-blue); margin: 15px 0 10px; font-size: 1.4rem; font-weight: 800; }
.sweet-alert #modal-text { color: var(--text-light); font-size: 1rem; margin-bottom: 25px; line-height: 1.4; white-space: pre-wrap; }
.modal-btn { background: var(--dark-blue); color: white; border: none; padding: 10px 30px; border-radius: 6px; cursor: pointer; font-family: inherit; font-size: 1.05rem; font-weight: 700; transition: 0.2s; }
.modal-btn:hover { background: var(--gold); }

.sa-icon { width: 60px; height: 60px; border-radius: 50%; margin: 0 auto; position: relative; border: 3px solid; }
.sa-success { border-color: var(--gold); }
.sa-success::before { content: '✓'; font-size: 35px; color: var(--gold); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.sa-error { border-color: #e53e3e; }
.sa-error::before { content: '✗'; font-size: 35px; color: #e53e3e; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }

[dir="ltr"] .solicitor-item { text-align: left; }
[dir="ltr"] .sol-percent { text-align: right; }
[dir="ltr"] .unified-amount-wrapper { flex-direction: row-reverse; }

@media (max-width: 900px) {
    body { overflow: auto; padding: 10px; height: auto; }
    
    .top-controls {
        top: 15px !important;
        right: 15px !important;
        left: 15px !important;
        justify-content: space-between;
    }
    
    .main-card { flex-direction: column; max-height: none; height: auto; display: flex; margin-top: 70px; }
    .info-panel, .info-content { display: contents; }
    .info-content h1 { background: var(--dark-blue); color: var(--gold); margin: 0; padding: 25px 15px 5px 15px; order: 1; font-size: 1.6rem; }
    .elegant-stats { background: var(--dark-blue); color: white; margin: 0; padding: 0 15px 15px 15px; order: 2; gap: 12px; }
    
    .recommendation-wrapper { order: 3; background: var(--dark-blue); margin: 0; padding-bottom: 20px; }
    .recommendation-img { max-height: 180px; }

    .mini-leaderboard { display: flex !important; width: 100%; order: 4; background: var(--dark-blue); color: white; padding: 10px 20px 25px 20px; position: static; }
    .mini-leaderboard h3 { color: var(--gold); border-bottom: 1px solid rgba(255,255,255,0.2); margin-top: 0; margin-bottom: 10px; height: auto; }
    .scroll-list { position: static; max-height: 250px; } 
    
    .donate-panel { width: 100%; order: 5; padding: 25px 20px; background: var(--card-bg); }
    
    .solicitor-item { border-bottom: 1px solid rgba(255,255,255,0.1); }
    .sol-stats { color: #e2e8f0; }
    .compact-form { grid-template-columns: repeat(2, 1fr); }
    #comment { grid-column: span 2; }
}

@media (max-width: 480px) {
    .personal-area-btn { padding: 6px 14px; font-size: 0.95rem; }
    .lang-switch { padding: 6px 14px; font-size: 0.95rem; }
    .compact-form { grid-template-columns: 1fr; }
    #comment, #fname, #lname, #phone, #zeout, #email, #solicitor-select { grid-column: span 1; }
}
`;
