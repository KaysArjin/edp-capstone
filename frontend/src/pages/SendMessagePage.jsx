import { Container } from "reactstrap";
import SendCard from "../components/SendCard";
import Header from "../components/Header"
import Footer from "../components/Footer"


const SendMessagePage = ({username, handleUsername}) => {

    return (
        <Container>
            <Header />
            <SendCard username = {username} handleUsername = {handleUsername}/>
            <Footer />
        </Container>
    )
};

export default SendMessagePage;