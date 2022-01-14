import { Input, Button } from "@mui/material";
import { useState } from "react";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const checkEmail = () => {};

  const checkRegister = () => {};

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
          />
          <Button style={styles.input} variant="contained" onClick={checkEmail}>
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
          />
          <Input
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            style={styles.input}
            placeholder="Подтвердите пароль"
          />
          <Button
            style={styles.input}
            onClick={checkRegister}
            variant="contained"
          >
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  input: { marginTop: "10px", marginBottom: "10px" },
};

export default Auth;
