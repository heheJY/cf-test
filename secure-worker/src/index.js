/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 1) /secure → HTML page with email, timestamp, link to country
    if (path === '/secure') {
      const email = request.headers.get('Cf-Access-Authenticated-User-Email') || 'anonymous';
      const timestamp = new Date().toISOString();
      // country code from Cloudflare’s geo header (ISO 3166-1 alpha-2)
      const country = (request.headers.get('cf-ipcountry') || 'unknown').toLowerCase();

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="utf-8"><title>Secure</title></head>
        <body>
          <p>${email} authenticated at ${timestamp} 
             from <a href="/secure/${country}">${country.toUpperCase()}</a>
          </p>
        </body>
        </html>
      `;
      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // 2) /secure/{country} → fetch flag from R2 and return with proper content-type
    const securePrefix = '/secure/';
    if (path.startsWith(securePrefix)) {
      const countryCode = path.slice(securePrefix.length).toLowerCase();
      const key = `${countryCode}.svg`;      // e.g. "us.svg", "fr.svg"
      const obj = await env.FLAGS.get(key);
      if (obj === null) {
        return new Response('Flag not found', { status: 404 });
      }
      return new Response(obj.body, {
        headers: { 'Content-Type': 'image/svg+xml' }
      });
    }

    // everything else: 404
    return new Response('Not Found', { status: 404 });
  }
};

