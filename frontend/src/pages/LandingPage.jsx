import { Container } from "reactstrap";
import MessageCard from "../components/MessageCard";
import Header from "../components/Header"
import Footer from "../components/Footer"


const LandingPage = ({ username, handleUsername }) => {

    return (
        <Container>
            <Header />
            <MessageCard username={username} handleUsername={handleUsername} />
            <Footer />
        </Container>
    )
};

export default LandingPage;