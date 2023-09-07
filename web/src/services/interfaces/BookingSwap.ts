export default interface BookingSwap {
  accepted: boolean;
  message: string;
  date: Date;
  timespan: string;
  waiting: boolean;
  bookingRequestedId: string;
  professorEmailRequested: string;
  bookingRequesterId: string;
  professorEmailRequester: string;
}