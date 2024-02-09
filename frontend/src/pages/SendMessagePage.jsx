import { Container } from "reactstrap";
import SendCard from "../components/SendCard";
import Header from "../components/Header"
import Footer from "../components/Footer"


const SendMessagePage = ({password, handlePassword}) => {
    useEffect(() => handlePassword("hello"),[])
    return (
        <Container>
            <Header />
            <SendCard />
            <Footer />
        </Container>
    )
};

export default SendMessagePage;