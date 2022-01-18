import axios from "axios";
import { takeEvery, put, call, fork, all } from "redux-saga/effects";

import {
  checkAuthFail,
  checkAuthRequest,
  checkAuthSuccess,
  CHECK_AUTH,
  logOut,
  LOG_OUT,
  registerFail,
  registerRequest,
  registerSuccess,
  REGISTER,
  addTransportFail,
  addTransportRequest,
  addTransportSuccess,
  ADD_TRANSPORT,
  loginFail,
  loginRequest,
  loginSuccess,
  LOGIN,
  updateTransportRequest,
  updateTransportSuccess,
  updateTransportFail,
  UPDATE_TRANSPORT,
  DELETE_TRANSPORT,
  deleteTransportFail,
  deleteTransportSuccess,
  deleteTransportRequest,
} from "./actions/authAction";
import TransportService from "../services/TransportService";

import OrgService from "../services/OrgService";
import {
  addReservationFail,
  addReservationRequest,
  addReservationSuccess,
  ADD_RESERVATION,
  deleteReservationFail,
  deleteReservationRequest,
  deleteReservationSuccess,
  DELETE_RESERVATION,
  getDayReservationsFail,
  getDayReservationsRequest,
  getDayReservationsSuccess,
  getUserReservationsFail,
  getUserReservationsRequest,
  getUserReservationsSuccess,
  GET_DAY_RESERVATIONS,
  GET_USER_RESERVATIONS,
  updateReservationFail,
  updateReservationRequest,
  updateReservationSuccess,
  UPDATE_RESERVATION,
} from "./actions/reservationAction";
import ReservationService from "../services/ReservationService";
import {
  getOrgInfoRequest,
  getOrgInfoSuccess,
  getOrgInfoFail,
  GET_PRICE_LIST,
  getPriceListRequest,
  getPriceListSuccess,
  getPriceListFail,
  getCompanyOrgsRequest,
  getCompanyOrgsFail,
  getCompanyOrgsSuccess,
  GET_COMPANY_ORGS,
  GET_ORG_INFO,
} from "./actions/organizationAction";
import { setActiveCarId } from "./actions/transportAction";
import AuthService from "../services/AuthService";
import { API_URL } from "./../http/index";
import {
  getAllUsersFail,
  getAllUsersRequest,
  getAllUsersSuccess,
  GET_ALL_USERS,
  updateUserRoleFail,
  updateUserRoleRequest,
  updateUserRoleSuccess,
  UPDATE_USER_ROLE,
} from "./actions/adminAction";
import AdminService from "../services/AdminService";

// ----------------------

async function updateUserRole(payload) {
  const [userId, role] = payload;
  const response = await AdminService.updateUserRole(userId, role);
  return response.data;
}

function* workerUpdateUserRole(action) {
  try {
    yield put(updateUserRoleRequest());
    const data = yield call(updateUserRole, action.payload);
    yield put(updateUserRoleSuccess(data));
  } catch (error) {
    console.log(error.response?.data?.message || error);
    yield put(updateUserRoleFail(error.response?.data?.message || error));
  }
}

export function* watchUpdateUserRole() {
  yield takeEvery(UPDATE_USER_ROLE, workerUpdateUserRole);
}

// ----------------------------

async function deleteReservation(data) {
  const { orgId, reservId } = data;

  const user = JSON.parse(localStorage.getItem("user"));

  const response = await ReservationService.deleteReservation({
    reservId,
    orgId,
    userId: user.id,
  });

  return response.data;
}

function* workerDeleteReservation(action) {
  try {
    yield put(deleteReservationRequest());
    const data = yield call(deleteReservation, action.payload);
    yield put(deleteReservationSuccess(data));
  } catch (error) {
    console.log(error.response?.data?.message || error);
    yield put(deleteReservationFail(error.response?.data?.message || error));
  }
}

export function* watchDeleteReservation() {
  yield takeEvery(DELETE_RESERVATION, workerDeleteReservation);
}

// ----------------------

async function getAllUsers() {
  const response = await AdminService.getAllUsers();
  return response.data;
}

function* workerGetAllUsers(action) {
  try {
    yield put(getAllUsersRequest());
    const data = yield call(getAllUsers);
    yield put(getAllUsersSuccess(data));
  } catch (error) {
    console.log(error.response?.data?.message || error);
    yield put(getAllUsersFail(error.response?.data?.message || error));
  }
}

export function* watchGetAllUsers() {
  yield takeEvery(GET_ALL_USERS, workerGetAllUsers);
}

// ----------------------------

