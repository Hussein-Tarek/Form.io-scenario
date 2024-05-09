import axios from "axios";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  Button,
  CircularProgress,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { projectUrl } from "..";

const Home = () => {
  const { t } = useTranslation();
  type Form = {
    _id: string;
    title: string;
    path: string;
    type: string;
  };
  const [forms, setForms] = useState<Form[]>([]);

  const { i18n } = useTranslation();
  const dir = i18n.dir();

  const [loading, setLoading] = useState(false);

  // fetching all forms
  const token = localStorage.getItem("formioToken");
  const getAllForm = async () => {
    const headers = {
      "x-jwt-token": token,
    };
    try {
      setLoading(true);
      const data = await axios.get(`${projectUrl}/form?limit=100`);
      setForms(data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getAllForm();
  }, [token]);

  //delete form
  const handleDeleteForm = async (path: string) => {
    try {
      setLoading(true);
      await axios.delete(`${projectUrl}/${path}`);
      getAllForm();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const FormsToRender = forms.filter((form) => form.type === "form");

  const StyledTableCell = styled(TableCell)(() => ({
    textAlign: dir === "rtl" ? "right" : "left",
  }));
  return (
    <div
      className="container"
      id="main"
      style={{
        textAlign: dir === "rtl" ? "right" : "left",
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      <h1>{t("Main list")}</h1>
      {loading ? (
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
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>{t("Form Name")}</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {FormsToRender.map((form, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>
                    <Link
                      key={i}
                      to={`/forms/${form.path}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button>{t(form.title)}</Button>
                    </Link>
                  </StyledTableCell>

                  <StyledTableCell>
                    <Link
                      key={i}
                      to={`/edit/${form._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button>{t("Edit")}</Button>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() => handleDeleteForm(form.path)}>
                      {t("Delete")}
                    </Button>
                  </StyledTableCell>
                  {/* <StyledTableCell>
                    <Link
                      key={i}
                      to={`/progress/${form.path}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button>Progress</Button>
                    </Link>
                  </StyledTableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Home;
