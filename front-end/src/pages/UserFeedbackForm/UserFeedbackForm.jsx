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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <InputField
          label="Description"
          type="textarea"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <SelectField
          label="Select Topic"
          name="topic"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          <option value="Select all">Select all</option>
          <option value="food">Food</option>
          <option value="sports">Sports</option>
          <option value="travel">Travel</option>
          <option value="fashion">Fashion</option>
          <option value="health">Health</option>
        </SelectField>
        <SubmitButton type="submit" value="Submit" />
      </FormWrapperContainer>
    </FormPageWrapper>
  );
};

const FormTitle = styled.h2`
  font-size: 2.4rem;
`;

export default UserFeedbackForm;
