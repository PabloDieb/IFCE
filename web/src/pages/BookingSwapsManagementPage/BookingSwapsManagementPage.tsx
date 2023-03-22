import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { getBookingById } from "../../services/BookingsService";
import { getOpenSwapsFromMe, getOpenSwapsToMe } from "../../services/BookingSwapService";
import BookingSwapsTable from "./BookingSwapsTable/BookingSwapTable";

export default function BookingSwapsManagementPage() {
  const [user] = useAuthState(auth);
  const [ , loading, , swapForMeSnapshot ] = getOpenSwapsToMe(user?.email ? user.email : "");
  const [ , loading2, , swapFromMeSnapshot ] = getOpenSwapsFromMe(user?.email ? user.email : "");
  
  const openBookingSwapsForMe = swapForMeSnapshot?.docs.filter(bookingSwap => bookingSwap?.data().waiting);
  const acceptedBookingSwapsForMe = swapForMeSnapshot?.docs.filter(bookingSwap => bookingSwap?.data().accepted);
  const rejectedBookingSwapsForMe = swapForMeSnapshot?.docs.filter(bookingSwap => !bookingSwap?.data().accepted);

  const openBookingSwapsFromMe = swapFromMeSnapshot?.docs.filter(bookingSwap => bookingSwap?.data().waiting);
  const acceptedBookingSwapsFromMe = swapFromMeSnapshot?.docs.filter(bookingSwap => bookingSwap?.data().accepted);
  const rejectedBookingSwapsFromMe = swapFromMeSnapshot?.docs.filter(bookingSwap => !bookingSwap?.data().accepted);

  // const openBookingSwaps: any = [];
  // const acceptedBookingSwaps: any = [];
  // const rejectedBookingSwaps: any = [];
  // openBookingSwapsForMe?.map(booking => openBookingSwaps.push(booking));
  // acceptedBookingSwapsForMe?.map(booking => acceptedBookingSwaps.push(booking));
  // rejectedBookingSwapsForMe?.map(booking => rejectedBookingSwaps.push(booking));
  // openBookingSwapsFromMe?.map(booking => openBookingSwaps.push(booking));
  // acceptedBookingSwapsFromMe?.map(booking => acceptedBookingSwaps.push(booking));
  // rejectedBookingSwapsFromMe?.map(booking => rejectedBookingSwaps.push(booking));

  return (
    <>
      {!loading && !loading2 ? 
      <Container>
        <Row>
          <Col>
            <h5>Abertas para mim</h5>
            <Tabs
              defaultActiveKey="profile"
              id="justify-tab-example"
              className="mb-3"
              justify
              >
              <Tab eventKey="open" title="Em Espera">
                <BookingSwapsTable bookingSwaps={openBookingSwapsForMe} canHandleSwap={true} />
              </Tab>
              <Tab eventKey="accepted" title="Aceitas">
                <BookingSwapsTable bookingSwaps={acceptedBookingSwapsForMe} canHandleSwap={false} />
              </Tab>
              <Tab eventKey="rejected" title="Rejeitadas">
                <BookingSwapsTable bookingSwaps={rejectedBookingSwapsForMe} canHandleSwap={false} />
              </Tab>
            </Tabs>
          </Col>
          <Col>
            <h5>Abertas por mim</h5>
            <Tabs
              defaultActiveKey="profile"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="open" title="Em Espera">
                <BookingSwapsTable bookingSwaps={openBookingSwapsFromMe} canHandleSwap={false} />
              </Tab>
              <Tab eventKey="accepted" title="Aceitas">
                <BookingSwapsTable bookingSwaps={acceptedBookingSwapsFromMe} canHandleSwap={false} />
              </Tab>
              <Tab eventKey="rejected" title="Rejeitadas">
                <BookingSwapsTable bookingSwaps={rejectedBookingSwapsFromMe} canHandleSwap={false}/>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
      : null}
    </>
  )
}