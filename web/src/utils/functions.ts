import { query, collection, Timestamp, where, Query, DocumentData } from "firebase/firestore";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { addBookingAsync } from "../services/BookingsService";

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

function getDates (startDate, endDate) {
  const dates = <any>[];
  let currentDate = startDate
  const addDays = function (days) {
    const date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }
  while (currentDate <= endDate) {
    dates.push(currentDate)
    currentDate = addDays.call(currentDate, 7)
  }
  return dates
}

function getChunks(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size));
}

function getAuth() {
  return useAuthState(auth);
}


const getDayName = (day: number) => {
  if (day === 1) return "segunda";
  if (day === 2) return "terça";
  if (day === 3) return "quarta";
  if (day === 4) return "quinta";
  if (day === 5) return "sexta";
  return "";
}
let json = {
  "dataInicioSemestre": "01-03-2023",
  "dataFimSemestre": "01-04-2023",
  "nomeSala": "sala 1", 
  "segunda": {
    "abMorning": ["S8", "COMP", "COMPILADORES"],
    "cdMorning": ["S7", "COMP", "TEORIA COMPUTAÇÂO"],
    "abAfternoon": ["S1", "INFO", "ELET E."],
    "cdAfternoon": null
  },
  "terça": {
    "abMorning": ["S7", "COMP", "MICROCONTROLADORES"],
    "cdMorning": ["S1", "RED", "INT. ELE"],
    "abAfternoon": ["S1", "INFO", "INFO INTERP."],
    "cdAfternoon": ["S3", "INFO", "INT. EN"]
  },
  "quarta": {
    "abMorning": ["S2", "RED", "INGLES"],
    "cdMorning": ["S7", "COM", "APS"],
    "abAfternoon": ["S3", "INFO", "INT. BA"],
    "cdAfternoon": null
  },
  "quinta": {
    "abMorning": ["S7", "COM", "MICROCONTROLADORES"],
    "cdMorning": ["S1", "RED", "INT. RE"],
    "abAfternoon": ["S1", "INFO", "DESENV"],
    "cdAfternoon": null
  },
  "sexta": {
    "abMorning": ["S7", "COM", "APS"],
    "cdMorning": ["S7", "COM", "TEORIA COMPUTAÇÂO"],
    "abAfternoon": ["S1", "INFO", "INGLES"],
    "cdAfternoon": null
  }  
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
  json = JSON.parse(jsonString);

  let startDate = moment(json.dataInicioSemestre, "DD-MM-YYYY"),
      endDate = moment(json.dataFimSemestre, "DD-MM-YYYY");

  let a = [];
  while (startDate.isSameOrBefore(endDate)) {
    let dayName = getDayName(startDate.day());
    console.log(startDate.day(), startDate.format())
    if(startDate.day() === 0 || startDate.day() === 6) {
      startDate.add(1, "day");
      continue;
    }


    let result = {
      classroomName: json.nomeSala,
      date: new Date(startDate.add(1, "minutes").format()),
      abMorning: json[dayName].abMorning,
      cdMorning: json[dayName].cdMorning,
      abAfternoon: json[dayName].abAfternoon,
      cdAfternoon: json[dayName].cdAfternoon
    }
    a.push(result);
    startDate.add(1, "day");
  }
  a.map(async as => await addBookingAsync(as))
  console.log("a", a);
}

const getClassTimespans = (currentHourAndMinute: string) => {
  if(currentHourAndMinute >= "7:40" && currentHourAndMinute <= "9:59") {
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

const getCurrentTimespan = (currentHourAndMinute: string): string => {
  if(currentHourAndMinute >= "7:40" && currentHourAndMinute <= "9:59") return "abMorning";
  if(currentHourAndMinute >= "10:00" && currentHourAndMinute <= "13:29") return "cdMorning";
  if(currentHourAndMinute >= "13:30" && currentHourAndMinute <= "15:49") return "abAfternoon";
  if(currentHourAndMinute >= "15:50") return "cdAfternoon";
  return "";
}

const filterBookingsByTimespanAndProfessor = (bookings: any, timespan: string, professorEmail: string) => 
bookings.filter(booking => booking.data()[timespan].professorEmail === professorEmail);


export {
  getClassTimespans,
  getCurrentTimespan,
  getCollectionByDate,
  getActiveSemester,
  getDates,
  getChunks,
  getAuth,
  filterBookingsByTimespanAndProfessor,
  createBookings
}