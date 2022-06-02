import { FormInputLabel, Group, Input } from "./form-input.styles";

const FormInput = ({ label, ...OtherProps }) => {
  return (
    <Group>
      <Input {...OtherProps} />
      {label && (
        <FormInputLabel srink={OtherProps.value.length}>{label}</FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
