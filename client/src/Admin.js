import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUserRole } from "./redux/actions/adminAction";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import ProfileForm from "./ProfileForm";
import TransportForm from "./TransportForm";
import { deleteTransport } from "./redux/actions/authAction";
import UserService from "./services/UserServices";
import {
  getCompanyOrgs,
  getOrgInfo,
  getPriceList,
} from "./redux/actions/organizationAction";
import {
  addReservation,
  deleteReservation,
  getDayReservations,
  getUserReservations,
} from "./redux/actions/reservationAction";
import { setSelectedServices } from "./redux/actions/recordAction";
import OrgService from "./services/OrgService";

const styles = {
  priceItem: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
    cursor: "pointer",
  },
  frame: {
    width: "60px",
    height: "85px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E3EAEE",
    borderRadius: "5px",
    boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.2)",
    marginTop: "5px",
    marginBottom: "5px",
  },
  days: {
    flexDirection: "row",
    maxHeight: "85px",
  },
  text1: {
    fontSize: "16px",
  },
  text2: {
    fontSize: "16px",
  },
  hourFrame: {
    borderColor: "#E3EAEE",
    borderWidth: 1,
    width: "81px",
    height: "61px",
    borderRadius: "5px",
    marginHorizontal: "6px",
    marginVertical: "10px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.2)",
    marginTop: "5px",
    marginBottom: "5px",
  },
  mv: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  pressable: {
    cursor: "pointer",
  },
  column: {
    maxWidth: "400px",
    minWidth: "300px",
    borderWidth: "1px",
    borderStyle: "solid",
    padding: "10px",
    borderColor: "rgba(25, 118, 210, 0.08)",
    marginRight: "10px",
    marginLeft: "10px",
    borderRadius: "10px",
  },
};
const getCarInfo = (item) => {
  return item.brand + " " + item.model + " " + item.regNumber;
};

const weekdays = ["????", "????", "????", "????", "????", "????", "????"];

const months = {
  1: "????????????",
  2: "??????????????",
  3: "????????",
  4: "????????????",
  5: "??????",
  6: "????????",
  7: "????????",
  8: "????????????",
  9: "????????????????",
  10: "??????????????",
  11: "????????????",
  12: "??????????????",
};

const getDate = (srcDate) => {
  let date = new Date(srcDate);
  let h = date.getHours();
  let m = date.getMinutes().toString();
  m = m === "0" ? "00" : m;
  return `${date.getDate()} ${
    months[date.getMonth() + 1]
  } ${date.getFullYear()} | ${h}:${m}`;
};

const getDayIndex = (reservations, editableReservationId) => {
  if (reservations[editableReservationId]) {
    const selectedDate = new Date(reservations[editableReservationId].date);
    const idx = selectedDate.getDate() - new Date().getDate() + 2;
    return idx;
  }
  return 2;
};

const getHourIndex = (reservations, editableReservationId) => {
  if (reservations[editableReservationId]) {
    const selectedDate = new Date(reservations[editableReservationId].date);
    const idx = selectedDate.getHours() - 8;
    return idx;
  }
  return -1;
};

const getCalendarray = () => {
  const today = Date.now();
  const array = [];
  for (let i = -2; i < 7; i++) {
    let currentDate = new Date(today + i * 1000 * 86400);
    let weekday = currentDate.getDay() - 1;
    weekday = weekday < 0 ? 6 : weekday;
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    array.push({ weekday, date, year, month });
  }
  return array;
};

