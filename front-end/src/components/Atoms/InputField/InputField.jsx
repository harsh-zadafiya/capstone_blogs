import { InputFieldGroup, InputFieldLabel, Field, ErrorMessage } from "./InputField";

const InputField = ({ label, id, error, ...otherProps }) => {
    return (
        <InputFieldGroup>
            <InputFieldLabel htmlFor={id}>{label}</InputFieldLabel>
            <Field id={id} {...otherProps} />
            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        </InputFieldGroup>
    );
};

export default InputField;
