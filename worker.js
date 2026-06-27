import { htmlContent } from './html.js';
import { cssContent } from './css.js';
import { jsContent } from './frontend.js';
import { dashboardHtml } from './dashboard-html.js';
import { dashboardCss } from './dashboard-css.js';
import { dashboardJs } from './dashboard-app.js';
// הייבואים החדשים לקבצי האדמין
import { adminHtml } from './admin-html.js';
import { adminCss } from './admin-css.js';
import { adminJs } from './admin-app.js';

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        // 1. הגשת דף הבית (הקמפיין)
        if (
            path === '/' || 
            path === '/index.html' || 
            path === '/campaign' || 
            path === '/campaign/' || 
            path === '/campaign/index.html' || 
            path === '/campaign/en' || 
            path === '/campaign/en/' || 
            path === '/campaign/he' || 
            path === '/campaign/he/'
        ) {
            return new Response(htmlContent, {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        } 
        // 2. הגשת אזור אישי (דאשבורד למתרימים)
        else if (path === '/campaign/dashboard' || path === '/campaign/dashboard/') {
            return new Response(dashboardHtml, {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }
        // 3. נתיב חדש! הגשת מערכת ניהול האדמין
        else if (path === '/campaign/admin' || path === '/campaign/admin/') {
            return new Response(adminHtml, {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }
        
        // --- קבצי עיצוב CSS ---
        else if (path === '/style.css' || path === '/campaign/style.css') {
            return new Response(cssContent, {
                status: 200,
                headers: { 'Content-Type': 'text/css; charset=utf-8' }
            });
        } 
        else if (path === '/campaign/dashboard.css') {
            return new Response(dashboardCss, {
                status: 200,
                headers: { 'Content-Type': 'text/css; charset=utf-8' }
            });
        }
        else if (path === '/campaign/admin.css') { // תוספת אדמין
            return new Response(adminCss, {
                status: 200,
                headers: { 'Content-Type': 'text/css; charset=utf-8' }
            });
        }

        // --- קבצי לוגיקה JS ---
        else if (path === '/app.js' || path === '/campaign/app.js') {
            return new Response(jsContent, {
                status: 200,
                headers: { 'Content-Type': 'application/javascript; charset=utf-8' }
            });
        } 
        else if (path === '/campaign/dashboard.js') {
            return new Response(dashboardJs, {
                status: 200,
                headers: { 'Content-Type': 'application/javascript; charset=utf-8' }
            });
        }
        else if (path === '/campaign/admin.js') { // תוספת אדמין
            return new Response(adminJs, {
                status: 200,
                headers: { 'Content-Type': 'application/javascript; charset=utf-8' }
            });
        }
        // שגיאת 404
        else {
            return new Response('Not Found', { 
                status: 404,
                headers: { 'Content-Type': 'text/plain; charset=utf-8' } 
            });
        }
    }
};
