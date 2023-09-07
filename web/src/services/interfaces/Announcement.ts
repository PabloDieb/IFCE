export default interface Announcement {
  author: string | null | undefined;
  expirationDate: Date;
  text: string;
}