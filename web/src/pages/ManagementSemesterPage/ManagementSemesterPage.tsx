import { addDoc, collection } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { Button, Container, Form, FormCheck } from "react-bootstrap";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ScheduleRegistrationTable from "./ScheduleRegistrationTable/ScheduleRegistrationTable";
import SemesterTable from "./SemestersTable/SemestersTable";
import { getActiveSemester } from "../../utils/functions";

export default function SemesterManagementPage() {
  const [semesters, loading, error, snapshot] = useCollectionData(getActiveSemester());
  const [semester, setSemester] = useState({});
  console.log(semesters)
  const [showTable, setShowTable] = useState(false);
  const [currentView, setCurrentView] = useState("");
  return(
    <Container>
      {
        showTable ? <ScheduleRegistrationTable semester={semester}/> 
        : <SemesterTable snapshot={snapshot} showTable={setShowTable} setSemester={setSemester} /> 
      }
    </Container>
  );
}