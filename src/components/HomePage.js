import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import { Link } from "react-router-dom";

const Api_key = "c45a857c193f6302f2b5061c3b85e743";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=${currentPage}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh", fontFamily: 'lato' }}>
      {/* Navigation Bar  */}
      <NavbarComponent setMovies={setMovies} />

      <Container fluid className="mt-4" style={{ minHeight: "100%" }}>
        <h1 style={{ color: "white", textAlign: "center" }}>Home Movie Page</h1>
        <Row xs={1} sm={2} md={4} lg={4} xl={4}>
          {movies.map((movie) => (
            <Col key={movie.id} className="mb-4">
              {/* Link to MovieDetailsPage */}
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
                <Card style={{ backgroundColor: "black", color: "white" }}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-end mt-3">
          <Pagination style={{ backgroundColor: "grey" }}>
            {/* Pagination */}
            {Array.from({ length: 5 }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
                style={{
                  backgroundColor: "grey",
                  border: "1px solid white",
                  margin: "0 3px",
                }}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
