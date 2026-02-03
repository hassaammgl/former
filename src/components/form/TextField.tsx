import { Input } from "../ui/input";
import InputsWrapper from "../custom/inputs-wrapper";

const TextField = () => {
  return (
    <InputsWrapper labelText="Enter Your Label" type="text">
      <Input placeholder="This is placeholder" />
    </InputsWrapper>
  );
};

export default TextField;
