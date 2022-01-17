import { Input, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login } from "./redux/actions/authAction";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const checkLogin = async () => {
    dispatch(login({ email, password }));
  };

  const checkRegister = async () => {
    if (passwordRegister !== passwordAgain) {
      setErrorMessage("Пароли не совпадают");
    }
    dispatch(register({ email: emailRegister, password: passwordRegister }));
  };

  return (
    <div
      style={{
        width: "98vw",
        height: "98vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
      }}
    >
      <div style={{ width: "300px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Введите e-mail"
            type="email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Введите пароль"
            type="password"
          />
          <Button style={styles.input} variant="contained" onClick={checkLogin}>
            Войти
          </Button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Input
            value={emailRegister}
            onChange={(e) => setEmailRegister(e.target.value)}
            style={styles.input}
            placeholder="Введите e-mail"
          />
          <Input
            value={passwordRegister}
            onChange={(e) => setPasswordRegister(e.target.value)}
            style={styles.input}
            placeholder="Введите пароль"
            type="password"
          />
          <Input
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            style={styles.input}
            placeholder="Подтвердите пароль"
            type="password"
          />
          <Button
            style={styles.input}
            onClick={checkRegister}
            variant="contained"
          >
            Зарегистрироваться
          </Button>
        </div>
        <div style={{ height: "50px" }}>
          <Typography color="red" align="center">
            {errorMessage}
          </Typography>
        </div>
      </div>
    </div>
  );
};

const styles = {
  input: { marginTop: "10px", marginBottom: "10px" },
};

export default Auth;
