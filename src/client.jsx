import { loadableReady } from '@loadable/component'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './App'

const isProduction = process.env.NODE_ENV === 'production'

const root = document.getElementById('root')

const renderReact = (elem) => ReactDOM.createRoot(root, { hydrate: true }).render(elem)

const boot = async () => {
    await loadableReady()
    await renderReact(<App />)
}

boot()

if (!isProduction && module.hot) {
    module.hot.accept('./App', async () => {
        const { default: NextApp } = await import('./App')
        await renderReact(<NextApp />)
    })
}
