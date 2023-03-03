import styled from "styled-components";

export const PageConta = styled.section`
    padding: 50px 15px;
        color: #fff;

    h2 {
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        padding: 50px 20px 20px;
        color: #fff;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    th {
        text-transform: uppercase;
        text-align: center;
        font-size: 13px;
        color: #ccc;
    }
    td {
        text-transform: uppercase;
        text-align: center;
        font-size: 13px;
    }
    table {
        margin-bottom: 90px;
    }
    .next {
        display: flex;
        justify-content: space-around;
        margin: -60px 20px 0;
    }
    
    @media (max-width: 425px) {
        tr td {
            max-width: 80px;
            word-wrap: break-word;
            font-size: 12px
        }
        .next {
            Button {
                font-size: 12px;
            }
        }
        .segundaTable {
            Button {
                font-size: 12px;
            }
        }
    }
`;