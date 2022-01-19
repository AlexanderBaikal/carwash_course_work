import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  Input,
  Typography,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
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
import TransportForm from "./TransportForm";
import { deleteTransport } from "./redux/actions/authAction";
import {
  setSelectedCarId,
  setSelectedServices,
} from "./redux/actions/recordAction";
import ProfileForm from "./ProfileForm";

const styles = {
  mv: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  priceItem: {
    marginTop: "10px",
    marginBottom: "10px",
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
  column: {
    maxWidth: "300px",
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

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const months = {
  1: "Январь",
  2: "Февраль",
  3: "Март",
  4: "Апрель",
  5: "Май",
  6: "Июнь",
  7: "Июль",
  8: "Август",
  9: "Сентябрь",
  10: "Октябрь",
  11: "Ноябрь",
  12: "Декабрь",
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

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const selectedCarId = useSelector((state) => state.record.selectedCarId);
  const priceList = useSelector((state) => state.organization.priceList);
  const loading = useSelector((state) => state.reservations.loading);
  const reservations = useSelector((state) => state.reservations.reservations);
  const companyOrgs = useSelector((state) => state.organization.companyOrgs);
  const editableReservationId = useSelector(
    (state) => state.reservations.editableReservationId
  );
  const selectedServices = useSelector(
    (state) => state.record.selectedServices
  );

  const dayReservations = useSelector(
    (state) => state.reservations.dayReservations
  );

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrgInfo(1));
    dispatch(getUserReservations(userId));
    dispatch(getCompanyOrgs(1));
  }, []);

  const info = useSelector((state) => state.organization.info);
  const [addTransport, setAddTransport] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [editTransportId, setEditTransportId] = useState(-1);
  const [selectedCarIndex, setSelectedCarIndex] = useState(
    companyOrgs?.[0]?.id || 0
  );
  const [selectedOrgIndex, setSelectedOrgIndex] = useState(0);

  useEffect(() => {
    dispatch(
      getPriceList(
        companyOrgs[selectedOrgIndex]?.id,
        user?.cars?.[selectedCarIndex]?.transportType
      )
    );
  }, [selectedCarIndex, selectedOrgIndex, companyOrgs]);

  const [calendarray, setCalendarray] = useState(getCalendarray());
  const [selectedDay, setSelectedDay] = useState(
    getDayIndex(reservations, editableReservationId)
  );

  const [selectedHour, setSelectedHour] = useState(
    getHourIndex(reservations, editableReservationId)
  );

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
    const carId = user?.cars?.[selectedCarIndex].id;
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
        userId: JSON.parse(localStorage.getItem("user"))?.id,
      })
    );
  };

  const removeReservation = (reservId) => {
    dispatch(deleteReservation({ orgId: 1, reservId }));
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
        <img
          style={{
            width: "100%",
            borderRadius: "5px",
            maxHeight: "150px",
            objectFit: "cover",
          }}
          src={info.imageUrl}
        />
        <Typography
          style={{ marginTop: "10px", marginBottom: "10px" }}
          variant="h5"
          color="secondary"
        >
          {info.name}
        </Typography>
        <Typography style={{ marginTop: "10px", marginBottom: "10px" }}>
          {info.description}
        </Typography>
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          {info?.addresses?.map((item, idx) => (
            <Typography key={idx}>{item.address}</Typography>
          ))}
        </div>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "15px",
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: "1px",
            borderStyle: "dashed",
            borderColor: "#efefef",
            paddingBottom: "15px",
          }}
        >
          {info?.phones?.map((item, idx) => (
            <Typography key={idx}>{item.phone}</Typography>
          ))}
        </div>
        <Typography variant="h5" color="secondary">
          {"Активные заказы"}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {!reservations?.length ? (
            <Typography>{"У вас пока нет активных заказов"}</Typography>
          ) : null}
          <div style={{ width: "100%" }}>
            {reservations?.map((item, idx) => (
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#efefef",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                <Typography style={{ fontWeight: 600, marginBottom: "10px" }}>
                  {item.sname}
                </Typography>
                <Typography style={styles.mv}>
                  {item.price + " рублей"}
                </Typography>
                <Typography>{item.name}</Typography>
                <Typography>{getDate(item.date)}</Typography>
                <Typography>{getCarInfo(item)}</Typography>
                <Button
                  color="warning"
                  style={{ padding: 0, marginTop: "10px" }}
                  onClick={() => removeReservation(item.id)}
                >
                  Удалить
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={styles.column}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography style={styles.mv} variant="h5" color="secondary">
            Записаться на услуги
          </Typography>
          <Typography style={styles.mv}>
            Выберите автомоечный комплекс
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
          <Typography style={styles.mv}>Выберите транспорт</Typography>
          <Select
            value={selectedCarIndex}
            onChange={(e) => setSelectedCarIndex(e.target.value)}
            style={{ ...styles.mv, width: "100%" }}
          >
            {user?.cars?.map((item, idx) => (
              <MenuItem value={idx}>{getCarInfo(item)}</MenuItem>
            ))}
          </Select>
          <Typography style={styles.mv}>Выберите услуги из списка</Typography>
          {priceList.map((item, idx) => (
            <div
              style={{
                ...styles.priceItem,
                width: "100%",
                marginTop: "20px",
                marginBottom: "20px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#efefef",
                paddingTop: "20px",
                paddingBottom: "20px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
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
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  marginRight: "20px",
                  marginLeft: "20px",
                  opacity: selectedServices.includes(item.id) ? 1 : 0.1,
                }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Check_green_icon.svg/1200px-Check_green_icon.svg.png"
              ></img>
              <div>
                <Typography>{item.name}</Typography>
                <Typography>{item.price + " рублей"}</Typography>
              </div>
            </div>
          ))}

          <Typography style={styles.mv}>Выберите Дату</Typography>
          <div
            style={{
              display: "flex",
              // overflowX: "scroll",
              flexWrap: "wrap",
              justifyContent: "center",
              width: "100%",
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
          <Typography style={styles.mv}>Выберите Время</Typography>

          <div
            style={{
              display: "flex",
              // overflowX: "scroll",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "center",
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
                        getHourIndex(reservations, editableReservationId) !==
                          idx
                          ? "line-through"
                          : "none",
                      color:
                        (dayReservations.filter((item) => item.hour == idx)
                          .length ||
                          (idx + 8 <= new Date().getHours() &&
                            selectedDay === 2)) &&
                        getHourIndex(reservations, editableReservationId) !==
                          idx
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
            Записаться на услугу
          </Button>
        </div>
      </div>
      <div style={styles.column}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography style={styles.mv} variant="h5" color="secondary">
            {"Мой профиль"}
          </Typography>
          <Typography style={styles.mv}>
            {user?.info?.lastName &&
            user?.info?.firstName &&
            user?.info?.middleName
              ? user?.info?.lastName +
                " " +
                user?.info?.firstName +
                " " +
                user?.info?.middleName
              : "Имя не указано"}
          </Typography>
          <Button
            style={styles.mv}
            onClick={() => setEditProfile((v) => !v)}
            variant="contained"
          >
            Редактировать
          </Button>
          {editProfile ? (
            <ProfileForm
              initFirstName={user?.info?.firstName}
              initLastName={user?.info?.lastName}
              initMiddleName={user?.info?.middleName}
              initGender={user?.info?.gender}
              setEditProfile={setEditProfile}
            />
          ) : null}
          <Typography style={styles.mv} variant="h5" color="secondary">
            {"Мой транспорт"}
          </Typography>
          {!user?.cars?.length ? (
            <Typography>{"У вас пока нет транспорта"}</Typography>
          ) : null}
          {user?.cars?.map((item, idx) => (
            <>
              <div
                key={item.id}
                style={{
                  ...styles.mv,
                  width: "calc(100% - 40px)",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#efefef",
                  padding: "20px",
                  paddingBottom: "10px",
                  borderRadius: "5px",
                }}
              >
                <Typography>{getCarInfo(item)}</Typography>
                <div style={{ marginTop: "10px" }}>
                  <Button
                    onClick={() => {
                      if (editTransportId !== idx) {
                        setEditTransportId(idx);
                      } else setEditTransportId(-1);
                    }}
                    color="info"
                    style={{ padding: 0 }}
                  >
                    Редактировать
                  </Button>
                  <Button
                    color="warning"
                    onClick={() => {
                      dispatch(
                        deleteTransport({
                          carId: item.id,
                          userId: user?.id,
                        })
                      );
                    }}
                  >
                    Удалить
                  </Button>
                </div>
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
                />
              ) : null}
            </>
          ))}

          <Button
            variant="contained"
            disabled={addTransport}
            onClick={() => setAddTransport(true)}
            style={{ width: "100%", marginBottom: "10px" }}
          >
            Добавить транспорт
          </Button>
          {addTransport ? (
            <TransportForm
              setAddTransport={setAddTransport}
              setEditTransportId={setEditTransportId}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
