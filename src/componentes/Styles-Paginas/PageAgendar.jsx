import styled from "styled-components";

export const PageAgendar = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    
    .myform h2 {
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    .myform {
        display: flex;
        flex-direction: column;
        margin: 0 10px;
        padding: 20px;
        width: 400px;
        min-height: 400px;
        justify-content: center;
        align-items: center;
        background-color: rgb(215, 227, 236);
        box-shadow: 0px 0px 15px #ffffff70;
        border-radius: 8px;
    }
    .myform input {
        margin-bottom: 10px;
        width: 100%;
        border: 0;
        border-radius: 8px;
        background: #141E30;
        padding: 10px 20px;
        color: #ffffff;
        font-size: 14px;
    }
    .myform select {
        margin-bottom: 10px;
        width: 100%;
        border: 0;
        border-radius: 8px;
        background: #141E30;
        padding: 10px 20px;
        color: #ffffff;
        font-size: 14px;
    }
    .myform label {
        font-size: 14px;
        font-weight: 700;
        color: #141E30;
        text-align: left;
        width: 100%;
    }
    .myform input::placeholder {
        color: #ffffff;
    }
`;