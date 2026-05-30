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

.main-card {
    background: var(--card-bg);
    border-radius: var(--radius);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    display: flex;
    overflow: hidden;
    height: auto;
    max-height: 95vh;
}

.info-panel {
    width: 32%; background: var(--dark-blue); color: white;
    padding: 25px 20px; display: flex; flex-direction: column;
    text-align: center;
}
.info-content h1 { margin: 0 0 15px 0; font-size: 1.5rem; font-weight: 800; color: var(--gold); }

.elegant-stats { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-bottom: 15px; }
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

.mini-leaderboard { flex-grow: 1; display: flex; flex-direction: column; overflow: hidden; }
.mini-leaderboard h3 { font-size: 1.05rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 8px; margin-bottom: 8px; text-align: center; }
.scroll-list { overflow-y: auto; flex-grow: 1; padding-right: 5px; }
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

.amount-wrapper { display: flex; gap: 15px; margin-bottom: 12px; align-items: stretch; }
.currency-toggle { display: flex; background: #e2e8f0; border-radius: 8px; overflow: hidden; border: 2px solid var(--border); }
.curr-btn {
    flex: 1; padding: 0 18px; font-size: 1.5rem; font-weight: 800; cursor: pointer;
    border: none; background: transparent; color: var(--text-light); transition: 0.3s;
}
.curr-btn.active { background: var(--dark-blue); color: var(--gold); }

.input-symbol-wrapper { flex-grow: 1; position: relative; display: flex; align-items: center; }
.floating-symbol { position: absolute; right: 15px; font-size: 1.6rem; font-weight: 800; color: var(--gold); pointer-events: none; }
.hero-amount-input {
    width: 100%; padding: 12px 40px 12px 12px;
    font-size: 1.6rem; font-weight: 800; color: var(--dark-blue);
    border: 2px solid var(--gold); border-radius: 8px; text-align: center;
    background: #fffdf5; outline: none; transition: 0.2s; box-shadow: inset 0 2px 4px rgba(212,175,55,0.1);
}
.hero-amount-input:focus { background: #ffffff; box-shadow: 0 0 12px rgba(212,175,55,0.3); border-color: var(--dark-blue); }
.hero-amount-input:disabled { background: #e2e8f0; border-color: #cbd5e0; color: #718096; cursor: not-allowed; }

.compact-form { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 10px; }
.input-group { display: contents; } 
#fname { order: 1; } #lname { order: 2; } #phone { order: 3; } #zeout { order: 4; } #email { order: 5; } #solicitor-select { order: 6; } #comment { order: 7; grid-column: span 3; } 

.compact-form input, .compact-form select { 
    width: 100%; padding: 8px; border: 1px solid var(--border); border-radius: 6px; 
    font-size: 0.9rem; font-family: inherit; background: #f8fafc; outline: none; transition: 0.2s; text-align: center;
}
.compact-form input:focus, .compact-form select:focus { border-color: var(--gold); background: white; }

.input-error { 
    border-color: #e53e3e !important; background-color: #fff5f5 !important; color: #e53e3e;
    animation: blink-error 1s infinite; 
}
@keyframes blink-error {
    0%, 100% { border-color: #e53e3e; box-shadow: 0 0 5px rgba(229,62,62,0.4); }
    50% { border-color: transparent; box-shadow: none; }
}

#solicitor-select { background-color: #e8f4fd; border: 1px solid var(--dark-blue); color: var(--dark-blue); font-weight: 600; }
#solicitor-select:focus { background-color: #d1e8ff; }

.payment-area { 
    width: 100%; height: 310px; flex-shrink: 0; position: relative; 
    display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden;
}
.loader-overlay {
    position: absolute; inset: 0; background: #f8fafc; border-radius: 6px; border: 1px dashed #cbd5e0;
    display: flex; flex-direction: column; justify-content: center; align-items: center; color: var(--text-light);
    font-weight: bold; font-size: 0.95rem; z-index: 1; text-align: center;
}
.loader-overlay::before {
    content: ""; width: 35px; height: 35px; margin-bottom: 10px;
    border: 3px solid #e2e8f0; border-top-color: var(--gold); border-radius: 50%; animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
#NedarimFrame { width: 100%; height: 310px !important; border: none; position: relative; z-index: 2; background: transparent; }

.elegant-submit {
    width: 100%; padding: 10px; background: var(--dark-blue); color: white; border: none; border-radius: 8px;
    font-size: 1.15rem; font-weight: 700; font-family: inherit; cursor: pointer; transition: 0.3s;
    margin-top: 5px; text-align: center;
}
.elegant-submit:hover:not(:disabled) { background: var(--gold); box-shadow: 0 4px 10px rgba(212,175,55,0.3); }
.elegant-submit:disabled { background: #e2e8f0; color: #a0aec0; cursor: not-allowed; box-shadow: none; }

.sweet-overlay { position: fixed; inset: 0; background: transparent; z-index: 10000; display: none; opacity: 0; transition: 0.3s ease; pointer-events: none; }
.sweet-alert {
    background: white; width: 90%; max-width: 380px; padding: 30px 20px; border-radius: var(--radius); text-align: center;
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.8); display: none;
    z-index: 10001; opacity: 0; transition: 0.3s ease; box-shadow: 0 15px 40px rgba(0,0,0,0.15); border: 1px solid var(--border); box-sizing: border-box; 
}
.sweet-alert.show, .sweet-overlay.show { display: block; opacity: 1; transform: translate(-50%, -50%) scale(1); pointer-events: auto; }
.sweet-alert h3 { color: var(--dark-blue); margin: 15px 0 10px; font-size: 1.4rem; font-weight: 800; }
.sweet-alert p { color: var(--text-light); font-size: 1rem; margin-bottom: 25px; line-height: 1.4; white-space: pre-wrap; }
.modal-btn { background: var(--dark-blue); color: white; border: none; padding: 10px 30px; border-radius: 6px; cursor: pointer; font-family: inherit; font-size: 1.05rem; font-weight: 700; transition: 0.2s; }
.modal-btn:hover { background: var(--gold); }

.sa-icon { width: 60px; height: 60px; border-radius: 50%; margin: 0 auto; position: relative; border: 3px solid; }
.sa-success { border-color: var(--gold); }
.sa-success::before { content: '✓'; font-size: 35px; color: var(--gold); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.sa-error { border-color: #e53e3e; }
.sa-error::before { content: '✗'; font-size: 35px; color: #e53e3e; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }

/* הגדרות כיוון שפה באנגלית (LTR) */
[dir="ltr"] .solicitor-item { text-align: left; }
[dir="ltr"] .sol-percent { text-align: right; }
[dir="ltr"] .floating-symbol { right: auto; left: 15px; }
[dir="ltr"] .hero-amount-input { padding: 12px 12px 12px 40px; }
[dir="ltr"] .scroll-list { padding-right: 0; padding-left: 5px; }

@media (max-width: 900px) {
    body { overflow: auto; padding: 10px; height: auto; }
    .main-card { flex-direction: column; max-height: none; display: flex; }
    .info-panel, .info-content { display: contents; }
    .info-content h1 { background: var(--dark-blue); color: var(--gold); margin: 0; padding: 25px 15px 5px 15px; order: 1; font-size: 1.6rem; }
    .elegant-stats { background: var(--dark-blue); color: white; margin: 0; padding: 0 15px 25px 15px; order: 2; gap: 12px; }
    .stat-text .target { color: #e2e8f0; }
    .currency-breakdown { margin: 8px 0; }
    .currency-badge { padding: 4px 10px; font-size: 0.9rem; }
    .donate-panel { width: 100%; order: 3; padding: 25px 20px; background: var(--card-bg); }
    .mini-leaderboard { display: flex !important; width: 100%; order: 4; background: var(--dark-blue); color: white; padding: 25px 20px; }
    .mini-leaderboard h3 { color: var(--gold); border-bottom: 1px solid rgba(255,255,255,0.2); margin-top: 0; }
    .solicitor-item { border-bottom: 1px solid rgba(255,255,255,0.1); }
    .sol-stats { color: #e2e8f0; }
    .compact-form { grid-template-columns: repeat(2, 1fr); }
    #comment { grid-column: span 2; }
}
@media (max-width: 480px) {
    .compact-form { grid-template-columns: 1fr; }
    #comment, #fname, #lname, #phone, #zeout, #email, #solicitor-select { grid-column: span 1; }
}`;
