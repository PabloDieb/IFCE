import { query, collection, Timestamp, where, Query, DocumentData } from "firebase/firestore";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { addBookingAsync } from "../services/BookingsService";
import Booking, { ClassroomBookingData } from "../services/interfaces/Booking";

interface JsonInput {
  dataInicioSemestre: string;
  dataFimSemestre: string;
  nomeSala: string;
  bloco: string;
  monday: string | ClassroomBookingDay;
  tuesday: string | ClassroomBookingDay;
  wednesday: string | ClassroomBookingDay;
  thursday: string | ClassroomBookingDay;
  friday: string | ClassroomBookingDay;
}

interface ClassroomBookingDay {
  abMorning: ClassroomBookingData;
  cdMorning: ClassroomBookingData;
  abAfternoon: ClassroomBookingData;
  cdAfternoon: ClassroomBookingData;
}

function getCollectionByDate(collectionName: string, startDate: Date, endDate: Date): Query<DocumentData> {
  const queryConstraints: any = [];
  queryConstraints.push(where("date", ">=", Timestamp.fromDate(startDate)));
  queryConstraints.push(where("date", "<=", Timestamp.fromDate(endDate)));

  return query(collection(db, collectionName), ...queryConstraints);
}

function getActiveSemester(): Query<DocumentData> {
  const queryConstraints: any = [];
  queryConstraints.push(where("active", "==", true));

  return query(collection(db, "semesters"));
}

// function getDates (startDate, endDate) {
//   const dates = <any>[];
//   let currentDate = startDate
//   const addDays = function (days) {
//     const date = new Date(this.valueOf())
//     date.setDate(date.getDate() + days)
//     return date
//   }
//   while (currentDate <= endDate) {
//     dates.push(currentDate)
//     currentDate = addDays.call(currentDate, 7)
//   }
//   return dates
// }

// function getChunks(arr, size) {
//   return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
//     arr.slice(i * size, i * size + size));
// }

function getAuth() {
  return useAuthState(auth);
}


const getDayName = (day: number) => {
  if (day === 1) return "monday";
  if (day === 2) return "tuesday";
  if (day === 3) return "wednesday";
  if (day === 4) return "thursday";
  if (day === 5) return "friday";
  return "";
}

const getInfo = (data: any) => {
  if(data === null) return null;
  return {
    "semester": data[0],
    "course": data[1],
    "class": data[2]
  }
}
const createBookings = async (jsonString: string) => {
  console.log("STARTING")
  let json: JsonInput = JSON.parse(jsonString);

  let startDate = moment(json.dataInicioSemestre, "DD-MM-YYYY"),
      endDate = moment(json.dataFimSemestre, "DD-MM-YYYY");

  let bookings: Booking[] = [];

  while (startDate.isSameOrBefore(endDate)) {
    let dayName = getDayName(startDate.day());
    console.log(startDate.day(), startDate.format())
    if(startDate.day() === 0 || startDate.day() === 6) {
      startDate.add(1, "day");
      continue;
    }
    let result: Booking = {
      classroomName: json.nomeSala,
      building: json.bloco,
      date: new Date(startDate.add(1, "minutes").format()),
      abMorning: (json[dayName as keyof JsonInput] as ClassroomBookingDay).abMorning,
      cdMorning: (json[dayName as keyof JsonInput] as ClassroomBookingDay).cdMorning,
      abAfternoon: (json[dayName as keyof JsonInput] as ClassroomBookingDay).abAfternoon,
      cdAfternoon: (json[dayName as keyof JsonInput] as ClassroomBookingDay).cdAfternoon
    }

    bookings.push(result);
    startDate.add(1, "day");
  }

  bookings.map(async booking => await addBookingAsync(booking))
}
const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
const getClassTimespans = (currentHourAndMinute: string) => {
  // return {
  //   current: {
  //     timespanName: "abMorning",
  //     timespan: "7:40 ~ 9:40",
  //   },
  //   next: {
  //     timespanName: "cdMorning",
  //     timespan: "10:00 ~ 12:00" 

  //   }
  // };
  if(currentHourAndMinute >= "0:40" && currentHourAndMinute <= "9:59") {
    return {
      current: {
        timespanName: "abMorning",
        timespan: "7:40 ~ 9:40",
      },
      next: {
        timespanName: "cdMorning",
        timespan: "10:00 ~ 12:00" 

      }
    };
  } else if(currentHourAndMinute >= "10:00" && currentHourAndMinute <= "13:29") {
    return {
      current: {
        timespanName: "cdMorning",
        timespan: "10:00 ~ 12:00",
      },
      next: {
        timespanName: "abAfternoon",
        timespan: "13:30 ~ 15:30"
      }
    };
  } else if(currentHourAndMinute >= "13:30" && currentHourAndMinute <= "15:49") {
    return {
      current: {
        timespanName: "abAfternoon",
        timespan: "13:30 ~ 15:30"
      },
      next: {
        timespanName: "cdAfternoon",
        timespan: "15:50 ~ 17:50"
      }
    }
  } else if(currentHourAndMinute >= "15:50") {
    return {
      current: {
        timespanName: "cdAfternoon",
        timespan: "15:50 ~ 17:50"
      }
    };
  }

  return {};
}

const getCurrentTimespan = (): string => {
  let currentHourAndMinute = moment().hours() + ":" + moment().minutes();
  if(currentHourAndMinute >= "7:40" && currentHourAndMinute <= "9:59") return "abMorning";
  if(currentHourAndMinute >= "10:00" && currentHourAndMinute <= "13:29") return "cdMorning";
  if(currentHourAndMinute >= "13:30" && currentHourAndMinute <= "15:49") return "abAfternoon";
  if(currentHourAndMinute >= "15:50") return "cdAfternoon";
  return "";
}

const filterBookingsByTimespanAndProfessor = (bookings: any, timespan: string, professorEmail: string) => 
  bookings.filter((booking: any) => 
    booking.data()[timespan] ? booking.data()[timespan].professorEmail === professorEmail : false
  );

  // const getEnumKeys = <T>(enumToDeconstruct: T): Array<keyof typeof enumToDeconstruct> => {
  //   return Object.keys(enumToDeconstruct) as Array<keyof typeof enumToDeconstruct>;
  // };

export {
  getClassTimespans,
  getCurrentTimespan,
  getCollectionByDate,
  getActiveSemester,
  // getDates,
  // getChunks,
  getAuth,
  filterBookingsByTimespanAndProfessor,
  createBookings,
  // getEnumKeys
}