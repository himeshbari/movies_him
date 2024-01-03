// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomePage from "./components/HomePage";
import TopRatedPage from "./components/TopRatedPage";
import UpcomingPage from "./components/UpcomingPage";
import MovieDetailsPage from "./components/MovieDetailsPage"; 

const Api_key = "c45a857c193f6302f2b5061c3b85e743";

const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/top-rated" element={<TopRatedPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
