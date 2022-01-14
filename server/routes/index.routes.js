const { Router } = require("express");
const { body, param } = require("express-validator");
const organizationController = require("../controllers/organization-controller");
const reservationController = require("../controllers/reservation-controller");
const transportController = require("../controllers/transport-controller");
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const checkIdMiddleware = require("../middlewares/check-id-middleware");

const router = new Router();
router.post(
  "/registration",
  body("email").notEmpty(),
  body("password").notEmpty(),
  userController.registration
);
router.post("/login", userController.login);
router.get("/activate/:link", userController.activate);

router.post("/logout", userController.logout);
router.post("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.patch(
  "/user/:id",
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("middleName").notEmpty(),
  body("gender").isIn(["MALE", "FEMALE"]),
  authMiddleware,
  checkIdMiddleware(),
  userController.updateUserInfo
);
router.post(
  "/user/:id/transport",
  body("brand").notEmpty(),
  body("model").notEmpty(),
  body("regNumber").notEmpty(),
  body("transportType").isIn(["CAR", "TRUCK", "BUS", "MOTO"]),
  authMiddleware,
  checkIdMiddleware(),
  transportController.addTransport
);

router.patch(
  "/user/:id/transport/:carId",
  body("brand").notEmpty(),
  body("model").notEmpty(),
  body("regNumber").notEmpty(),
  body("transportType").isIn(["CAR", "TRUCK", "BUS", "MOTO"]),
  authMiddleware,
  checkIdMiddleware(),
  transportController.updateTransport
);

router.delete(
  "/user/:id/transport/:carId",
  authMiddleware,
  checkIdMiddleware(),
  transportController.deleteTransport
);

router.get(
  "/user/:userId/organization/:orgId/reservations",
  authMiddleware,
  checkIdMiddleware((req) => req.params.userId),
  reservationController.getUserReservations
);

// todo
router.get(
  "/organization/:orgId/pricelist/:transportTypeName",
  param("transportTypeName").isIn(["CAR", "TRUCK", "BUS", "MOTO"]),
  organizationController.getPriceList
);

router.get("/organization/:orgId/info", organizationController.getOrgInfo);

router.get(
  "/organization/:orgId/reservations/:year/:month/:day",
  param("year").isInt(),
  param("month").isInt(),
  param("day").isInt(),
  organizationController.getDayReservations
);

router.post(
  "/organization/:orgId/reservations",
  body("userId").notEmpty(),
  body("carId").notEmpty(),
  body("date").notEmpty(),
  body("services").isArray(),
  authMiddleware,
  checkIdMiddleware((req) => req.body.userId),
  reservationController.addReservation
);

router.patch(
  "/organization/:orgId/reservations/:reservId",
  body("userId").notEmpty(),
  body("carId").notEmpty(),
  body("date").notEmpty(),
  body("services").isArray(),
  authMiddleware,
  checkIdMiddleware((req) => req.body.userId),
  reservationController.updateReservation
);

router.delete(
  "/user/:userId/organization/:orgId/reservations/:reservId",
  param("userId").isInt(),
  param("reservId").isInt(),
  param("orgId").isInt(),
  authMiddleware,
  checkIdMiddleware((req) => req.params.userId),
  reservationController.deleteReservation
);

module.exports = router;
