import { QueryDocumentSnapshot } from "firebase/firestore";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { getBookingById } from "../../services/BookingsService";
import { getOpenSwapsFromMe, getOpenSwapsToMe } from "../../services/BookingSwapService";
import BookingSwap from "../../services/interfaces/BookingSwap";
import BookingSwapsTable from "./BookingSwapsTable/BookingSwapTable";

export default function BookingSwapsManagementPage() {
  const [user] = useAuthState(auth);
  const [ , loading, , swapForMeSnapshot ] = getOpenSwapsToMe(user!.email!);
  const [ , loading2, , swapFromMeSnapshot ] = getOpenSwapsFromMe(user!.email!);
  
  const openBookingSwapsForMe = swapForMeSnapshot?.docs.filter(bookingSwap => bookingSwap?.data().waiting) as QueryDocumentSnapshot<BookingSwap>[];
  const acceptedBookingSwapsForMe = swapForMeSnapshot?.docs.filter(bookingSwap => bookingSwap?.data().accepted) as QueryDocumentSnapshot<BookingSwap>[];
  const rejectedBookingSwapsForMe = swapForMeSnapshot?.docs.filter(bookingSwap => !bookingSwap?.data().waiting && !bookingSwap?.data().accepted) as QueryDocumentSnapshot<BookingSwap>[];

  const openBookingSwapsFromMe = swapFromMeSnapshot?.docs.filter(bookingSwap => bookingSwap?.data().waiting) as QueryDocumentSnapshot<BookingSwap>[];
  const acceptedBookingSwapsFromMe = swapFromMeSnapshot?.docs.filter(bookingSwap => bookingSwap?.data().accepted) as QueryDocumentSnapshot<BookingSwap>[];
  const rejectedBookingSwapsFromMe = swapFromMeSnapshot?.docs.filter(bookingSwap => !bookingSwap?.data().waiting && !bookingSwap?.data().accepted) as QueryDocumentSnapshot<BookingSwap>[];

  return (
    <>
      {!loading && !loading2 ? 
      <Container>
        <Row>
          <Col>
            <h5>Abertas para mim</h5>
            <Tabs
              defaultActiveKey="open"
              id="justify-tab-example"
              className="mb-3"
              justify
              >
              <Tab eventKey="open" title={`${openBookingSwapsForMe.length} Em Espera`}>
                <BookingSwapsTable bookingSwaps={openBookingSwapsForMe!} canHandleSwap={true} />
              </Tab>
              <Tab eventKey="accepted" title={`${acceptedBookingSwapsForMe.length} Aceitas`}>
                <BookingSwapsTable bookingSwaps={acceptedBookingSwapsForMe!} canHandleSwap={false} />
              </Tab>
              <Tab eventKey="rejected" title={`${rejectedBookingSwapsForMe.length} Rejeitadas`}>
                <BookingSwapsTable bookingSwaps={rejectedBookingSwapsForMe!} canHandleSwap={false} />
              </Tab>
            </Tabs>
          </Col>
          <Col>
            <h5>Abertas por mim</h5>
            <Tabs
              defaultActiveKey="open"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="open" title={`${openBookingSwapsFromMe.length} Em Espera`}>
                <BookingSwapsTable bookingSwaps={openBookingSwapsFromMe!} canHandleSwap={false} />
              </Tab>
              <Tab eventKey="accepted" title={`${acceptedBookingSwapsFromMe.length} Aceitas`}>
                <BookingSwapsTable bookingSwaps={acceptedBookingSwapsFromMe!} canHandleSwap={false} />
              </Tab>
              <Tab eventKey="rejected" title={`${rejectedBookingSwapsFromMe.length} Rejeitadas`}>
                <BookingSwapsTable bookingSwaps={rejectedBookingSwapsFromMe!} canHandleSwap={false}/>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
      : null}
    </>
  )
}