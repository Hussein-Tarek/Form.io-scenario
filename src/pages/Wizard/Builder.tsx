import { FormBuilder } from "@formio/react";
import { useState } from "react";

import { useTranslation } from "react-i18next";

import arTranslation from "../../locale/ar.json";
import enTranslation from "../../locale/en.json";

type BuilderProps = {
  handleBuiltForm: (data: any) => void;
};
const Builder = ({ handleBuiltForm }: BuilderProps) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [data, setData] = useState<{ display?: string; components?: [] }>({
    display: "form",
    components: [],
  });

  return (
    <div style={{ marginTop: "30px" }}>
      <FormBuilder
        key={lang}
        form={data}
        options={{
          language: lang,
          i18n: { ar: arTranslation, en: enTranslation },
          builder: {
            advanced: false,
            layout: false,
            data: false,
            premium: false,
          },
        }}
        onChange={(change: any) => {
          setData((d) => {
            return { ...d, change };
          });
          handleBuiltForm(data);
        }}
      />
    </div>
  );
};

export default Builder;

export const access = [
  {
    type: "create_own",
    roles: [],
  },
  {
    type: "create_all",
    roles: [],
  },
  {
    type: "read_own",
    roles: [],
  },
  {
    type: "read_all",
    roles: [
      "65a3d5870590873630e0c14c",
      "65a3d5870590873630e0c150",
      "65a3d5870590873630e0c154",
      "65ad0ce31bbac57a83633ae6",
      "000000000000000000000000",
    ],
  },
  {
    type: "update_own",
    roles: ["000000000000000000000000"],
  },
  {
    type: "update_all",
    roles: ["000000000000000000000000"],
  },
  {
    type: "delete_own",
    roles: ["000000000000000000000000"],
  },
  {
    type: "delete_all",
    roles: ["000000000000000000000000"],
  },
  {
    type: "team_read",
    roles: [],
  },
  {
    type: "team_write",
    roles: [],
  },
  {
    type: "team_admin",
    roles: [],
  },
];
export const submissionAccess = [
  {
    type: "create_own",
    roles: ["000000000000000000000000"],
  },
  {
    type: "create_all",
    roles: ["000000000000000000000000"],
  },
  {
    type: "read_own",
    roles: ["000000000000000000000000"],
  },
  {
    type: "read_all",
    roles: ["000000000000000000000000"],
  },
  {
    type: "update_own",
    roles: ["000000000000000000000000"],
  },
  {
    type: "update_all",
    roles: ["000000000000000000000000"],
  },
  {
    type: "delete_own",
    roles: ["000000000000000000000000"],
  },
  {
    type: "delete_all",
    roles: ["000000000000000000000000"],
  },
  {
    type: "team_read",
    roles: [],
  },
  {
    type: "team_write",
    roles: [],
  },
  {
    type: "team_admin",
    roles: [],
  },
];
