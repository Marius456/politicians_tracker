import { Navbar as NavbarBs, Nav } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export function Navbar() {
    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
            <Container>

                <Nav className="me-right">
                    <Nav.Link to="/" as={NavLink}>
                        <strong>Seimas</strong>
                    </Nav.Link>
                </Nav>
                <Nav className="me-left">
                    <Nav.Link to="/hall" as={NavLink}>
                        Salė
                    </Nav.Link>
                    <Nav.Link to="/members" as={NavLink}>
                        Nariai
                    </Nav.Link>
                </Nav>
            </Container>
        </NavbarBs>
    )
}