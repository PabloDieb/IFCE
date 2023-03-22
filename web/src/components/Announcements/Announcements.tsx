import React from "react";

export default function Announcements(props: any) {
  return (
    <h2>
      {props.announcement.text}
    </h2>
  );
}