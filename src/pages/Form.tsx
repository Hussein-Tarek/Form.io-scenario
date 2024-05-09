import axios from "axios";
import { Formio } from "formiojs";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Button, CircularProgress } from "@mui/material";
import arTranslation from "../locale/ar.json";
import enTranslation from "../locale/en.json";
import { projectUrl } from "..";

type User = {
  name: { firstname: string };
  email: string;
};

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [fetchedForm, setFetchedForm] = useState<any>();
  const [user, setUser] = useState<User | null>();
  const { name, path } = useParams();
  const [ar, setAr] = useState({});
  const { i18n } = useTranslation();
  const dir = i18n.dir();

  const lang = i18n.language;
  const form = document.getElementById("formio")!;
  const id = JSON.parse(localStorage.getItem("formioUser")!)?._id;

  // -------- fetching user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("https://fakestoreapi.com/users/3");
      setUser(res.data);
    };
    fetchUser();
  }, []);

  // -------- fetching translation and rendering form
  useEffect(() => {
    const getTranslation = async () => {
      try {
        const data: any = await axios.get(
          `${projectUrl}/language/submission?data.language=ar`
        );
        setAr(data.data[0].data.translation);
        if (form) form.classList.remove("hidden");
        setLoading(false);
      } catch (error: any) {
        setAr({});
        if (form) form.classList.remove("hidden");
        console.log("error fetching translation", error);
        setLoading(false);
      }
    };
    getTranslation();

    //------------------- rendering form  ----------------------------
    if (name) {
      setLoading(true);
      Formio.createForm(
        document.getElementById("formio"),
        `${projectUrl}/${name}/${`${path ? path : ""}`}`,
        {
          language: lang,
          i18n: {
            ar,
            en: enTranslation,
          },
        }
      )
        .then((form) => {
          if (user) {
            form.submission = {
              data: {
                name: user?.name.firstname,
                email: user?.email,
              },
            };
          }
          form.on("customEvent", (e: any) => {
            console.log(e);
          });
          setFetchedForm(form);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }
  }, [lang, user]);

  return (
    <div
      className="container mb-5 form"
      id="main"
      style={{ textAlign: dir === "rtl" ? "right" : "left", marginTop: "50px" }}
    >
      {loading && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}

      <div id="formio"></div>
      {/* <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Button
          variant="outlined"
          onClick={() => {
            fetchedForm.submission = {
              data: {
                ...fetchedForm.submission.data,
                income1: 100,
              },
            };
          }}
        >
          change income 1
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            fetchedForm!.submit();
          }}
        >
          submit data
        </Button>
      </div> */}
    </div>
  );
};

export default Form;
