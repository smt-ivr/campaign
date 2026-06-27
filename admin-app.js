export const adminJs = `
const API_BASE_URL = 'https://smti.uk/campaign/api';
let allVisits = [];
let charts = {};

document.addEventListener('DOMContentLoaded', () => {
    // בודק אם התחברנו בעבר באותו סשן
    const savedPass = sessionStorage.getItem('admin_pass');
    if (savedPass) {
        document.getElementById('admin-pass').value = savedPass;
        loginAdmin();
    }
});

// פונקציית התחברות לאדמין
window.loginAdmin = async function() {
    const pass = document.getElementById('admin-pass').value;
    const errEl = document.getElementById('login-err');
    
    if (!pass) { errEl.innerText = "נא להזין סיסמה"; return; }
    errEl.innerText = "מתחבר ומייבא נתונים...";

    try {
        const res = await fetch(API_BASE_URL + '/admin/visits?p=' + encodeURIComponent(pass));
        const result = await res.json();
        
        if (result.status === 'success') {
            sessionStorage.setItem('admin_pass', pass);
            allVisits = result.data;
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('admin-dashboard').style.display = 'block';
            applyFilters(); // מייצר את התצוגה הראשונית
        } else {
            errEl.innerText = result.message || "סיסמה שגויה";
        }
    } catch (e) {
        errEl.innerText = "שגיאת תקשורת עם השרת";
    }
}

window.logoutAdmin = function() {
    sessionStorage.removeItem('admin_pass');
    location.reload();
}

window.applyFilters = function() {
    const startDate = document.getElementById('filter-date-start').value;
    const endDate = document.getElementById('filter-date-end').value;
    const countryFilter = document.getElementById('filter-country').value;
    
    // סינון הנתונים לפי בחירת המשתמש
    let filtered = allVisits.filter(v => {
        let match = true;
        const vDate = v.created_at.split(' ')[0];
        
        if (startDate && vDate < startDate) match = false;
        if (endDate && vDate > endDate) match = false;
        
        if (countryFilter === 'IL' && v.country !== 'IL') match = false;
        if (countryFilter === 'ABROAD' && (v.country === 'IL' || v.country === 'Unknown')) match = false;
        
        return match;
    });

    updateDashboard(filtered);
}

function updateDashboard(data) {
    // 1. עדכון קוביות (כרטיסיות)
    document.getElementById('total-visits').innerText = data.length.toLocaleString();
    
    const israelCount = data.filter(v => v.country === 'IL').length;
    document.getElementById('israel-visits').innerText = israelCount.toLocaleString();
    document.getElementById('abroad-visits').innerText = (data.length - israelCount).toLocaleString();
    
    // ספירת כניסות היום בלבד
    const today = new Date().toISOString().split('T')[0];
    const todayCount = data.filter(v => v.created_at.startsWith(today)).length;
    document.getElementById('today-visits').innerText = todayCount.toLocaleString();

    // 2. רינדור טבלה (עד 100 שורות למניעת תקיעת דפדפן)
    const tbody = document.getElementById('visits-tbody');
    tbody.innerHTML = '';
    
    data.slice(0, 100).forEach(v => {
        const tr = document.createElement('tr');
        const countryName = v.country === 'IL' ? 'ישראל 🇮🇱' : (v.country !== 'Unknown' ? v.country + ' 🌍' : 'לא ידוע');
        tr.innerHTML = \`
            <td>\${v.created_at}</td>
            <td style="font-weight:bold; color:#1e3a8a;">\${countryName}</td>
            <td>\${v.city || 'לא ידוע'}</td>
            <td style="direction:ltr; text-align:right;">\${v.ip}</td>
            <td style="font-size:0.85em; max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="\${v.user_agent}">\${v.user_agent}</td>
        \`;
        tbody.appendChild(tr);
    });

    // 3. עדכון הגרפים בהתאם לנתונים המסוננים
    renderCharts(data);
}

function renderCharts(data) {
    const datesMap = {};
    const countriesMap = { 'ישראל': 0, 'חו"ל': 0, 'לא ידוע': 0 };

    // הופכים את המערך כדי שהגרף יוצג מהזמן הישן לחדש (משמאל לימין)
    const reversedData = [...data].reverse(); 

    reversedData.forEach(v => {
        const date = v.created_at.split(' ')[0];
        datesMap[date] = (datesMap[date] || 0) + 1;

        if (v.country === 'IL') countriesMap['ישראל']++;
        else if (v.country && v.country !== 'Unknown') countriesMap['חו"ל']++;
        else countriesMap['לא ידוע']++;
    });

    const datesLabels = Object.keys(datesMap);
    const datesValues = Object.values(datesMap);

    // גרף קווים - ציר זמן
    if (charts.lineChart) charts.lineChart.destroy();
    const ctxLine = document.getElementById('visitsChart').getContext('2d');
    charts.lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: datesLabels,
            datasets: [{
                label: 'מספר כניסות',
                data: datesValues,
                borderColor: '#1e3a8a',
                backgroundColor: 'rgba(30, 58, 138, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'מגמת כניסות לאורך זמן (מסונן)', font: { size: 16, family: 'Assistant' } } }
        }
    });

    // גרף עוגה - חלוקה גיאוגרפית
    if (charts.pieChart) charts.pieChart.destroy();
    const ctxPie = document.getElementById('countryChart').getContext('2d');
    charts.pieChart = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: Object.keys(countriesMap),
            datasets: [{
                data: Object.values(countriesMap),
                backgroundColor: ['#3b82f6', '#10b981', '#94a3b8'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'התפלגות גאוגרפית', font: { size: 16, family: 'Assistant' } } }
        }
    });
}
`;
