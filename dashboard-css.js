export const dashboardCss = `:root {
    --bg: #eef2f5;
    --card-bg: #ffffff;
    --text: #2d3748;
    --gold: #d4af37;
    --dark-blue: #1a365d;
    --border: #e2e8f0;
    --radius: 15px;
}

body {
    font-family: 'Assistant', sans-serif;
    background: var(--bg);
    color: var(--text);
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start; /* שונה מ-center כדי לאפשר גלילה נוחה בנייד */
    min-height: 100vh;
    padding: 70px 15px 30px 15px; /* הוסף מרווח עליון לכפתור החזרה */
}

* { box-sizing: border-box; }

@keyframes spin { to { transform: rotate(360deg); } }
.mini-spinner {
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    vertical-align: text-bottom;
    opacity: 0.7;
}

.back-btn {
    position: fixed !important;
    top: 15px !important;
    right: 15px !important;
    background: white;
    color: var(--dark-blue);
    padding: 8px 16px;
    border-radius: 20px;
    text-decoration: none;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    transition: 0.2s;
    z-index: 99999 !important;
    font-size: 0.95rem;
}
.back-btn:hover { background: var(--dark-blue); color: white; }

.dashboard-wrapper { width: 100%; max-width: 950px; margin-top: 0; }

.dash-card {
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 35px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.08);
}

.auth-card { max-width: 450px; margin: 20px auto; }
.wide-card { max-width: 100%; }

.auth-form h2 { margin-top: 0; color: var(--dark-blue); text-align: center; margin-bottom: 25px; font-size: 1.6rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
.auth-form input {
    width: 100%; padding: 12px; border: 1px solid var(--border);
    border-radius: 8px; font-family: inherit; font-size: 1rem;
}
#login-form input { margin-bottom: 15px; }
.auth-form input:focus { border-color: var(--gold); outline: none; box-shadow: 0 0 5px rgba(212,175,55,0.3); }

.action-btn {
    width: 100%; padding: 14px; background: var(--dark-blue); color: white;
    border: none; border-radius: 8px; font-size: 1.15rem; font-weight: bold;
    cursor: pointer; transition: 0.3s; font-family: inherit; margin-top: 10px;
}
.action-btn:hover { background: var(--gold); transform: translateY(-2px); }

.auth-switch { text-align: center; margin-top: 25px; font-size: 1rem; color: #4a5568; }
.auth-switch a { color: var(--dark-blue); font-weight: bold; text-decoration: none; margin-right: 5px; }
.auth-switch a:hover { color: var(--gold); text-decoration: underline; }

.err-msg { color: #e53e3e; font-size: 0.95rem; text-align: center; min-height: 20px; margin: 10px 0 0 0; font-weight: bold; }
.success-msg { color: #38a169; font-size: 0.95rem; text-align: center; min-height: 20px; margin: 10px 0 0 0; font-weight: bold; }

.user-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--border); padding-bottom: 20px; margin-bottom: 25px; }
.user-header h2 { margin: 0; color: var(--dark-blue); font-size: 1.8rem; line-height: 1.2; }
.logout-btn { background: #fee2e2; color: #dc2626; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: inherit; font-size: 1rem; transition: 0.2s; flex-shrink: 0; }
.logout-btn:hover { background: #fca5a5; }

.dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }

.main-stats-panel { display: flex; flex-direction: column; gap: 25px; }

.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.stat-box { background: #f8fafc; padding: 20px; border-radius: 12px; text-align: center; border: 1px solid var(--border); display: flex; flex-direction: column; justify-content: center; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); }
.stat-box span { display: block; color: #718096; font-size: 1rem; margin-bottom: 8px; font-weight: 600; }
.stat-box strong { display: block; color: var(--dark-blue); font-size: 1.8rem; font-weight: 800; }

.currency-breakdown { display: flex; justify-content: center; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
.badge { padding: 4px 10px; border-radius: 15px; font-size: 0.85rem; font-weight: bold; }
.badge-ils { background: #e2e8f0; color: #2d3748; }
.badge-usd { background: #c6f6d5; color: #22543d; }

.progress-container { width: 100%; background: #e2e8f0; height: 8px; border-radius: 4px; margin: 12px 0 6px 0; overflow: hidden; }
.progress-bar { background: var(--gold); height: 100%; transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
.progress-text { font-size: 0.85rem !important; color: var(--gold) !important; font-weight: 800; }

.actions-panel { display: flex; flex-direction: column; gap: 20px; }

.update-target-box { background: #fffdf5; padding: 20px; border-radius: 12px; border: 1px solid var(--gold); }
.update-target-box h3 { margin: 0 0 15px 0; font-size: 1.2rem; color: var(--dark-blue); }
.target-input-row { display: flex; gap: 10px; }
.target-input-row input { flex: 1; padding: 12px; border: 1px solid #d4af37; border-radius: 8px; font-family: inherit; font-size: 1.05rem; width: 100%; }
.update-btn { padding: 12px 20px; background: var(--gold); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-family: inherit; font-size: 1rem; transition: 0.2s; white-space: nowrap; }
.update-btn:hover { background: #b8962e; }

.link-box { background: #ebf8ff; padding: 20px; border-radius: 12px; border: 1px solid #90cdf4; text-align: center; }
.link-box h3 { margin: 0 0 10px 0; font-size: 1.2rem; color: #2b6cb0; }
.link-box p { font-size: 0.95rem; color: #4a5568; margin-top: 0; margin-bottom: 15px; }

.link-options { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; text-align: right; }
.link-options select, .link-options input[type="number"] { width: 100%; padding: 10px; border: 1px solid #cbd5e0; border-radius: 6px; font-family: inherit; font-size: 0.95rem; background: white; outline: none; }
.link-options select:focus, .link-options input:focus { border-color: #3182ce; }
.lock-label { grid-column: span 2; font-size: 0.9rem; color: #4a5568; display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 600; justify-content: flex-start; }
.lock-label input { width: auto; margin: 0; transform: scale(1.2); }

.link-box > input[type="text"] { width: 100%; padding: 12px; border: 1px solid #cbd5e0; border-radius: 8px; text-align: center; direction: ltr; margin-bottom: 15px; color: #2d3748; background: white; font-size: 1.05rem; font-weight: 600; outline: none; }
.copy-btn { width: 100%; padding: 12px; background: #3182ce; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-family: inherit; font-size: 1.05rem; transition: 0.2s; }
.copy-btn:hover { background: #2b6cb0; }

.donations-history { background: #f8fafc; border: 1px solid var(--border); border-radius: 12px; padding: 25px; display: flex; flex-direction: column; }
.donations-history h3 { margin: 0 0 20px 0; font-size: 1.3rem; color: var(--dark-blue); border-bottom: 2px solid var(--border); padding-bottom: 12px; }
.donations-list { flex-grow: 1; max-height: 450px; overflow-y: auto; padding-right: 10px; }
.donations-list::-webkit-scrollbar { width: 6px; }
.donations-list::-webkit-scrollbar-thumb { background: #cbd5e0; border-radius: 6px; }

.donation-item { border-bottom: 1px solid #e2e8f0; padding: 15px 0; transition: 0.2s; }
.donation-item:hover { background: white; padding-right: 10px; border-radius: 6px; }
.donation-item:last-child { border-bottom: none; }
.d-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.d-name { font-weight: bold; color: var(--dark-blue); font-size: 1.1rem; }
.d-amount { font-weight: 900; color: #38a169; font-size: 1.1rem; }
.d-footer { display: flex; flex-direction: column; font-size: 0.85rem; color: #718096; gap: 4px; }
.d-comment { font-style: italic; color: #4a5568; background: #edf2f7; padding: 6px 10px; border-radius: 6px; margin-top: 4px; display: inline-block; }

/* ====================================================
   התאמות רספונסיביות מעמיקות למובייל (טאבלטים וטלפונים)
   ==================================================== */

@media (max-width: 900px) {
    .dashboard-grid { grid-template-columns: 1fr; gap: 20px; }
    .dash-card { padding: 25px 20px; }
}

@media (max-width: 600px) {
    body { padding: 65px 10px 20px 10px; }
    .form-grid { grid-template-columns: 1fr; } /* טופס הרשמה הופך לטור אחד */
    
    .stats-grid { grid-template-columns: 1fr; } /* קופסאות נתונים אחת מתחת לשנייה */
    
    .user-header { 
        flex-direction: column; 
        align-items: flex-start; 
        gap: 15px; 
    }
    .user-header h2 { font-size: 1.5rem; }
    .logout-btn { 
        width: 100%; 
        padding: 10px; 
    }
    
    .target-input-row { 
        flex-direction: column; /* שדה הסכום והכפתור אחד מתחת לשני */
    }
    .update-btn { 
        width: 100%; 
    }

    .link-options { grid-template-columns: 1fr; } /* מחולל הלינקים טור אחד */
    .lock-label { grid-column: span 1; }

    .donations-history { padding: 15px; }
    
    /* מונע מהסכומים והשמות לדרוס אחד את השני במסך ממש צר */
    .d-header { 
        flex-direction: column; 
        align-items: flex-start; 
        gap: 5px; 
    }
}
`;
