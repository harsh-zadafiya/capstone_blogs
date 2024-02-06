import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavLink = styled(Link)`
    color: white;
    font-size: 1.3rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 0.6rem 1rem;
    border-radius: 0.4rem;
    cursor: pointer;
    opacity: ${({ active }) => (active ? "1" : "0.8")};
    transition: all 200ms ease;
    text-decoration: ${({ active }) => (active ? "underline" : "none")};

    &:hover {
        opacity: 1;
        text-decoration: underline;
    }
`;

export const NavigationLinkPrimary = styled(Link)`
    background: linear-gradient(to bottom right, #56db83, #41b568);
    font-weight: 500;
    padding: 0.6rem 1.4rem;
    border-radius: 1000px;
    margin-left: 0.8rem;
    color: white;
`;

export const RedButton = styled.div`
    background-color: rgba(255, 0, 0, 0.2);
    color: #ff726f;
    padding: 0.6rem 1.4rem;
    border-radius: 1000px;
    box-shadow: 0 0 2px red inset;
    cursor: pointer;
    transition: all 200ms ease;

    &:hover {
        background-color: #ff726f;
        color: white;
        box-shadow: none;
    }
`;