async function addReservation(data) {
  const { orgId, date, services, carId, userId } = data;

  const response = await ReservationService.addReservation({
    orgId,
    userId,
    date,
    services,
    carId,
  });

  return response.data;
}

function* workerAddReservation(action) {
  try {
    yield put(addReservationRequest());
    const data = yield call(addReservation, action.payload);
    yield put(addReservationSuccess(data));
  } catch (error) {
    console.log(error.response?.data?.message || error);
    yield put(addReservationFail(error.response?.data?.message || error));
  }
}

export function* watchAddReservation() {
  yield takeEvery(ADD_RESERVATION, workerAddReservation);
}

// ----------------------------

async function getDayReservations(data) {
  const { orgId, year, month, day } = data;
  console.log(data);

  const response = await ReservationService.getDayReservations(
    orgId,
    year,
    month,
    day
  );
  return response.data;
}

function* workerGetDayReservations(action) {
  try {
    yield put(getDayReservationsRequest());
    const reservations = yield call(getDayReservations, action.payload);
    yield put(getDayReservationsSuccess(reservations));
  } catch (error) {
    console.log(error.response?.data?.message || error);
    yield put(getDayReservationsFail(error.response?.data?.message || error));
  }
}

export function* watchgetDayReservations() {
  yield takeEvery(GET_DAY_RESERVATIONS, workerGetDayReservations);
}

// ----------------------------

async function getCompanyOrgs() {
  const response = await OrgService.getCompanyOrgs();
  return response.data;
}

function* workerGetCompanyOrgs(action) {
  try {
    yield put(getCompanyOrgsRequest());
    const orgs = yield call(getCompanyOrgs, action.payload);
    yield put(getCompanyOrgsSuccess(orgs));
  } catch (error) {
    console.log(error.response?.data?.message || error);
    yield put(getCompanyOrgsFail(error.response?.data?.message || error));
  }
}

export function* watchGetCompanyOrgs() {
  yield takeEvery(GET_COMPANY_ORGS, workerGetCompanyOrgs);
}

// ----------------------------

async function getPriceList({ orgId, transportTypeName }) {
  const response = await OrgService.getPriceList(orgId, transportTypeName);
  return response.data;
}

function* workerGetPriceList(action) {
  try {
    yield put(getPriceListRequest());
    const info = yield call(getPriceList, action.payload);
    yield put(getPriceListSuccess(info));
  } catch (error) {
    console.log(error.response?.data?.message || error);
    yield put(getPriceListFail(error.response?.data?.message || error));
  }
}

export function* watchGetPriceList() {
  yield takeEvery(GET_PRICE_LIST, workerGetPriceList);
}

// ----------------------------

async function getOrgInfo(orgId) {
  const response = await OrgService.getOrgInfo(orgId);
  return response.data;
}

function* workerGetOrgInfo(action) {
  try {
    yield put(getOrgInfoRequest());
    const info = yield call(getOrgInfo, action.payload);
    yield put(getOrgInfoSuccess(info));
  } catch (error) {
    console.log(error.response?.data?.message || error);
    yield put(getOrgInfoFail(error.response?.data?.message || error));
  }
}

export function* watchGetOrgInfo() {
  yield takeEvery(GET_ORG_INFO, workerGetOrgInfo);
}

// // ----------------------------

async function getUserReservations(userId) {
  const response = await ReservationService.getUserReservations(userId);
  return response.data;
}

function* workergetUserReservations(action) {
  try {
    yield put(getUserReservationsRequest());
    const reservations = yield call(getUserReservations, action.payload);
    yield put(getUserReservationsSuccess(reservations));
  } catch (error) {
    console.log(error.response?.data?.message || error);
    yield put(getUserReservationsFail());
  }
}

export function* watchgetUserReservations() {
  yield takeEvery(GET_USER_RESERVATIONS, workergetUserReservations);
}

// -----------

async function deleteTransport({ carId, userId }) {
  // const user = JSON.parse(localStorage.getItem("user"));

  const response = await TransportService.deleteTransport({
    userId,
    carId,
  });

  return response.data;
}

function* workerDeleteTransport(action) {
  try {
    yield put(deleteTransportRequest());
    const data = yield call(deleteTransport, action.payload);
    yield put(setActiveCarId(null));
    yield put(deleteTransportSuccess(data.user));
  } catch (error) {
    console.log(error.response?.data?.message || error);
    yield put(deleteTransportFail(error.response?.data?.message || error));
  }
}

export function* watchDeleteTransport() {
  yield takeEvery(DELETE_TRANSPORT, workerDeleteTransport);
}

// ----------------------------

