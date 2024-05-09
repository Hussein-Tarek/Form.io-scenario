import { FormBuilder } from "@formio/react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import arTranslation from "../locale/ar.json";
// import Button from "react-bootstrap/Button";

import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { custom, x } from "./customInputs";
import { Formio } from "formiojs";
import { projectUrl } from "..";

const token = localStorage.getItem("formioToken");

const headers = {
  // "x-jwt-token": token,
};

const EditForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState(null);

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const lang = i18n.language;

  useEffect(() => {
    Formio.Components.components.textfield.editForm = function () {
      return {
        components: [
          {
            type: "textfield",
            key: "label",
            label: "Label",
            display: "display",
          },
          {
            type: "checkbox",
            key: "validate.required",
            label: "Required",
          },
        ],
      };
    };
    const getForm = async () => {
      try {
        setLoadingForm(true);
        const data = await axios.get(`${projectUrl}/form/${id}`, { headers });
        setForm(data.data);
      } catch (error) {
        console.log(error);
      }
      setLoadingForm(false);
    };
    getForm();
  }, [id]);

  ///// handle edit form
  const editForm = async () => {
    console.log("data", data);
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
      console.log(res);
      alert("Successfully updated");
      // location.reload();
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error?.response.data);
    }
    setLoading(false);
  };

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
          >
            {/* <Button variant="primary" onClick={editForm}>
              {`${loading ? t("Saving...") : t("Save")}`}
            </Button> */}
          </div>
          <FormBuilder
            key={lang}
            form={form}
            options={{
              language: lang,
              i18n: { en, ar: arTranslation },
              builder: {
                custom,
                x: x,
              },
            }}
            onChange={(change) => {
              setData(change);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EditForm;

const ar = {
  "First Name": "الاسم الاول",
  "Last Name": "الاسم الاخير",
  "Fields Pool": " حقول ",
  Name: "اسم",
  Basic: "بسيط",
  Title: "عنوان",
  Type: "نوع",
  "Text Field": "حقل",
  Form: "فورم",
  Cancel: "الغاء",
  Page: "صفحة",
  "Page 1": "1 صفحة",
  Validation: "تحقق",
};
const en = {
  Name: "Name",
  Basic: "Basic",
  Title: "Title",
  Type: "Type",
  "Text Field": "Text Field",
};
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
