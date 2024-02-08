import { Container } from "reactstrap";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import Header from "../components/Header"
import Footer from "../components/Footer"


const HomePage = () => {
    return (
        <Container>
            <Header />
            <LoginForm />
            <RegistrationForm />
            <Footer />
        </Container>
    )
};

export default HomePage;