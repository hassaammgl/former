import { memo } from "react";
import ChoicesFieldConfigs from "../configs/ChoicesFieldConfigs";
import ChoicesFieldWrapper from "@/components/custom/choices-wrapper";
import { MySwitch } from "@/components/custom/choices/my-switch";
import { MyCheckbox } from "@/components/custom/choices/my-checkbox";
import { MyRadio } from "@/components/custom/choices/my-radio";
import { MySelect } from "@/components/custom/choices/my-select";
import { MyMultiSelect } from "@/components/custom/choices/my-multi-select";

const ChoicesFields = memo(function ChoicesFields({ data }: { data: Field }) {
  return (
    <ChoicesFieldWrapper
      data={data}
      configs={<ChoicesFieldConfigs data={data} />}
    >
      {data.type === "switch" && <MySwitch data={data} />}
      {data.type === "checkbox" && <MyCheckbox data={data} />}
      {data.type === "radio" && <MyRadio data={data} />}
      {data.type === "select" && <MySelect data={data} />}
      {data.type === "multiselect" && <MyMultiSelect data={data} />}
    </ChoicesFieldWrapper>
  );
});

export default ChoicesFields;
