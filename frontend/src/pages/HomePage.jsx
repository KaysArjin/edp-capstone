import { Container } from "reactstrap";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import SubHeader from "../components/SubHeader";


const HomePage = () => {
    return (
        <Container>
            <SubHeader current='Home' />
            <LoginForm />
            <RegistrationForm />
        </Container>
    )
};

export default HomePage;