// src/components/NavbarComponent.js
import React, { useState } from "react";
import { Navbar, Container, Nav, Form, FormControl, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Api_key = "c45a857c193f6302f2b5061c3b85e743";

const NavbarComponent = ({ setMovies }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = async () => {
        if (searchQuery.trim() === "") {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=1`
            );
            setMovies(response.data.results);
        } else {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${searchQuery}&page=1`
            );
            setMovies(response.data.results);
        }

        // Clear the search bar text after searching
        setSearchQuery("");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Movies App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-between">
                    <Nav md={6}>
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/top-rated">
                            Top Rated
                        </Nav.Link>
                        <Nav.Link as={Link} to="/upcoming">
                            Upcoming
                        </Nav.Link>
                    </Nav>
                    <Form inline>
                        <Row>
                            <Col xs={8} md={6}>
                                <FormControl
                                    type="text"
                                    placeholder="Search movies..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </Col>
                            <Col xs={4} md={2}>
                                <Button
                                    variant="secondary"
                                    className="ml-2"
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
