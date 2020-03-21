import { ChunkExtractor } from '@loadable/server'
import React from 'react'
import { renderToString } from 'react-dom/server'

const whitespaceRegExp = /^\s+/gm
const emptyLineRegExp = /^\s*$(?:\r\n?|\n)/gm

const renderer = async ({ path, stats }) => {
  const { default: App } = await import('./App')

  const extractor = new ChunkExtractor({ entrypoints: ['client'], stats })
  const jsx = extractor.collectChunks(<App />)

  const html = renderToString(jsx)
  const styleTags = extractor.getStyleTags()
  const scriptTags = extractor
    .getScriptTags({ type: 'module' })
    .replace(/async/gm, 'defer')

  return `
    <!DOCTYPE html>
    <html lang="fi">
      <head>
        <meta name="version" content="${stats.hash}" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        ${styleTags}
      </head>
      <body>
        <div id="root">${html}</div>
        ${scriptTags}
      </body>
    </html>
  `
    .replace(whitespaceRegExp, '')
    .replace(emptyLineRegExp, '')
}

export default renderer
