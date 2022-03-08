const User = require("../models/user.models");
const Notification = require("../models/notification.models");

const setNotificationsToUnread = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user.unreadNotification) {
      user.unreadNotification = true;
      await user.save();
    }
  } catch (error) {
    console.error(error);
  }
};

const bookingNotification = async (doctorToNotify, patient, appointmentId) => {
  try {
    const doctor = await Notification.findOne({ user: doctorToNotify });

    const notification = {
      type: "booked",
      user: patient,
      appointment: appointmentId,
      role: "patient",
      date: Date.now(),
    };

    doctor.notications.unshift(notification);
    await notification.save();

    await setNotificationsToUnread(doctor._id);
  } catch (error) {
    console.error(error);
  }
};

const acceptedAppointmentNotification = async (
  patientToNotify,
  doctor,
  appointmentId,
  type
) => {
  try {
    const patient = await Notification.findOne({ user: patientToNotify });
    const notification = {
      type: type,
      user: doctor,
      appointment: appointmentId,
      role: "doctor",
      date: Date.now(),
    };
    doctor.notications.unshift(notification);

    await notification.save();
    await setNotificationsToUnread(doctor._id);
  } catch (error) {
    console.error(error);
  }
};

const cancelledAppointmentByPatient = async (
  patient,
  doctorToNotify,
  appointmentId
) => {
  try {
    const doctor = await Notification.findOne({ user: doctorToNotify });
    const notification = {
      type: "cancelledByPatient",
      user: patient,
      appointment: appointmentId,
      role: "patient",
      date: Date.now(),
    };

    doctor.notications.unshift(notification);

    await notification.save();
    await setNotificationsToUnread(doctor._id);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  bookingNotification,
  acceptedAppointmentNotification,
  cancelledAppointmentByPatient,
};
