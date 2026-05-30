export const dashboardCss = `:root {
    --bg: #eef2f5;
    --card-bg: #ffffff;
    --text: #2d3748;
    --gold: #d4af37;
    --dark-blue: #1a365d;
    --border: #e2e8f0;
    --radius: 12px;
}

body {
    font-family: 'Assistant', sans-serif;
    background: var(--bg);
    color: var(--text);
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

* { box-sizing: border-box; }

.back-btn {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    color: var(--dark-blue);
    padding: 8px 16px;
    border-radius: 20px;
    text-decoration: none;
    font-weight: 600;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: 0.2s;
}
.back-btn:hover { background: var(--dark-blue); color: white; }

.dashboard-wrapper { width: 100%; max-width: 450px; padding: 20px; }

.dash-card {
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 30px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.tabs { display: flex; border-bottom: 2px solid var(--border); margin-bottom: 20px; }
.tab-btn {
    flex: 1; padding: 10px; background: none; border: none; font-size: 1.1rem;
    font-weight: 600; font-family: inherit; color: #718096; cursor: pointer;
    border-bottom: 2px solid transparent; margin-bottom: -2px; transition: 0.3s;
}
.tab-btn.active { color: var(--dark-blue); border-bottom-color: var(--gold); }

.auth-form h2 { margin-top: 0; color: var(--dark-blue); text-align: center; }
.auth-form input {
    width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid var(--border);
    border-radius: 8px; font-family: inherit; font-size: 1rem;
}
.auth-form input:focus { border-color: var(--gold); outline: none; }

.action-btn {
    width: 100%; padding: 12px; background: var(--dark-blue); color: white;
    border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold;
    cursor: pointer; transition: 0.3s; font-family: inherit;
}
.action-btn:hover { background: var(--gold); }

.err-msg { color: #e53e3e; font-size: 0.9rem; text-align: center; min-height: 20px; margin: 10px 0 0 0; }
.success-msg { color: #38a169; font-size: 0.9rem; text-align: center; min-height: 20px; margin: 10px 0 0 0; }

.user-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 15px; margin-bottom: 20px; }
.user-header h2 { margin: 0; color: var(--dark-blue); font-size: 1.3rem; }
.logout-btn { background: #fee2e2; color: #dc2626; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: inherit; }

.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; }
.stat-box { background: #f8fafc; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid var(--border); }
.stat-box span { display: block; color: #718096; font-size: 0.9rem; margin-bottom: 5px; }
.stat-box strong { display: block; color: var(--dark-blue); font-size: 1.4rem; font-weight: 800; }

.update-target-box { background: #fffdf5; padding: 15px; border-radius: 8px; border: 1px solid var(--gold); margin-bottom: 25px; }
.update-target-box h3 { margin: 0 0 10px 0; font-size: 1.1rem; color: var(--dark-blue); }
.target-input-row { display: flex; gap: 10px; }
.target-input-row input { flex: 1; padding: 10px; border: 1px solid var(--border); border-radius: 6px; font-family: inherit; }
.update-btn { padding: 10px 15px; background: var(--gold); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: inherit; }

.link-box { background: #ebf8ff; padding: 15px; border-radius: 8px; border: 1px solid #90cdf4; text-align: center; }
.link-box h3 { margin: 0 0 5px 0; font-size: 1.1rem; color: #2b6cb0; }
.link-box p { font-size: 0.9rem; color: #4a5568; margin-top: 0; }
.link-box input { width: 100%; padding: 10px; border: 1px solid #cbd5e0; border-radius: 6px; text-align: left; direction: ltr; margin-bottom: 10px; color: #2d3748; background: white; }
.copy-btn { width: 100%; padding: 10px; background: #3182ce; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-family: inherit; }
`;
