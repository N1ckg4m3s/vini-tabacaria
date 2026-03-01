import { flexCenter, flexColumn } from "@/styles/mixins";
import { GlobalColors } from "@/styles/theme";
import styled from "styled-components";

export const PageContainer = styled.div`
    ${flexCenter}
    min-height: 100vh;
`

export const LoginContainer = styled.div`
  width: 100%;
  max-width: 360px;
  background: ${GlobalColors.Neutral[700]};
  border: 1px solid ${GlobalColors.Border.strong};
  padding: 32px;
  border-radius: 10px;
`

export const LoginTitle = styled.h1`
    margin-bottom: 24px;
    font-size: 20px;
    font-weight: 500;
    color: ${GlobalColors.Text.primary};
    text-align: center;
`

export const LoginForm = styled.form`
    ${flexColumn}
    gap: 16px;
`

export const FormField = styled.div`
    ${flexColumn}
    gap: 6px;
`

export const LabelLabel = styled.label`
    font-size: 13px;
    color: ${GlobalColors.Text.secondary};
`

export const FormInput = styled.input`
    height: 40px;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid ${GlobalColors.Border.subtle};
    background: ${GlobalColors.Neutral[900]};
    color: ${GlobalColors.Text.primary};

    &:focus{
        outline: none;
        border-color: ${GlobalColors.Border.focus};
    }
`

export const LoginButton = styled.button`
    margin-top: 12px;
    height: 42px;
    border-radius: 6px;
    border: none;
    background: ${GlobalColors.Primary.base};
    color: ${GlobalColors.Text.primary};
    font-weight: 500;
    cursor: pointer;
    
    &:hover{
        background: ${GlobalColors.Primary.strong};
    }
`