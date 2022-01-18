import { Button, Input, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "./redux/actions/adminAction";
import { addTransport, updateTransport } from "./redux/actions/authAction";
import UserService from "./services/UserServices";

const styles = {
  input: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
  },
};

const MALE = "MALE";
const FEMALE = "FEMALE";

const ProfileForm = ({
  initFirstName = "",
  initLastName = "",
  initMiddleName = "",
  initGender = MALE,
  setEditProfile,
  userId = null,
  users = null,
}) => {
  const [errors, setErrors] = useState(false);
  const [firstName, setFirstName] = useState(initFirstName || "");
  const [lastName, setLastName] = useState(initLastName || "");
  const [middleName, setMiddleName] = useState(initMiddleName || "");
  const [gender, setGender] = useState(initGender);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      initFirstName?.length ||
      initLastName?.length ||
      initMiddleName?.length
    ) {
      setFirstName(initFirstName);
      setLastName(initLastName);
      setMiddleName(initMiddleName);
    }
  }, [initFirstName, initLastName, initMiddleName]);

  useEffect(() => {
    if (!firstName.length || !lastName.length || !middleName.length) {
      setErrors(true);
    } else {
      setErrors(false);
    }
  }, [firstName, lastName, middleName]);

  const submit = async () => {
    if (errors) {
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (!userId) userId = user.id;

    const response = await UserService.updateUserInfo(
      userId,
      firstName,
      lastName,
      middleName,
      gender
    );
    dispatch(getAllUsers());

    setEditProfile(false);
  };
  return (
    <div style={styles.group}>
      <TextField
        color={errors ? "warning" : "secondary"}
        focused={errors}
        placeholder="Введите Фамилию"
        value={lastName}
        style={styles.input}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        style={styles.input}
        color={errors ? "warning" : "secondary"}
        focused={errors}
        placeholder="Введите Имя"
      />
      <TextField
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
        style={{ ...styles.input }}
        color={errors ? "warning" : "secondary"}
        focused={errors}
        placeholder="Введите Отчество"
      />
      <Select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        style={styles.input}
      >
        <MenuItem value={MALE}>Мужчина</MenuItem>
        <MenuItem value={FEMALE}>Женщина</MenuItem>
      </Select>
      <Button style={styles.input} variant="contained" onClick={submit}>
        Готово
      </Button>
    </div>
  );
};

export default ProfileForm;
