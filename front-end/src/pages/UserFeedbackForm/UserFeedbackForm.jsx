import styled from "styled-components";
import { InputField } from "../../components";
import { FormPageWrapper, FormWrapperContainer } from "../../style/Form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { InputField } from "../../components/Atoms/InputField";

const UserFeedbackForm = () => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const onChange = () => {};

  return (
    <FormPageWrapper>
      <FormWrapperContainer>
        <FormTitle> User Feedback </FormTitle>
        <InputField
          label="Title"
          type="text"
          name="title"
          id="title"
          onChange={onChange}
          required
        />
        <InputField
          label="Description"
          type="=textarea"
          t
          name="description"
          id="description"
          onChange={onChange}
          required
        />
      </FormWrapperContainer>
    </FormPageWrapper>
  );
};

const FormTitle = styled.h2`
  font-size: 2.4rem;
`;

export default UserFeedbackForm;
