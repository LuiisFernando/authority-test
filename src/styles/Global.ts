import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        vertical-align: baseline;
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
        color: red;

        &:hover {
            text-decoration: underline;
        }
    }

    button[type='submit'] {
        border: 0;
        height: 40px;
        font-family: 'Mulish';
        font-weight: bold;
        font-size: 1rem;
        color: white;
        background-color: red;
        border-radius: 5px;
        cursor: pointer;

        &:disabled {
            background-color: gray;
            cursor: default;
        }
    }
`;

export default GlobalStyles;