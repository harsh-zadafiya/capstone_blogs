import styled from "styled-components";
import { LoginForm } from "../../components";
import { FormPageWrapper, FormWrapperContainer } from "../../style/Form";
import { Link, useNavigate } from "react-router-dom";
import path from "../../constants/path";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const LoginPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.userInfo);

    useEffect(() => {
        console.log(Object.keys(user));
        Object.values(user).length !== 0 && navigate(path.HOME);
    }, [user]);

    return (
        <FormPageWrapper>
            <FormWrapperContainer>
                <FormTitle>Login Form</FormTitle>
                <LoginForm />
                <FooterLink>
                    Don't have an account? <SecondaryLink to={path.SIGN_UP}>Create Now</SecondaryLink>
                </FooterLink>
            </FormWrapperContainer>
        </FormPageWrapper>
    );
};

const FormTitle = styled.h2`
    font-size: 2.4rem;
`;

const FooterLink = styled.span`
    font-size: 1.4rem;
    color: #707070;
`;

const SecondaryLink = styled(Link)`
    color: blue;
    font-weight: 500;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export default LoginPage;
