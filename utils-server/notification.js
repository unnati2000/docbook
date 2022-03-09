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

    doctor.notifications.unshift(notification);
    await doctor.save();

    await setNotificationsToUnread(doctorToNotify);
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
    patient.notifications.unshift(notification);

    await patient.save();
    await setNotificationsToUnread(patientToNotify);
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

    doctor.notifications.unshift(notification);

    await doctor.save();
    await setNotificationsToUnread(doctorToNotify);
  } catch (error) {
    console.error(error);
  }
};

const removeBookingNotification = async (
  patient,
  doctorToNotify,
  appointmentId
) => {
  try {
    const doctor = await Notification.findOneAndUpdate(
      { user: doctorToNotify },
      {
        $pull: {
          notications: {
            type: "booked",
            user: patient,
            appointment: appointmentId,
          },
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const removeAcceptedAppointmentNotification = async (
  patientToNotify,
  doctor,
  appointmentId,
  type
) => {
  try {
    await Notification.findOneAndUpdate(
      { user: patientToNotify },
      {
        $pull: {
          notications: {
            type: type,
            user: doctor,
            appointment: appointmentId,
          },
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const removeCancelledAppointmentByPatient = async (
  patient,
  doctorToNotify,
  appointmentId
) => {
  try {
    await Notification.findOneAndUpdate(
      { user: doctorToNotify },
      {
        $pull: {
          notications: {
            type: "cancelledByPatient",
            user: patient,
            appointment: appointmentId,
          },
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  bookingNotification,
  acceptedAppointmentNotification,
  cancelledAppointmentByPatient,
  removeBookingNotification,
  removeAcceptedAppointmentNotification,
  removeCancelledAppointmentByPatient,
};
