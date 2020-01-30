const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const html = `
    <html>
        <head><title>My First SSR</title></head>
        <body>
            <h1>My First Server Side Render</h1>
            <div>Rendering App Here!</div>
            <script src="/app.js" charset="utf-8"></script>
        </body>
    </html>
  `;

  res.send(html);
});

module.exports = router;
