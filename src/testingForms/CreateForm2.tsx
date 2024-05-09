import { FormEdit } from "@formio/react";
import axios from "axios";

import { useState } from "react";
import { custom, x } from "./customInputs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import arTranslation from "../locale/ar.json";
import { projectUrl } from "..";

const CreateForm2 = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const lang = i18n.language;

  const [loading, setLoading] = useState(false);

  const createForm = async (data: any) => {
    const token = localStorage.getItem("formioToken");

    const headers = {
      "Content-Type": "application/json",
      // "x-jwt-token": token,
    };
    try {
      setLoading(true);
      const res = await axios.post(`${projectUrl}/form`, data, {
        headers,
      });
      console.log(res);
      alert("Form created successfully");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      alert(error?.response?.data?.message);
    }
    setLoading(false);
  };
  return (
    <div
      className="container my-5 "
      style={{ textAlign: dir === "rtl" ? "right" : "left" }}
    >
      <FormEdit
        key={lang}
        saveText={`${loading ? t("Saving...") : t("Save")}`}
        form={{
          components: [
            {
              label: "الاسم باللغة العربية",
              labelPosition: "top",
              placeholder: "",
              description: "",
              tooltip: "",
              prefix: "",
              suffix: "",
              widget: {
                type: "input",
              },
              inputMask: "",
              displayMask: "",
              applyMaskOn: "change",
              allowMultipleMasks: false,
              customClass: "",
              tabindex: "",
              autocomplete: "",
              hidden: false,
              hideLabel: false,
              showWordCount: false,
              showCharCount: false,
              mask: false,
              autofocus: false,
              spellcheck: true,
              disabled: false,
              tableView: true,
              modalEdit: false,
              multiple: false,
              persistent: true,
              inputFormat: "plain",
              protected: false,
              dbIndex: false,
              case: "",
              truncateMultipleSpaces: false,
              encrypted: false,
              redrawOn: "",
              clearOnHide: true,
              customDefaultValue: "",
              calculateValue: "",
              calculateServer: false,
              allowCalculateOverride: false,
              validateOn: "change",
              validate: {
                required: false,
                pattern: "",
                customMessage: "",
                custom: "",
                customPrivate: false,
                json: "",
                minLength: "",
                maxLength: "",
                strictDateValidation: false,
                multiple: false,
                unique: false,
              },
              unique: false,
              errorLabel: "",
              errors: "",
              key: "countryNameArabic",
              tags: [],
              properties: {},
              conditional: {
                show: null,
                when: null,
                eq: "",
                json: "",
              },
              customConditional: "",
              logic: [],
              attributes: {},
              overlay: {
                style: "",
                page: "",
                left: "",
                top: "",
                width: "",
                height: "",
              },
              type: "textfield",
              input: true,
              refreshOn: "",
              dataGridLabel: false,
              addons: [],
              inputType: "text",
              id: "eo0wvd",
              defaultValue: "",
            },
            {
              label: "الاسم باللغة الانجليزية",
              labelPosition: "top",
              placeholder: "",
              description: "",
              tooltip: "",
              prefix: "",
              suffix: "",
              widget: {
                type: "input",
              },
              inputMask: "",
              displayMask: "",
              applyMaskOn: "change",
              allowMultipleMasks: false,
              customClass: "",
              tabindex: "",
              autocomplete: "",
              hidden: false,
              hideLabel: false,
              showWordCount: false,
              showCharCount: false,
              mask: false,
              autofocus: false,
              spellcheck: true,
              disabled: false,
              tableView: true,
              modalEdit: false,
              multiple: false,
              persistent: true,
              inputFormat: "plain",
              protected: false,
              dbIndex: false,
              case: "",
              truncateMultipleSpaces: false,
              encrypted: false,
              redrawOn: "",
              clearOnHide: true,
              customDefaultValue: "",
              calculateValue: "",
              calculateServer: false,
              allowCalculateOverride: false,
              validateOn: "change",
              validate: {
                required: false,
                pattern: "",
                customMessage: "",
                custom: "",
                customPrivate: false,
                json: "",
                minLength: "",
                maxLength: "",
                strictDateValidation: false,
                multiple: false,
                unique: false,
              },
              unique: false,
              errorLabel: "",
              errors: "",
              key: "countryNameArabic1",
              tags: [],
              properties: {},
              conditional: {
                show: null,
                when: null,
                eq: "",
                json: "",
              },
              customConditional: "",
              logic: [],
              attributes: {},
              overlay: {
                style: "",
                page: "",
                left: "",
                top: "",
                width: "",
                height: "",
              },
              type: "textfield",
              input: true,
              refreshOn: "",
              dataGridLabel: false,
              addons: [],
              inputType: "text",
              id: "efam93g",
              defaultValue: "",
            },
          ],
        }}
        options={{
          cdnUrl: { projectUrl },
          language: lang,
          i18n: { ar: arTranslation },
          builder: {
            custom,
            x,
          },
        }}
        saveForm={createForm}
      />
    </div>
  );
};

export default CreateForm2;
