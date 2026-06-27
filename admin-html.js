export const adminHtml = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ניהול קמפיין - סטטיסטיקות כניסה</title>
    <link rel="stylesheet" href="/campaign/admin.css">
    <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;800&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div id="login-screen" class="login-container">
        <div class="login-box">
            <h2>כניסת הנהלה</h2>
            <input type="password" id="admin-pass" placeholder="הקש סיסמת ניהול">
            <button onclick="loginAdmin()">היכנס למערכת</button>
            <p id="login-err" class="err-msg"></p>
        </div>
    </div>

    <div id="admin-dashboard" style="display: none;">
        <header class="admin-header">
            <h1>מעקב חכם - סטטיסטיקות כניסה לקמפיין</h1>
            <button onclick="logoutAdmin()" class="logout-btn">התנתק</button>
        </header>

        <div class="dashboard-content">
            <div class="stats-cards">
                <div class="card">
                    <h3>סה"כ כניסות במערכת</h3>
                    <div class="card-value" id="total-visits">0</div>
                </div>
                <div class="card">
                    <h3>כניסות מישראל</h3>
                    <div class="card-value text-blue" id="israel-visits">0</div>
                </div>
                <div class="card">
                    <h3>כניסות מחו"ל</h3>
                    <div class="card-value text-green" id="abroad-visits">0</div>
                </div>
                <div class="card">
                    <h3>כניסות היום</h3>
                    <div class="card-value text-gold" id="today-visits">0</div>
                </div>
            </div>

            <div class="filters-section">
                <h3>סינון נתונים חכם</h3>
                <div class="filters-grid">
                    <input type="date" id="filter-date-start" title="מתאריך" onchange="applyFilters()">
                    <input type="date" id="filter-date-end" title="עד תאריך" onchange="applyFilters()">
                    <select id="filter-country" onchange="applyFilters()">
                        <option value="ALL">כל המדינות</option>
                        <option value="IL">ישראל בלבד</option>
                        <option value="ABROAD">חו"ל בלבד</option>
                    </select>
                </div>
            </div>

            <div class="charts-section">
                <div class="chart-container">
                    <canvas id="visitsChart"></canvas>
                </div>
                <div class="chart-container pie-container">
                    <canvas id="countryChart"></canvas>
                </div>
            </div>

            <div class="table-section">
                <h3>פירוט כניסות אחרונות (100 אחרונות)</h3>
                <div class="table-responsive">
                    <table id="visits-table">
                        <thead>
                            <tr>
                                <th>תאריך ושעה</th>
                                <th>מדינה</th>
                                <th>עיר</th>
                                <th>כתובת IP</th>
                                <th>דפדפן / מערכת</th>
                            </tr>
                        </thead>
                        <tbody id="visits-tbody">
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <script src="/campaign/admin.js"></script>
</body>
</html>`;
