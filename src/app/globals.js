import { css } from 'linaria'
import reset from 'react-style-reset/string'

css`
  :global() {
    ${reset}
  }
`
