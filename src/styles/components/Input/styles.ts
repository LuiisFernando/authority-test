import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    input {
      width: 100%;
      margin-bottom: 10px;
      height: 44px;
      padding: 13px 20px;
      outline: 0;
      border-radius: 6px;
      border: 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background: #eeeeee;
      background-size: 12px 19px;
      background-position: right 16px center;
      
      color: #000;
      font-size: 0.875rem;
      font-weight: 800;
      font-family: "Mulish";

      &:disabled {
        opacity: 0.5;
      }

      
      &.error-input {
          border: 1px solid red;
        }
    }
    
    .error-message {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 0.725rem;
        color: red;
        font-family: 'Mulish';
        font-weight: 800;
    }
`;