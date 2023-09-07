import Announcement from "../../services/interfaces/Announcement";

interface props {
  announcement: Announcement;
}
export default function Announcements({announcement}: props) {
  return (
    <>
      <h2>
        {announcement.text}
      </h2>
      <h6 className="text-muted">{"- " + announcement.author}</h6>
    </>
  );
}