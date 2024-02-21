import styled from "styled-components";
import { FormPageWrapper, FormWrapperContainer } from "../../style/Form";
import { Link, useNavigate } from "react-router-dom";
import path from "../../constants/path";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ForgotForm from "../../components/Organisms/ForgotFrom/ForgotForm";

const ForgotPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    console.log(Object.keys(user));
    Object.values(user).length !== 0 && navigate(path.APP);
  }, [user]);

  return (
    <FormPageWrapper>
      <FormWrapperContainer>
        <FormTitle>Forgot Password</FormTitle>
        <ForgotForm />
      </FormWrapperContainer>
    </FormPageWrapper>
  );
};

const FormTitle = styled.h2`
  font-size: 2.4rem;
`;
export default ForgotPage;