async function updateTransport(data) {
  const { brand, model, regNumber, transportType, carId, userId } = data;

  // const user = JSON.parse(localStorage.getItem("user"));

  const response = await TransportService.updateTransport({
    userId,
    brand,
    model,
    regNumber,
    transportType,
    carId,
  });

  return response.data;
}

function* workerUpdateTransport(action) {
  try {
    yield put(updateTransportRequest());
    const data = yield call(updateTransport, action.payload);
    yield put(setActiveCarId(null));
    yield put(updateTransportSuccess(data.user));
  } catch (error) {
    console.log(error.response?.data?.message || error);
    yield put(updateTransportFail(error.response?.data?.message || error));
  }
}

export function* watchUpdateTransport() {
  yield takeEvery(UPDATE_TRANSPORT, workerUpdateTransport);
}

// ----------------------------

async function addTransport(data) {
  const { brand, model, regNumber, transportType, userId } = data;

  // const user = JSON.parse(localStorage.getItem("user"));

  const response = await TransportService.addTransport({
    userId,
    brand,
    model,
    regNumber,
    transportType,
  });

  return response.data;
}

function* workerAddTransport(action) {
  try {
    yield put(addTransportRequest());
    const data = yield call(addTransport, action.payload);
    yield put(setActiveCarId(null));
    yield put(addTransportSuccess(data.user));
  } catch (error) {
    console.log(error.response?.data?.message || error);
    yield put(addTransportFail(error.response?.data?.message || error));
  }
}

export function* watchAddTransport() {
  yield takeEvery(ADD_TRANSPORT, workerAddTransport);
}

// ----------------------------

async function logOutFn() {
  const userData = localStorage.getItem("token");
  if (!userData) {
    throw Error("Вы итак не авторизованы");
  }
  const response = await AuthService.logout();
  console.log("logout", response.data);
  await localStorage.removeItem("token");
}

function* workerLogOut() {
  try {
    yield call(logOutFn);
  } catch (error) {
    console.log(error.response?.data?.message || error);
  }
}

export function* watchLogOut() {
  yield takeEvery(LOG_OUT, workerLogOut);
}

// ----------------------------

async function login(data) {
  const { email, password } = data;
  const response = await AuthService.login(email, password);
  localStorage.setItem("token", response.data.accessToken);
  localStorage.setItem("user", JSON.stringify(response.data.user));

  return response.data.user;
}

function* workerLogin(action) {
  console.log(action);

  try {
    yield put(loginRequest());
    const data = yield call(login, action.payload);
    yield put(loginSuccess(data));
  } catch (error) {
    console.log(error.response?.data?.message || error);
    yield put(loginFail(error.response?.data?.message || error));
  }
}

export function* watchLogin() {
  yield takeEvery(LOGIN, workerLogin);
}

// ----------------------------

async function registration(data) {
  const { email, password } = data;
  const response = await AuthService.registration(email, password);
  localStorage.setItem("token", response.data.accessToken);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return response.data.user;
}

function* workerRegister(action) {
  try {
    yield put(registerRequest());
    const data = yield call(registration, action.payload);
    yield put(registerSuccess(data));
  } catch (error) {
    console.log(error.response?.data?.message || error);
    yield put(registerFail(error.response?.data?.message || error));
  }
}

export function* watchRegister() {
  yield takeEvery(REGISTER, workerRegister);
}

// ----------------------------

async function checkAuth() {
  const response = await axios.get(`${API_URL}/refresh`);
  localStorage.setItem("token", response.data.accessToken);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return response.data.user;
}

function* workerCheckAuth() {
  try {
    yield put(checkAuthRequest());
    const user = yield call(checkAuth);
    yield put(checkAuthSuccess(user));
  } catch (error) {
    console.log(error.response?.data || error);
    yield put(checkAuthFail(error.response?.data?.message || error));
    // yield put(push('/'))
  }
}

export function* watchCheckAuth() {
  yield takeEvery(CHECK_AUTH, workerCheckAuth);
}

// ----------------------------

export function* rootSaga() {
  yield all([
    fork(watchCheckAuth),
    fork(watchRegister),
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchAddTransport),
    fork(watchUpdateTransport),
    fork(watchDeleteTransport),
    fork(watchgetUserReservations),
    fork(watchGetOrgInfo),
    fork(watchGetPriceList),
    fork(watchGetCompanyOrgs),
    fork(watchgetDayReservations),
    fork(watchAddReservation),
    fork(watchDeleteReservation),
    fork(watchGetAllUsers),
    fork(watchUpdateUserRole),
  ]);
}
