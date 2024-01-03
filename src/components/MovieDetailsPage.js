// src/components/MovieDetailsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Api_key = "c45a857c193f6302f2b5061c3b85e743";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [backdropImage, setBackdropImage] = useState(null);

  const { id } = useParams();

  

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${Api_key}&language=en-US&append_to_response=credits`
        );
        setMovieDetails(response.data);
        setBackdropImage(response.data.backdrop_path);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Movie not found.");
        } else {
          setError("An error occurred while fetching movie details.");
        }
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movieDetails || !movieDetails.credits || !movieDetails.credits.cast) {
    return <div>No cast information available.</div>;
  }

  const { title, poster_path, tagline, release_date, vote_average, overview, credits } = movieDetails;
  const { cast } = credits;

  return (
    <div style={{ backgroundColor: "black", color: "white",fontFamily: 'lato'}}>
      <NavbarComponent />

      <div
        style={{
          position: "relative",
          background: `url(https://image.tmdb.org/t/p/original${backdropImage}) center/cover no-repeat`,
          color: "white",
          padding: "20px",
          backgroundSize: "90%",
          margin:"40px",
          borderRadius:"10px"
        }}
      >
        <Container>
          <Row>
            <Col md={6}>
              <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} style={{ width: "50%", height: "80%", borderRadius:"10%" }} />
            </Col>
            <Col md={6}>
              <h1>{title}</h1>
              <h2 style={{ color: "blue" }}>Rating: {vote_average}/10</h2>
              <p>{tagline}</p>
              <p>Release Date: {release_date}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Overview:</h2>
              <p>{overview}</p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container style={{ backgroundColor: "black", padding: "20px" }}>
        <Row>
          <Col>
            <h2>Cast</h2>
            <Row>
              {cast.slice(0, 6).map((actor) => (
                <Col key={actor.id} md={2} className="mb-3">
                  <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} style={{ width: "100%" }} />
                  <p>{actor.name}</p>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>



    </div>
  );
};

export default MovieDetailsPage;
