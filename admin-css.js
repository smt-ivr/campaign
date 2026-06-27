export const adminCss = `:root {
    --bg: #f3f4f6;
    --card: #ffffff;
    --primary: #1e3a8a;
    --gold: #d4af37;
    --text: #1f2937;
    --border: #e5e7eb;
}
body { font-family: 'Assistant', sans-serif; background: var(--bg); color: var(--text); margin: 0; direction: rtl; }
* { box-sizing: border-box; }

/* מסך התחברות */
.login-container { display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); }
.login-box { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.2); text-align: center; width: 350px; }
.login-box h2 { margin-top: 0; color: var(--primary); font-size: 26px; }
.login-box input { width: 100%; padding: 14px; margin: 20px 0; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; text-align: center; outline: none; transition: 0.3s; font-family: inherit; }
.login-box input:focus { border-color: var(--primary); }
.login-box button { width: 100%; padding: 14px; background: var(--primary); color: white; border: none; border-radius: 8px; font-size: 18px; cursor: pointer; font-weight: bold; transition: 0.3s; font-family: inherit; }
.login-box button:hover { background: var(--gold); }
.err-msg { color: #dc2626; margin-top: 15px; font-weight: bold; min-height: 20px; }

/* פאנל ניהול */
.admin-header { background: var(--primary); color: white; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.admin-header h1 { margin: 0; font-size: 22px; font-weight: 800; }
.logout-btn { background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 18px; border-radius: 8px; cursor: pointer; font-weight: bold; font-family: inherit; transition: 0.2s; }
.logout-btn:hover { background: rgba(255,255,255,0.3); }

.dashboard-content { padding: 30px; max-width: 1400px; margin: 0 auto; }

.stats-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px; }
.card { background: var(--card); padding: 25px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); text-align: center; border: 1px solid var(--border); }
.card h3 { margin: 0 0 10px 0; color: #64748b; font-size: 16px; }
.card-value { font-size: 38px; font-weight: 900; color: var(--text); }
.text-blue { color: #3b82f6; }
.text-green { color: #10b981; }
.text-gold { color: var(--gold); }

.filters-section { background: var(--card); padding: 25px; border-radius: 16px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid var(--border); }
.filters-section h3 { margin-top: 0; color: var(--primary); margin-bottom: 15px; }
.filters-grid { display: flex; gap: 15px; flex-wrap: wrap; }
.filters-grid input, .filters-grid select { padding: 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 15px; flex: 1; min-width: 200px; font-family: inherit; outline: none; }
.filters-grid input:focus, .filters-grid select:focus { border-color: var(--primary); }

.charts-section { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 30px; }
.chart-container { background: var(--card); padding: 20px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); height: 380px; display: flex; justify-content: center; align-items: center; border: 1px solid var(--border); }

@media (max-width: 900px) { .charts-section { grid-template-columns: 1fr; } }

.table-section { background: var(--card); padding: 25px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid var(--border); }
.table-section h3 { margin-top: 0; color: var(--primary); margin-bottom: 20px; }
.table-responsive { overflow-x: auto; max-height: 500px; overflow-y: auto; border-radius: 8px; border: 1px solid var(--border); }
table { width: 100%; border-collapse: collapse; text-align: right; }
th { background: #f8fafc; padding: 15px; position: sticky; top: 0; border-bottom: 2px solid var(--border); color: #475569; font-weight: 800; }
td { padding: 15px; border-bottom: 1px solid var(--border); color: #334155; }
tr:hover { background: #f1f5f9; }
`;
