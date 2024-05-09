import { Formio } from "formiojs";
import { useEffect } from "react";

import { useTranslation } from "react-i18next";

import arTranslation from "../../locale/ar.json";
import enTranslation from "../../locale/en.json";

type LookupFormProps = {
  id: string;
};

const LookupForm = ({ id }: LookupFormProps) => {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const lang = i18n.language;

  useEffect(() => {
    const createForm = async (url: string) => {
      const form = await Formio.createForm(
        document.getElementById("lookupForm"),
        url,
        {
          language: lang,
          i18n: {
            en: enTranslation,
            ar: arTranslation,
          },
        }
      );
      console.log(form);
    };
    if (id) createForm(`http://k8s.formio.com/fanknyjocegbdzz/form/${id}`);
  }, [id, lang]);
  return (
    <div
      className="container mb-5 form"
      id="main"
      style={{ textAlign: dir === "rtl" ? "right" : "left", marginTop: "30px" }}
    >
      <div id="lookupForm" />
    </div>
  );
};

export default LookupForm;
