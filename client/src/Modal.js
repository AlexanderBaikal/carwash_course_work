import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Slide, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { hideModal, TYPE_ERROR } from "./redux/actions/modalAction";

const Modal = () => {
  const message = useSelector((state) => state.modal.message);
  const type = useSelector((state) => state.modal.type);
  const source = useSelector((state) => state.modal.source);

  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const duration = 2000;

  useEffect(() => {
    if (message) {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        dispatch(hideModal());
      }, duration);
    } else {
      setModalVisible(false);
    }
  }, [message]);

  return (
    <Slide direction="down" in={modalVisible} mountOnEnter unmountOnExit>
      <Card
        sx={{ minWidth: 275 }}
        style={{ position: "absolute", marginTop: "30px", zIndex: 10 }}
      >
        <CardContent>
          <div
            style={{
              width: "300px",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color={type === TYPE_ERROR ? "red" : "blue"}>
              {message}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default Modal;
