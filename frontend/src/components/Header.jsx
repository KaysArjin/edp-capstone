import { useState } from 'react';
import { 
    Navbar, 
    NavbarBrand,
    Collapse,
    NavbarToggler,
    Nav, 
    NavItem,
    Container
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import CodeBloodedLogo from '../assets/CodeBloodedLogo.png';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
<Navbar dark color='primary' sticky='top' expand='md'>
            <Container fluid>
                <NavbarBrand href='/' className='ms-3'>
                    <img src={CodeBloodedLogo} alt='code blooded logo' className='me-2' style={{ maxWidth: '50px' }} />
                    Employee Feedback Portal
                </NavbarBrand>
                <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} alt="Toggle navigation" />
                <Collapse isOpen={menuOpen} navbar>
                    <Nav className='ms-auto' navbar>
                        <NavItem>
                            <NavLink className='nav-link' to='/'>
                                <i className='fa fa-home fa-lg' /> Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/landingpage'>
                                <i className='fa fa-list fa-lg' /> Message Board
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/orgchartpage'>
                                <i className='fa fa--circle-info fa-lg' /> Org Chart
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/contact'>
                                <i className='fa fa-address-card fa-lg' /> Contact
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
