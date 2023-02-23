import styled from "styled-components";

export const PageHome = styled.section`
    padding: 50px 15px;

    h2 {
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        padding: 50px 20px 20px;
        color: #fff;
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

    @media (max-width: 425px) {
        tr td {
            max-width: 80px;
            word-wrap: break-word;
            font-size: 12px
        }
    }
`;