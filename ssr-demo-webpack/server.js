const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const express = require('express')
const app = express()
const path = require('path')
const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
  template: require('fs').readFileSync('./index.template.html', 'utf-8'),
})

app.get('*', (req, res) => {
  const context = {
    title: 'ssr',
    meta: `
    <meta charset="utf-8">
    `,
    url: req.url,
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

app.listen(8080, () => {
  console.log('已监听 localhost:8080')
})
