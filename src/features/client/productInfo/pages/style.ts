import { flexColumn } from "@/styles/mixins";
import styled from "styled-components";

export const Container = styled.div` ${flexColumn}`

export const ProductRelations = styled.section`
    width: calc(100% - 80px);
    max-width: 1100px;
    margin: 80px auto 0;
    display: flex;
    flex-direction: column;
    gap: 64px;

    @media screen and (max-width: 900px){
        width: calc(100vw - 40px);
    }
`