import { Button, Input, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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

const CAR = "CAR";
const TRUCK = "TRUCK";
const BUS = "BUS";
const MOTO = "MOTO";

const TransportForm = ({
  initBrand = "",
  initModel = "",
  initRegNumber = "",
  initType = CAR,
  setAddTransport,
  id = -1,
  setEditTransportId,
  userId = -1,
}) => {
  const [errors, setErrors] = useState(false);
  const [brand, setBrand] = useState(initBrand);
  const [model, setModel] = useState(initModel);
  const [regNumber, setRegNumber] = useState(initRegNumber);
  const [type, setType] = useState(initType);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!brand.length || !model.length || !regNumber.length) {
      setErrors(true);
    } else {
      setErrors(false);
    }
  }, [brand, model, regNumber]);

  const submit = () => {
    console.log("submo-it", JSON.parse(localStorage.getItem("user")).id);

    if (errors) {
      return;
    }
    if (id !== -1) {
      dispatch(
        updateTransport({
          userId:
            userId === -1
              ? JSON.parse(localStorage.getItem("user")).id
              : userId,
          carId: id,
          brand,
          model,
          regNumber,
          transportType: type,
        })
      );
      setEditTransportId(-1);
    } else {
      dispatch(
        addTransport({
          userId:
            userId === -1
              ? JSON.parse(localStorage.getItem("user")).id
              : userId,
          brand,
          model,
          regNumber,
          transportType: type,
        })
      );
      if (userId !== -1) dispatch(UserService.getUserInfo(userId));
      setAddTransport(false);
    }
  };
  return (
    <div style={styles.group}>
      <TextField
        color={errors ? "warning" : "secondary"}
        focused={errors}
        placeholder="Введите марку"
        value={brand}
        style={styles.input}
        onChange={(e) => setBrand(e.target.value)}
      />
      <TextField
        value={model}
        onChange={(e) => setModel(e.target.value)}
        style={styles.input}
        color={errors ? "warning" : "secondary"}
        focused={errors}
        placeholder="Введите модель"
      />
      <TextField
        value={regNumber}
        onChange={(e) => setRegNumber(e.target.value)}
        style={{ ...styles.input }}
        color={errors ? "warning" : "secondary"}
        focused={errors}
        placeholder="Введите госномер"
      />
      <Select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={styles.input}
      >
        <MenuItem value={CAR}>Легковое авто</MenuItem>
        <MenuItem value={BUS}>Автобус</MenuItem>
        <MenuItem value={TRUCK}>Грузовик</MenuItem>
        <MenuItem value={MOTO}>Мотоцикл</MenuItem>
      </Select>
      <Button style={styles.input} variant="contained" onClick={submit}>
        Готово
      </Button>
    </div>
  );
};

export default TransportForm;
