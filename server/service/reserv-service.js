const { QueryTypes } = require("sequelize/dist");
const sequelize = require("../db");
const ApiError = require("../exceptions/api-error");
const Reservation = require("../models/reservation");
const ServiceReservation = require("../models/service-reservation");

class ReservService {
  async getUserReservations(userId) {
    const reservations = await sequelize.query(
      'SELECT reservations.id, reservations.date, service_prices.price, services.name as sname, services.id as sid, organizations.name, cars.model, cars.brand, cars."regNumber"\
        FROM reservations\
        JOIN organizations ON reservations."organizationId" = organizations.id \
        JOIN cars ON reservations."carId" = cars.id\
        LEFT OUTER JOIN service_reservations ON service_reservations."reservationId" = reservations.id\
        LEFT OUTER JOIN services ON service_reservations."serviceId" = services.id\
        JOIN service_prices ON service_prices."organizationId" = organizations.id\
        AND service_prices."transportTypeId" = cars."transportTypeId"\
        AND service_prices."serviceId" = services.id\
        WHERE reservations."userId" = ?\
        ORDER BY reservations.date',
      {
        replacements: [userId],
        type: QueryTypes.SELECT,
      }
    );
    return reservations;
    // todo change db stricture. Нужно, чтобы к одной резервации относились несколько выбранных услуг
  }
  async getDayReservations(orgId, year, month, day) {
    // todo
    const reservations = await sequelize.query(
      'SELECT EXTRACT(HOUR from date) as hour, EXTRACT(MINUTE from date) as minute\
          FROM reservations \
          WHERE EXTRACT(DAY from date) = ? AND \
          EXTRACT(MONTH from date) = ? AND \
          EXTRACT(YEAR from date) = ? AND\
          "organizationId" = ?',
      {
        replacements: [day, month, year, orgId],
        type: QueryTypes.SELECT,
      }
    );

    return reservations;
  }

  async addReservation(userId, orgId, services, date, carId) {
    // todo
    let reservation;
    let promises = [];

    let found = await Reservation.findOne({
      where: { date, organizationId: orgId },
    });
    if (found) {
      throw Error("На эту дату уже есть запись");
    }
    for (let service of services) {
      reservation = Reservation.create({
        userId,
        organizationId: orgId,
        carId,
        date,
      }).then((data) =>
        ServiceReservation.create({
          reservationId: data.dataValues.id,
          serviceId: service,
        })
      );
      promises.push(reservation);
    }
    await Promise.all(promises);
    return await this.getUserReservations(userId, orgId);
  }
  async updateReservation(reservId, userId, orgId, services, date, carId) {
    let reservation;
    let promises = [];
    for (let service of services) {
      reservation = Reservation.update(
        {
          organizationId: orgId,
          carId,
          date,
        },
        { where: { id: reservId } }
      ).then((data) =>
        ServiceReservation.update(
          {
            serviceId: service,
          },
          { where: { reservationId: reservId } }
        )
      );
      promises.push(reservation);
    }
    await Promise.all(promises);
    return await this.getUserReservations(userId, orgId);
  }
  async deleteReservation(reservId, userId, orgId) {
    await ServiceReservation.destroy({ where: { reservationId: reservId } });
    await Reservation.destroy({ where: { id: reservId, userId } });
    return await this.getUserReservations(userId, orgId);
  }
  async getUserHistory(userId) {
    const reservations = await sequelize.query(
      'SELECT reservations.id, reservations.date, service_prices.price, services.name as sname, services.id as sid, organizations.name, cars.model, cars.brand, cars."regNumber"\
        FROM reservations\
        JOIN organizations ON reservations."organizationId" = organizations.id \
        JOIN cars ON reservations."carId" = cars.id\
        LEFT OUTER JOIN service_reservations ON service_reservations."reservationId" = reservations.id\
        LEFT OUTER JOIN services ON service_reservations."serviceId" = services.id\
        JOIN service_prices ON service_prices."organizationId" = organizations.id\
        AND service_prices."transportTypeId" = cars."transportTypeId"\
        AND service_prices."serviceId" = services.id\
        WHERE reservations."userId" = ?\
        ORDER BY reservations.date',
      {
        replacements: [userId],
        type: QueryTypes.SELECT,
      }
    );
    return reservations;
    // todo change db stricture. Нужно, чтобы к одной резервации относились несколько выбранных услуг
  }
}

module.exports = new ReservService();

// servicename, date, orgname, cardata,
