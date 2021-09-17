import styled from 'styled-components';

export const Main = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Container = styled.div`
    margin: 0 auto;
    min-width: 450px;
    
    

    .title-container {
        display: flex;
        align-items: center;
        width: 100%;
        
        svg {
            cursor: pointer;
        }
    }

    h1 {
        margin-left: 25px;
        font-family: 'Mulish';
        text-align: center;
        width: 80%;
        align-self: center;
    }

    form {
        margin: 50px auto 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-self: center;
        max-width: 450px;
    }

    .container-newAccount {
        margin: 10px 0 10px 0;
        label {
            font-family: 'Mulish';
            font-weight: bold;
            color: black;
            span {
                margin-left: 10px;
            }
        }
        
    }
`;