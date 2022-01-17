import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import Modal from "./Modal";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { checkAuth } from "./redux/actions/authAction";

function App() {
  const user = useSelector((state) => state.auth.user);
  const checkAuthLoading = useSelector((state) => state.auth.checkAuthLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  let navigate = useNavigate();

  useEffect(() => {
    if (user.info) {
      navigate("/", { replace: true });
    } else {
      navigate("auth", { replace: true });
    }
  }, [user]);

  if (checkAuthLoading) return <div>Загрузка...</div>;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Modal />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="auth" element={<Auth />}></Route>
      </Routes>
    </div>
  );
}

export default App;
