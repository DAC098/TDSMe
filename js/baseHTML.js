module.exports = function(html_str) {
    return `<!doctype html>
<html>
    <head>
        <title>TDSMe</title>
        <meta charset="utf-8">
        <meta name="description" content="A Site about me">
        <meta name="author" content="David A. Cathers">
        <meta name="keywords" content="DAC,TDS,David Cathers,david cathers,David C,david c,o98dac">
        <link rel="stylesheet" type="text/css" href="/style/main.css">
    </head>
    <body>
        <div id="ren">${html_str}</div>
        <script src="/scripts/bundle.js"></script>
    </body>
</html>`
}
