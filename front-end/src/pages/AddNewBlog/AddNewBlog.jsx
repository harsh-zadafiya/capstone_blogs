import styled from "styled-components";
import { LoginForm } from "../../components";
import { FormPageWrapper, FormWrapperContainer } from "../../style/Form";
import {useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InputField from "../../components";
 
const AddNewBlog = () => {
    const navigate = useNavigate();
 
    useEffect(() => {
    }, []);
 
    const onChange = () => {
    };
 
    return (
        <FormPageWrapper>
            <FormWrapperContainer>
                <FormTitle>Add New Blog </FormTitle>
                <LoginForm />
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
 
 
export default AddNewBlog;