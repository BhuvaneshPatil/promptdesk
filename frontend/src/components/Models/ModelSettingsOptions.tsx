import React from "react";
import InputField from "@/components/Form/InputField";
import DropDown from "@/components/Form/DropDown";

const ModelSettingsOptions: React.FC<any> = ({
  selectedModel,
  updateModel,
}) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 grid-cols-8 m-2">
      <div className="col-span-2">
        <InputField
          label="Model Name"
          id="model-name"
          value={selectedModel.name || ""}
          onInputChange={(value) => updateModel("name", value)}
        />
      </div>
      <div className="col-span-2">
        <InputField
          label="Provider"
          id="provider"
          value={selectedModel.provider || ""}
          onInputChange={(value) => updateModel("provider", value)}
        />
      </div>
      <div className="col-span-2">
        <DropDown
          label="Model Type"
          id="model-type"
          options={[
            { name: "Completion", value: "completion" },
            { name: "Chat", value: "chat" },
            { name: "Embedding", value: "embedding" },
          ]}
          selected={selectedModel.type}
          onChange={(value: any) => updateModel("type", value)}
        />
      </div>
      <div className="col-span-2">
        <DropDown
          label="Default model"
          id="default-model"
          options={[
            { value: true, name: "True" },
            { value: false, name: "False" },
          ]}
          selected={selectedModel.default}
          onChange={(value: any) => updateModel("default", value === "true")}
        />
      </div>
    </div>
  );
};

export default ModelSettingsOptions;
