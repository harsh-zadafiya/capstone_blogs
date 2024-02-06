import styled from "styled-components";

export const FormPageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 90vh;
`;

export const FormWrapperContainer = styled.div`
    position: absolute;
    top: 15%;
    left: 50%;
    width: 35rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    transform: translateX(-50%);
`;

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

export const ButtonWrapper = styled.div`
    margin-top: 0.8rem;
    width: 100%;
`;

export const ErrorMessage = styled.div`
    background-color: rgba(255, 0, 0, 0.1);
    font-size: 1.4rem;
    color: red;
    border-radius: 6px;
    padding: 0.8rem;
    width: 100%;
    text-align: center;
`;
