import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import React from "react";

import { constants } from './constants';

function FixedNavbar(props) {
    return (
        <Navbar fixed="top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className="mr-3 pr-3">{constants.BRAND}</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default FixedNavbar;
