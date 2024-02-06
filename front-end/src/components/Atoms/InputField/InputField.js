import styled from "styled-components";

export const InputFieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

export const InputFieldLabel = styled.label`
    font-size: 1.4rem;
    color: #707070;
    margin-bottom: 0.4rem;
`;

export const Field = styled.input`
    width: 100%;
    padding: 1.2rem 1rem;
    font-size: 1.6rem;
    border-radius: 0.6rem;
    border: 1px solid #d1d1d1;
    outline: none;
    font-weight: 500;

    &::placeholder {
        color: #bfbfbf;
        font-size: 1.4rem;
    }

    &:hover {
        border: 1px solid #a1a1a1;
    }

    &:focus {
        background-color: #f9f9f9;
        border: 1px solid #a1a1a1;
    }
`;

export const ErrorMessage = styled.span`
    color: red;
    font-size: 1.2rem;
    margin-left: 0.4rem;
    margin-top: 0.4rem;
`;
