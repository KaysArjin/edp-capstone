import { Container } from "reactstrap";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect } from "react";


const HomePage = ({username, handleUsername}) => {
    useEffect(() => handleUsername("hello"),[])
    
    return (
        <Container>
            <Header username = {username} handleUsername = {handleUsername} />
            <LoginForm />
            <RegistrationForm />
            <Footer />
        </Container>
    )
};

export default HomePage;