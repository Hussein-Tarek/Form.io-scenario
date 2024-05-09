import { Formio } from "formiojs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectUrl } from "..";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const createForm = async (url: string, id: string) => {
      const form = await Formio.createForm(document.getElementById(id), url);
      form.on("submit", () => {
        navigate("/");
      });
    };
    createForm(`http://k8s.formio.com/formio/user/login`, "formio");
    createForm(`http://k8s.formio.com/admin/login`, "formio2");
  }, []);
  return (
    <>
      <h1>User login</h1>
      <div id="formio"></div>
      <h1>Admin login</h1>
      <div id="formio2"></div>
    </>
  );
};

export default Login;
