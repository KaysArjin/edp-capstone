import { Container } from "reactstrap";
import Header from "../components/Header"
import Footer from "../components/Footer"
import ContactForm from "../components/ContactForm";


const ContactPage = () => {
    return (
        <Container>
            <Header />
            <ContactForm />
            <Footer />
        </Container>
    )
};

export default ContactPage;