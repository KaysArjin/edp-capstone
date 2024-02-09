import { Container } from "reactstrap";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect } from "react";


const HomePage = ({username, handleUsername}) => {
    console.log("in homepage")
    console.log(username)
    
    return (
        <Container>
            <Header />
            <LoginForm  username = {username} handleUsername = {handleUsername} />
            <RegistrationForm  username = {username} handleUsername = {handleUsername} />
            <Footer />
        </Container>
    )
};

export default HomePage;