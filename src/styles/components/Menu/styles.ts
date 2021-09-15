import styled from 'styled-components';

export const AppBar = styled.div`
    height: 36px;
    background: red;

    .container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 0 150px;
        height: 100%;
    }

    .logout-container {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        span {
            margin-left: 5px;
            font-family: 'Mulish';
            font-weight: bolder;
            font-size: 1rem;
            color: #FFF;
        }
    }
`;