export default interface Booking {
  classroomName: string;
  building: string;
  date: Date;
  abMorning: ClassroomBookingData | null;
  cdMorning: ClassroomBookingData | null;
  abAfternoon: ClassroomBookingData | null;
  cdAfternoon: ClassroomBookingData | null;
}

export interface ClassroomBookingData {
  graduation: string;
  semester: string;
  course: string;
  professorEmail: string;
}