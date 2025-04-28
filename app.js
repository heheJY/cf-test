// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

app.get('*', (req, res) => {
  const headers = req.headers;
  // Build an HTML page listing all request headers
  let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Request Headers</title>
        <style>
          body { font-family: sans-serif; padding: 2rem; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 0.5rem; text-align: left; }
          th { background: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>HTTP Request Headers</h1>
        <table>
          <thead>
            <tr><th>Header</th><th>Value</th></tr>
          </thead>
          <tbody>`;
  for (const [name, value] of Object.entries(headers)) {
    html += `
            <tr>
              <td>${name}</td>
              <td>${value}</td>
            </tr>`;
  }
  html += `
          </tbody>
        </table>
      </body>
    </html>`;
  res.set('Content-Type', 'text/html');
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Origin server listening on port ${PORT}`);
});
