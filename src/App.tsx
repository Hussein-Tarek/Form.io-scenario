import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const handleChangeLanguage = (language: string) => {
      const htmlElement = document.documentElement;
      i18n.changeLanguage(language);
      htmlElement.setAttribute("lang", language);
      htmlElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    };
    handleChangeLanguage("ar");
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Container sx={{ mt: 16 }}>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
