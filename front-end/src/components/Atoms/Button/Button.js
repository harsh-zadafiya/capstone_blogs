import styled, { css } from "styled-components";
import button from "./constant";

const { SMALL, LARGE } = button.size;
const { PRIMARY, SECONDARY, OUTLINE } = button.variant;

const primaryButton = css`
    /* background-color: #50c878; */
    background: linear-gradient(to bottom right, #56db83, #41b568);
    color: white;
    box-shadow: 2px 4px 1.2rem rgba(80, 200, 120, 0.25);

    &:hover {
        background-color: #50c878;
        box-shadow: 3px 6px 1.6rem rgba(80, 200, 120, 0.33);
    }
`;

const secondaryButton = css`
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
`;

const outlineButton = css`
    border: 1px solid blue;
    color: blue;
    background-color: transparent;
`;

export const Button = styled.button`
    outline: none;
    border: none;
    border-radius: 0.6rem;
    text-transform: uppercase;
    font-weight: 550;
    font-size: ${({ size }) => (size === SMALL ? "1.2rem" : "1.4rem")};
    padding: ${({ size }) => (size === SMALL ? "1rem 1.6rem" : size === LARGE ? "1.4rem 3rem" : "1.2rem 2rem")};
    padding-inline: ${({ wider }) => (wider ? "5rem" : "")};
    width: ${({ full }) => (full ? "100%" : "auto")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    opacity: ${({ disabled }) => (disabled ? "0.3" : "1")};
    letter-spacing: ${({ animation }) => (animation ? "0" : "1px")}
    transition: all 150ms ease;

    ${({ variant }) => {
        switch (variant) {
            case PRIMARY:
                return primaryButton;
            case SECONDARY:
                return secondaryButton;
            case OUTLINE:
                return outlineButton;
            default:
                return;
        }
    }}

${({ animation }) =>
    animation
        ? css`
              &:hover {
                  letter-spacing: 1px;
              }
          `
        : css`
              &:hover {
                  opacity: 0.9;
              }
          `}

`;
