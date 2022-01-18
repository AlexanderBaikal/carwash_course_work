import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import Modal from "./Modal";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { checkAuth, logOut } from "./redux/actions/authAction";
import Admin from "./Admin";
import { Button } from "@mui/material";

function App() {
  const user = useSelector((state) => state.auth.user);
  const checkAuthLoading = useSelector((state) => state.auth.checkAuthLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  let navigate = useNavigate();

  useEffect(() => {
    // if (user.role == "ADMIN") {
    //   navigate("/admin", { replace: true });
    // } else if (user.info) {
    //   navigate("/", { replace: true });
    // } else {
    //   navigate("auth", { replace: true });
    // }
    if (!user.info) navigate("auth", { replace: true });
    else navigate("/", { replace: true });
  }, [user]);

  const location = useLocation();

  if (checkAuthLoading) return <div>Загрузка...</div>;

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "40px",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%)",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <Button
          onClick={() => {
            dispatch(logOut());
          }}
        >
          Выйти
        </Button>
        {user.role == "ADMIN" ? (
          <Button
            onClick={() => {
              location.pathname === "/"
                ? navigate("admin", { replace: true })
                : navigate("/", { replace: true });
            }}
          >
            {location.pathname === "/"
              ? "Панель админа"
              : "Панель пользователя"}
          </Button>
        ) : null}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Modal />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="auth" element={<Auth />}></Route>
          <Route path="admin" element={<Admin />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
