import { FormBuilder } from "@formio/react";
import axios from "axios";

import { useState } from "react";
import { custom, x } from "./customInputs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import arTranslation from "../locale/ar.json";
import { projectUrl } from "..";
import { Button, Form } from "react-bootstrap";
// import Form from "react-bootstrap/Form";

const CreateForm = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const lang = i18n.language;

  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("form");
  const [display, setDisplay] = useState("form");
  const [data, setData] = useState<{ display?: string; components?: [] }>({
    display: "form",
    components: [],
  });
  console.log(data);
  const [loading, setLoading] = useState(false);

  const createForm = async () => {
    const token = localStorage.getItem("formioToken");

    const headers = {
      "Content-Type": "application/json",
      // "x-jwt-token": token,
    };
    const dataToSend = {
      ...data,
      name: "name",
      path: "path",
      title: "title",
      display: "form",
      type: "form",
    };
    try {
      setLoading(true);
      const res = await axios.post(`${projectUrl}/form`, dataToSend, {
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
      <div
        className="d-flex flex-row mb-4"
        style={{
          gap: "10px",
        }}
      >
        {/* <div
          className="d-flex flex-row"
          style={{
            gap: "10px",
          }}
        >
           <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("Name")}
            required
          />
         <input
            id="path"
            name="path"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder={t("Path")}
            required
          />
          <input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("Title")}
            required
          /> 
          <Form.Select
            onChange={(e) => {
              const value = e.target.value;
              setDisplay(value);
              setData((d) => {
                return { ...d, display: value };
              });
            }}
            aria-label="Default select example"
          >
            <option value="form">{t("Form")}</option>
            <option value="wizard">{t("Wizard")}</option>
          </Form.Select>
          <Form.Select
            onChange={(e) => {
              const value = e.target.value;
              setType(value);
            }}
            aria-label="Default select example"
          >
            <option defaultValue="form" value="form">
              {t("Form")}
            </option>
            <option value="resource">{t("Resource")}</option>
          </Form.Select>
        </div> */}
        <Button onClick={createForm}>
          {`${loading ? t("Creating...") : t("Create")}`}
        </Button>
      </div>
      <FormBuilder
        key={JSON.stringify({ display, lang })}
        form={data}
        options={{
          language: lang,
          i18n: { ar: arTranslation },
          builder: {
            advanced: false,
            layout: false,
            data: false,
            premium: false,

            // custom,
            // x: x,
          },
        }}
        onChange={(change: any) => {
          setData((d) => {
            return { ...d, change };
          });
        }}
      />
      {/* <FormBuilder form={{}} /> */}
    </div>
  );
};

export default CreateForm;
