import { Form, FormBuilder, FormEdit } from "@formio/react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import arTranslation from "../locale/ar.json";
import enTranslation from "../locale/en.json";

import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
// import { custom, x } from "./customInputs";
import { projectUrl } from "..";

type Form = {
  _id: string;
  title: string;
};
const token = localStorage.getItem("formioToken");

const headers = {
  // "x-jwt-token": token,
};

const EditForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState<{ _id: string } | null>(null);

  const [form, setForm] = useState<Form | {}>({});
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const lang = i18n.language;

  useEffect(() => {
    const getForm = async () => {
      try {
        setLoadingForm(true);
        const data = await axios.get(`${projectUrl}/form/${id}`);
        setForm(data.data);
        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
      setLoadingForm(false);
    };
    getForm();
  }, [id]);

  ///// handle edit form
  const editForm = async (data: any) => {
    const headers = {
      "Content-Type": "application/json",
      // "x-jwt-token": token,
    };
    // if (data?._id)
    try {
      setLoading(true);
      const res = await axios.put(`${projectUrl}/form/${data?._id}`, data, {
        headers,
      });
      alert("Successfully updated");
      // location.reload();
      navigate("/");
    } catch (error: any) {
      console.log(error);
      alert(error?.response.data);
    }
    setLoading(false);
  };
  console.log(form);
  return (
    <div
      className="container my-5 "
      style={{
        textAlign: dir === "rtl" ? "right" : "left",
        direction: dir === "rtl" ? "rtl" : "ltr",
      }}
    >
      {loadingForm ? (
        <div className="d-flex align-items-center justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <div
          style={{
            textAlign: dir === "rtl" ? "right" : "left",
            direction: dir === "rtl" ? "rtl" : "ltr",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "5px",
            }}
          ></div>
          <Form />
          <FormEdit
            key={lang}
            form={form}
            saveText={`${loading ? t("Saving...") : t("Save")}`}
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
            saveForm={editForm}
          />
        </div>
      )}
    </div>
  );
};

export default EditForm;

// const ar = {
//   "First Name": "الاسم الاول",
//   "Last Name": "الاسم الاخير",
//   "Fields Pool": " حقول ",
//   Name: "اسم",
//   Basic: "بسيط",
//   Title: "عنوان",
//   Type: "نوع",
//   "Text Field": "حقل",
//   Form: "فورم",
//   Cancel: "الغاء",
//   Page: "صفحة",
//   "Page 1": "1 صفحة",
//   Validation: "تحقق",
// };
// const en = {
//   Name: "Name",
//   Basic: "Basic",
//   Title: "Title",
//   Type: "Type",
//   "Text Field": "Text Field",
// };
{
  /* {loadingForms ? (
    <div className="d-flex justify-content-center">
          <CircularProgress size={20} />
        </div>
      ) : (
        forms.map((form, i) => (
          <button
            className={`btn  m-2 ${
              isActive === i ? "btn-primary" : "btn-light"
            }`}
            key={form._id}
            onClick={() => {
              setForm(forms[i]);
              setIsActive(i);
            }}
          >
            {form.title}
          </button>
        ))
      )}
      <hr /> */
}
{
  /* <FormGridComp /> */
}
