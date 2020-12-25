import { css } from 'linaria'

css`
    :global() {
        html,
        body {
            height: 100%;
            margin: 0;
        }

        body {
            background-color: hsla(0, 0%, 13%, 1);
            color: hsla(0, 0%, 100%, 1);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
            font-size: 16px;
        }

        #root {
            display: flex;
            flex-direction: column;
            min-height: 100%;
        }

        a {
            color: hsla(0, 0%, 100%, 1);

            &:hover {
                color: hsla(0, 0%, 80%, 1);
            }

            &:active {
                color: hsla(0, 0%, 60%, 1);
            }

            &:visited {
                text-decoration: line-through;
            }
        }
    }
`