const Admin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getCompanyOrgs(1));
  }, []);

  const [selectedOrgId, setSelectedOrgId] = useState(-1);

  const removeReservation = (reservId) => {
    dispatch(deleteReservation({ orgId: 1, reservId }));
  };

  useEffect(() => {
    dispatch(getOrgInfo(companyOrgs?.[selectedOrgId]?.id));
  }, [selectedOrgId]);

  const info = useSelector((state) => state.organization.info);
  const authLoading = useSelector((state) => state.auth.loading);
  const reservations = useSelector((state) => state.reservations.reservations);
  const [infoName, setInfoName] = useState("");
  const [infoDescription, setInfoDescription] = useState("");
  const [infoAddresses, setInfoAddresses] = useState([]);
  const [infoPhones, setInfoPhones] = useState([]);

  useEffect(() => {
    setInfoDescription(info.description);
    setInfoName(info.name);
    setInfoAddresses(info.addresses);
    setInfoPhones(info.phones);
  }, [info]);

  const users = useSelector((state) => state.admin.users);
  const companyOrgs = useSelector((state) => state.organization.companyOrgs);
  const onUpdateRoleClick = (id, role) => {
    const newRole = role === "ADMIN" ? "USER" : "ADMIN";
    dispatch(updateUserRole([id, newRole]));
  };
  const [currentUser, setCurrentUser] = useState(-1);
  const [editableUser, setEditableUser] = useState(-1);
  const onShowMoreClick = async (idx) => {
    setCurrentUser(idx);
    dispatch(getUserReservations(users?.[idx]?.id));
    const response = await UserService.getUserInfo(users?.[idx]?.id);
    setEditableUser(response.data.user);
  };

  const selectedCarId = useSelector((state) => state.record.selectedCarId);
  const priceList = useSelector((state) => state.organization.priceList);
  const editableReservationId = useSelector(
    (state) => state.reservations.editableReservationId
  );
  const selectedServices = useSelector(
    (state) => state.record.selectedServices
  );

  const [calendarray, setCalendarray] = useState(getCalendarray());
  const [selectedDay, setSelectedDay] = useState(
    getDayIndex(reservations, editableReservationId)
  );
  const loading = useSelector((state) => state.reservations.loading);

  const [selectedHour, setSelectedHour] = useState(
    getHourIndex(reservations, editableReservationId)
  );
  const dayReservations = useSelector(
    (state) => state.reservations.dayReservations
  );
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [selectedOrgIndex, setSelectedOrgIndex] = useState(0);

  useEffect(async () => {
    if (!authLoading) {
      dispatch(getUserReservations(users?.[currentUser]?.id));
      const response = await UserService.getUserInfo(users?.[currentUser]?.id);
      setEditableUser(response.data.user);
    }
  }, [authLoading]);

  const [addTransport, setAddTransport] = useState(false);
  const [editTransportId, setEditTransportId] = useState(-1);

  const [addPhone, setAddPhone] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const onAddPhoneClick = () => {
    setAddPhone((v) => !v);
    setNewPhone("");
  };

  const onAddAddressClick = () => {
    setAddAddress((v) => !v);
    setNewAddress("");
  };

  const submitAddress = () => {
    setInfoAddresses([...infoAddresses, { id: -1, address: newAddress }]);
  };
  const submitPhone = () => {
    setInfoPhones([...infoPhones, { id: -1, phone: newPhone }]);
  };

  const onInfoSubmit = async () => {
    await OrgService.updateOrgInfo(
      companyOrgs[selectedOrgId]?.id,
      infoName,
      infoDescription,
      infoPhones,
      infoAddresses
    );
    dispatch(getCompanyOrgs());
  };

  useEffect(() => {
    if (
      editableUser?.cars?.[selectedCarIndex]?.transportType &&
      companyOrgs[selectedOrgIndex]?.id
    )
      dispatch(
        getPriceList(
          companyOrgs[selectedOrgIndex]?.id,
          editableUser?.cars?.[selectedCarIndex]?.transportType
        )
      );
  }, [selectedCarIndex, companyOrgs, editableUser, selectedOrgIndex]);

  const onDayPress = (date, idx) => {
    if (idx >= 2) setSelectedDay(idx);
  };

  const onHourPress = (idx) => {
    if (
      (!dayReservations.filter((item) => item.hour == 8 + idx).length &&
        !loading &&
        !(8 + idx <= new Date().getHours() && selectedDay === 2)) ||
      getHourIndex(reservations, editableReservationId) == idx
    )
      setSelectedHour(idx);
  };

  const onAddRecordPress = () => {
    const carId = editableUser?.cars?.[selectedCarIndex].id;
    const { year, month, date, hour } = {
      ...calendarray[selectedDay],
      hour: 8 + selectedHour,
    };
    const dt = new Date(year, month - 1, date, hour);
    dispatch(
      addReservation({
        orgId: 1,
        date: dt,
        services: selectedServices,
        carId,
        userId: editableUser?.id,
      })
    );
  };

  useEffect(() => {
    if (
      !calendarray ||
      !calendarray[selectedDay] ||
      !calendarray[selectedDay]?.year ||
      !companyOrgs?.[selectedOrgIndex]
    )
      return;
    dispatch(
      getDayReservations({
        orgId: companyOrgs[selectedOrgIndex]?.id,
        year: calendarray[selectedDay]?.year,
        month: calendarray[selectedDay]?.month,
        day: calendarray[selectedDay]?.date,
      })
    );
  }, [selectedDay, calendarray, selectedOrgIndex, companyOrgs]);

  const deleteAddress = (id) => {
    setInfoAddresses([
      ...infoAddresses.map((el, i) =>
        el.id !== id ? el : { id, address: newAddress, deleted: true }
      ),
    ]);
  };
  const deletePhone = (id) => {
    setInfoPhones([
      ...infoPhones.map((el, i) =>
        el.id !== id ? el : { id, phone: newPhone, deleted: true }
      ),
    ]);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div style={styles.column}>
        <div style={{ width: "100%" }}>
          <Typography style={styles.mv} color="secondary" variant="h5">
            {"????????????????????"}
          </Typography>
          {companyOrgs.map((item, idx) => (
            <div
              style={{
                ...styles.mv,
                ...styles.pressable,
                backgroundColor:
                  selectedOrgId === idx ? "rgba(25, 118, 210, 0.08)" : "#fff",
                borderStyle: "solid",
                borderColor: "#efefef",
                borderWidth: "1px",
                padding: "20px",
              }}
              onClick={() => setSelectedOrgId(idx)}
            >
              <Typography>{item.name}</Typography>
            </div>
          ))}
          {selectedOrgId !== -1 ? (
            <>
              <img
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
                src={info.imageUrl}
              />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginTop: "10px",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  style={{ width: "100%" }}
                  inputProps={{
                    style: {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                  }}
                  multiline
                  value={infoName}
                  onChange={(e) => setInfoName(e.target.value)}
                ></TextField>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginTop: "10px",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  style={{ width: "100%" }}
                  multiline
                  inputProps={{
                    style: {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                  }}
                  onChange={(e) => setInfoDescription(e.target.value)}
                  value={infoDescription}
                ></TextField>
              </div>
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                {infoAddresses?.map((item, idx) =>
                  item.deleted ? null : (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        width: "100%",
                        marginTop: "10px",
                        marginBottom: "10px",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        inputProps={{
                          style: {
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                          },
                        }}
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          setInfoAddresses([
                            ...infoAddresses.map((el, i) =>
                              i !== idx
                                ? el
                                : { id: el.id, address: e.target.value }
                            ),
                          ]);
                        }}
                        value={item.address}
                      ></TextField>

                      <Button
                        style={{
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                        }}
                        variant="contained"
                        color="warning"
                        onClick={() => deleteAddress(item.id)}
                      >
                        ??????????????
                      </Button>
                    </div>
                  )
                )}
                <Button
                  style={{ ...styles.mv, width: "100%" }}
                  variant="contained"
                  onClick={onAddAddressClick}
                >
                  ???????????????? ??????????
                </Button>
                {addAddress ? (
                  <>
                    <TextField
                      inputProps={{
                        style: {
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                        },
                      }}
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setNewAddress(e.target.value);
                      }}
                      value={newAddress}
                    ></TextField>

                    <Button
                      style={{ ...styles.mv, width: "100%" }}
                      variant="contained"
                      onClick={submitAddress}
                    >
                      ????????????
                    </Button>
                  </>
                ) : null}
              </div>
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                {infoPhones?.map((item, idx) =>
                  item.deleted ? null : (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        width: "100%",
                        marginTop: "10px",
                        marginBottom: "10px",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        inputProps={{
                          style: {
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                          },
                        }}
                        onChange={(e) => {
                          setInfoPhones([
                            ...infoPhones.map((el, i) =>
                              i !== idx
                                ? el
                                : { id: el.id, phone: e.target.value }
                            ),
                          ]);
                        }}
                        style={{ width: "100%" }}
                        value={item.phone}
                      ></TextField>

                      <Button
                        style={{
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                        }}
                        variant="contained"
                        color="warning"
                        onClick={() => deletePhone(item.id)}
                      >
                        ??????????????
                      </Button>
                    </div>
                  )
                )}
                <Button
                  style={{ ...styles.mv, width: "100%" }}
                  variant="contained"
                  onClick={onAddPhoneClick}
                >
                  ???????????????? ??????????????
                </Button>

                {addPhone ? (
                  <>
                    <TextField
                      inputProps={{
                        style: {
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                        },
                      }}
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setNewPhone(e.target.value);
                      }}
                      value={newPhone}
                    ></TextField>
                    <Button
                      style={{ ...styles.mv, width: "100%" }}
                      variant="contained"
                      onClick={submitPhone}
                    >
                      ????????????
                    </Button>
                  </>
                ) : null}
              </div>{" "}
              <Button
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                variant="contained"
                color="secondary"
                onClick={onInfoSubmit}
                style={{ width: "100%" }}
              >
                ???????????????? ????????????????????
              </Button>
            </>
          ) : null}
        </div>
      </div>
      <div style={styles.column}>
        <div>
          <Typography style={styles.mv} variant="h5" color="secondary">
            ????????????????????????
          </Typography>
          {users.map((item, idx) => (
            <div style={{ marginTop: "10px", display: "flex" }}>
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  marginRight: "20px",
                }}
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              />
              <div>
                <Typography>
                  {(item.lastName || "?????? ??????????????,") +
                    " " +
                    (item.firstName || "?????? ??????????,") +
                    " " +
                    (item.middleName || "?????? ????????????????")}
                </Typography>
                <Typography>{item.email}</Typography>
                <Typography>{item.role}</Typography>
                <Button
                  style={{ padding: 0, marginRight: "10px" }}
                  onClick={() => onShowMoreClick(idx)}
                >
                  {"??????????????????"}
                </Button>
                {item.role === "USER" ? (
                  <Button
                    style={{ padding: 0 }}
                    onClick={() => onUpdateRoleClick(item.id, item.role)}
                  >
                    {"?????????????? ??????????????"}
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.column}>
        <Typography style={styles.mv} color="secondary" variant="h5">
          {"??????????????"}
        </Typography>
        {currentUser !== -1 ? (
          <>
            <ProfileForm
              setEditProfile={() => {}}
              initFirstName={users[currentUser]?.firstName}
              initLastName={users[currentUser]?.lastName}
              initMiddleName={users[currentUser]?.middleName}
              initGender={users[currentUser]?.gender}
              userId={users[currentUser]?.id}
              users={users}
            />

            <Typography style={styles.mv} color="secondary" variant="h5">
              {"??????????????????"}
            </Typography>
            <Button
              variant="contained"
              disabled={addTransport}
              onClick={() => setAddTransport(true)}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              ???????????????? ??????????????????
            </Button>
            {addTransport ? (
              <TransportForm
                setAddTransport={setAddTransport}
                setEditTransportId={setEditTransportId}
                userId={editableUser?.id || -1}
              />
            ) : null}
            {!editableUser?.cars?.length ? (
              <Typography>{"???????? ?????? ????????????????????"}</Typography>
            ) : null}
            {editableUser?.cars?.map((item, idx) => (
              <>
                <div
                  key={item.id}
                  style={{
                    ...styles.mv,
                    width: "100%",
                    borderStyle: "solid",
                    borderColor: "#efefef",
                    borderWidth: "1px",
                    padding: "20px",
                  }}
                >
                  <Typography>{getCarInfo(item)}</Typography>
                  <Button
                    onClick={() => {
                      if (editTransportId !== idx) {
                        setEditTransportId(idx);
                      } else setEditTransportId(-1);
                    }}
                    color="info"
                    style={{ padding: 0 }}
                  >
                    ??????????????????????????
                  </Button>
                  <Button
                    color="warning"
                    onClick={() => {
                      dispatch(
                        deleteTransport({
                          carId: item.id,
                          userId: editableUser?.id,
                        })
                      );
                    }}
                  >
                    ??????????????
                  </Button>
                </div>
                {editTransportId === idx ? (
                  <TransportForm
                    initBrand={item.brand}
                    initModel={item.model}
                    initRegNumber={item.regNumber}
                    initType={item.transportType}
                    setAddTransport={setAddTransport}
                    id={item.id}
                    setEditTransportId={setEditTransportId}
                    userId={editableUser?.id || -1}
                  />
                ) : null}
              </>
            ))}

            <Typography style={styles.mv} color="secondary" variant="h5">
              {"???????????????? ????????????"}
            </Typography>
            {!reservations?.length ? (
              <Typography>{"???????? ?????? ???????????????? ??????????????"}</Typography>
            ) : null}
            <div style={{ width: "100%" }}>
              {reservations?.map((item, idx) => (
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <div
                    style={{
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "#efefef",
                      padding: "20px",
                    }}
                    key={item.id}
                  >
                    <Typography>{item.sname}</Typography>
                    <Typography>{item.price + " ????????????"}</Typography>
                    <Typography>{item.name}</Typography>
                    <Typography>{getDate(item.date)}</Typography>
                    <Typography>{getCarInfo(item)}</Typography>
                    <Button
                      color="warning"
                      style={{ padding: 0, marginTop: "10px" }}
                      onClick={() => removeReservation(item.id)}
                    >
                      ??????????????
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Typography style={styles.mv} color="secondary" variant="h5">
              ???????????????????? ???? ????????????
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography style={styles.mv}>
                ???????????????? ?????????????????????? ????????????????
              </Typography>
              <Select
                value={selectedOrgIndex}
                onChange={(e) => setSelectedOrgIndex(e.target.value)}
                style={{ ...styles.mv, width: "100%" }}
              >
                {companyOrgs?.map((item, idx) => (
                  <MenuItem value={idx}>{item.name}</MenuItem>
                ))}
              </Select>
              <Typography style={styles.mv}>???????????????? ??????????????????</Typography>
              <Select
                value={selectedCarIndex}
                onChange={(e) => setSelectedCarIndex(e.target.value)}
                style={{ ...styles.mv, width: "100%" }}
              >
                {editableUser?.cars?.map((item, idx) => (
                  <MenuItem value={idx}>{getCarInfo(item)}</MenuItem>
                ))}
              </Select>
              <Typography style={styles.mv}>
                ???????????????? ???????????? ???? ????????????
              </Typography>
              {priceList.map((item, idx) => (
                <div
                  style={{
                    ...styles.priceItem,
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "#efefef",
                    padding: "20px",
                    width: "calc(100% - 40px)",
                  }}
                  onClick={() => {
                    dispatch(
                      setSelectedServices(
                        selectedServices.includes(item.id)
                          ? selectedServices.filter((el) => el !== item.id)
                          : [...selectedServices, item.id]
                      )
                    );
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "20px",
                        opacity: selectedServices.includes(item.id) ? 1 : 0.1,
                      }}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Check_green_icon.svg/1200px-Check_green_icon.svg.png"
                    ></img>

                    <div>
                      <Typography>{item.name}</Typography>
                      <Typography>{item.price + " ????????????"}</Typography>
                    </div>
                  </div>
                </div>
              ))}

              <Typography style={styles.mv}>???????????????? ????????</Typography>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  ...styles.mv,
                }}
              >
                {calendarray.map((item, idx) => (
                  <div
                    key={item.date + item.weekday}
                    onClick={() => onDayPress(item.date, idx)}
                    style={{}}
                  >
                    <div
                      style={{
                        ...styles.frame,
                        backgroundColor: idx === selectedDay ? "#000" : "#fff",
                        marginLeft: "8px",
                        marginRight: "8px",
                      }}
                    >
                      <Typography
                        style={{
                          ...styles.text1,
                          textDecorationLine: idx < 2 ? "line-through" : "none",
                          color:
                            idx < 2
                              ? "#C4C4C4"
                              : idx === selectedDay
                              ? "#fff"
                              : "#747474",
                        }}
                      >
                        {weekdays[item.weekday]}
                      </Typography>
                      <Typography
                        style={{
                          ...styles.text2,
                          textDecorationLine: idx < 2 ? "line-through" : "none",
                          color:
                            idx < 2
                              ? "#C4C4C4"
                              : idx === selectedDay
                              ? "#fff"
                              : "#000",
                        }}
                      >
                        {item.date}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
              <Typography style={styles.mv}>???????????????? ??????????</Typography>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  width: "100%",
                  ...styles.mv,
                }}
              >
                {[...Array(16)].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => onHourPress(idx)}
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  >
                    <div
                      style={{
                        ...styles.hourFrame,
                        backgroundColor: idx === selectedHour ? "#000" : "#fff",
                      }}
                    >
                      <Typography
                        style={{
                          ...styles.text1,
                          textDecorationLine:
                            (dayReservations.filter((item) => item.hour == idx)
                              .length ||
                              (idx + 8 <= new Date().getHours() &&
                                selectedDay === 2)) &&
                            getHourIndex(
                              reservations,
                              editableReservationId
                            ) !== idx
                              ? "line-through"
                              : "none",
                          color:
                            (dayReservations.filter((item) => item.hour == idx)
                              .length ||
                              (idx + 8 <= new Date().getHours() &&
                                selectedDay === 2)) &&
                            getHourIndex(
                              reservations,
                              editableReservationId
                            ) !== idx
                              ? "#C4C4C4"
                              : idx === selectedHour
                              ? "#fff"
                              : "#747474",
                        }}
                      >
                        {8 + idx}:00
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="contained"
                style={{ width: "100%", marginBottom: "10px" }}
                onClick={onAddRecordPress}
              >
                ???????????????????? ???? ????????????
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Admin;
