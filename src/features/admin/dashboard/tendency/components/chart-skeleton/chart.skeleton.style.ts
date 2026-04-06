import styled from "styled-components";
import { flexCenter, flexColumn, skeletonEffect } from "@/styles/mixins";

export const chartContainer = styled.div`
    width: 100%;
    height: 250px;
    ${flexColumn}
`

export const chartHeader = styled.div`
    width: 100%;
    ${flexCenter}
`

export const chartHeaderTitle = styled.div`
    width: 50%;
    height: 20px;
    margin-bottom: 8px;
    border-radius: 4px;
    ${skeletonEffect}
`

export const chartBody = styled.div`
    ${skeletonEffect}
    width: 100%;
    height: 100%;
`