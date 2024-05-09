import { Formio } from "formiojs";
import { useEffect } from "react";

import { useTranslation } from "react-i18next";

import arTranslation from "../../locale/ar.json";
import enTranslation from "../../locale/en.json";

type StructureFormProps = {
  handleForm: (data: any) => void;
};

const StructureForm = ({ handleForm }: StructureFormProps) => {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const lang = i18n.language;
  console.log(arTranslation);
  useEffect(() => {
    const createForm = async (url: string) => {
      const form = await Formio.createForm(
        document.getElementById("formio"),
        url,
        {
          language: lang,
          i18n: {
            en: enTranslation,
            ar: arTranslation,
          },
        }
      );
      handleForm(form);
      console.log(form);
    };
    createForm("http://k8s.formio.com/fanknyjocegbdzz/lookupstructure");
  }, [lang]);
  return (
    <div
      className="container mb-5 form"
      id="main"
      style={{ textAlign: dir === "rtl" ? "right" : "left", marginTop: "30px" }}
    >
      <div id="formio" />
    </div>
  );
};

export default StructureForm;
