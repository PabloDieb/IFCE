import * as firebaseFunctions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const addRoles = firebaseFunctions.https.onCall((data) => {
  return admin.auth().getUserByEmail(data.email)
      .then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {
          admin: data.admin ? true : false,
          professor: data.professor ? true : false,
        });
      })
      .catch((err) => {
        return err;
      });
});

const addAdminRole = firebaseFunctions.https.onCall((data) => {
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
    });
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin`,
    };
  }).catch((err) => {
    return err;
  });
});

const addProfessorRole = firebaseFunctions.https.onCall((data) => {
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      professor: true,
    });
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an Professor`,
    };
  }).catch((err) => {
    return err;
  });
});

const removeAdminRole = firebaseFunctions.https.onCall((data) => {
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: false,
    });
  }).then(() => {
    return {
      message: `Success! ${data.email} has been demoted from Admin`,
    };
  }).catch((err) => {
    return err;
  });
});

const removeProfessorRole = firebaseFunctions.https.onCall((data) => {
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      professor: false,
    });
  }).then(() => {
    return {
      message: `Success! ${data.email} has been demoted from Professor`,
    };
  }).catch((err) => {
    return err;
  });
});

export {
  addAdminRole,
  removeAdminRole,
  addProfessorRole,
  removeProfessorRole,
  addRoles,
};
