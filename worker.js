import { htmlContent } from './html.js';
import { cssContent } from './css.js';
import { jsContent } from './frontend.js';

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        // הגשת דף הבית
        if (path === '/' || path === '/index.html') {
            return new Response(htmlContent, {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        } 
        // הגשת קובץ הסטייל
        else if (path === '/style.css') {
            return new Response(cssContent, {
                status: 200,
                headers: { 'Content-Type': 'text/css; charset=utf-8' }
            });
        } 
        // הגשת קובץ הלוגיקה של צד הלקוח
        else if (path === '/app.js') {
            return new Response(jsContent, {
                status: 200,
                headers: { 'Content-Type': 'application/javascript; charset=utf-8' }
            });
        } 
        // דף שגיאה לנתיבים לא קיימים
        else {
            return new Response('Not Found', { 
                status: 404,
                headers: { 'Content-Type': 'text/plain; charset=utf-8' } 
            });
        }
    }
};
