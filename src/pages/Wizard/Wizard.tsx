import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StructureForm from "./StructureForm";
import Builder, { submissionAccess, access } from "./Builder";
import LookupForm from "./LookupForm";
import axios from "axios";
import { projectUrl } from "../..";
import { useTranslation } from "react-i18next";

function toCamelCase(str: string) {
  return str
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}

const createForm = async (data: any, path: string) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const dataToSend = {
    ...data,
    name: path,
    path: path,
    title: path,
    display: "form",
    type: "form",
    access: access,
    submissionAccess: submissionAccess,
  };
  try {
    const res = await axios.post(`${projectUrl}/form`, dataToSend, {
      headers,
    });
    console.log(res);
    alert("Form created successfully");
    return res;
  } catch (error: any) {
    console.log(error);
    alert(
      error?.response?.data?.message || "Something went wrong, please try again"
    );
  }
};

const steps = ["إنشاء القائمة المرجعية", "تصميم هيكل القائمة", "إدارة العناصر"];

export default function Wizard() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [form, setForm] = React.useState<any>();
  const [builtForm, setBuiltForm] = React.useState<any>();
  const [path, setPath] = React.useState<string>();
  const [id, setId] = React.useState<string>();
  const { t } = useTranslation();

  const handleForm = (data: any) => {
    setForm(data);
  };
  const handleBuiltForm = (data: any) => {
    setBuiltForm(data);
  };
  const handleCreateForm = async () => {
    const res = await createForm(builtForm, path || "");
    setId(res?.data._id);
    form.submission.data.id = res?.data._id;
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (form.submission.data.listNameEnglish) {
        setPath(toCamelCase(form.submission.data.listNameEnglish));
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        alert("list name is required");
      }
    }

    if (activeStep === 1) {
      handleCreateForm();
    }

    if (activeStep === steps.length - 1) {
      form.submit();
    }
    if (activeStep !== 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel sx={{ display: "block" }} {...labelProps}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: activeStep !== 0 ? "none" : "block" }}>
            <StructureForm handleForm={handleForm} />
          </Box>
          <Box sx={{ display: activeStep !== 1 ? "none" : "block" }}>
            <Builder handleBuiltForm={handleBuiltForm} />
          </Box>
          <Box sx={{ display: activeStep !== 2 ? "none" : "block" }}>
            <LookupForm id={id || ""} />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              {t("Back")}
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : t("Next")}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
