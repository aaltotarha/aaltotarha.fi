import './app/globals'

import { css } from 'linaria'

import React from 'react'

const mainClass = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 2rem 1rem;
`

const headerClass = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    text-align: center;

    h1 {
        margin: auto;
    }
`

const footerClass = css`
    justify-content: center;
    display: flex;
    margin-top: auto;
    text-align: center;

    > * {
        margin: 0.5rem;
    }
`

const currentYear = new Date().getFullYear()

const App = () => (
    <main className={mainClass}>
        <header className={headerClass}>
            <h1>Viritetään...</h1>
        </header>
        <footer className={footerClass}>
            <p>© {currentYear} Aaltotarha</p>
            <aside>
                <a href="https://github.com/aaltotarha/aaltotarha.fi" rel="author">
                    GitHub
                </a>
            </aside>
        </footer>
    </main>
)

export default App
