import React, { useState, useEffect, useCallback } from "react"; // Removed unused imports
import { Container, Row, Col, Form, Spinner, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import MovieSuggestionModal from "./components/MovieSuggestionModal";
import useFetchMovies from "./useFetchMovies";
import MoodSelector from "./components/MoodSelector";
import PlatformSelector from "./components/PlatformSelector";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

// Component to display the main application
const App = () => {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [includeAnimation, setIncludeAnimation] = useState(false);
  const [suggestedMovie, setSuggestedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, movies, fetchMovies } = useFetchMovies();

  // Handle changes in mood selection
  const handleMoodChange = useCallback(
    (moodId) => {
      setSelectedMoods((prevMoods) => {
        if (prevMoods.includes(moodId)) {
          return prevMoods.filter((m) => m !== moodId);
        } else if (prevMoods.length < 2) {
          return [...prevMoods, moodId];
        } else {
          toast.warning("Możesz wybrać maksymalnie dwa nastroje.");
          return prevMoods;
        }
      });
    },
    [setSelectedMoods]
  );

  // Handle changes in platform selection
  const handlePlatformChange = useCallback(
    (platformIds) => {
      setSelectedPlatforms((prevPlatforms) => {
        const isSelected = platformIds.some((id) => prevPlatforms.includes(id));
        if (isSelected) {
          return prevPlatforms.filter((p) => !platformIds.includes(p));
        } else {
          return [...prevPlatforms, ...platformIds];
        }
      });
    },
    [setSelectedPlatforms]
  );

  const handleIncludeAnimationChange = () => {
    setIncludeAnimation((prev) => !prev);
  };

  // Handle form submission to fetch movies
  const handleSubmit = () => {
    if (selectedMoods.length < 1) {
      toast.warning("Wybierz przynajmniej jeden nastrój.");
    } else if (selectedPlatforms.length < 1) {
      toast.warning("Wybierz przynajmniej jedną platformę streamingową.");
    } else {
      fetchMovies(
        mapMoodsToGenres(selectedMoods),
        includeAnimation,
        selectedPlatforms
      );
    }
  };

  useEffect(() => {
    if (movies.length) {
      setSuggestedMovie(movies[Math.floor(Math.random() * movies.length)]);
      setIsModalOpen(true);
    }
  }, [movies]);

  const handleNextSuggestion = () => {
    setSuggestedMovie(movies[Math.floor(Math.random() * movies.length)]);
  };

  return (
    <div className={`App bg-dark text-light ${loading ? "blur" : ""}`}>
      <Container className="py-5">
        <h1 className="logo-text mb-4">MoodFilm</h1>
        <MoodSelector
          selectedMoods={selectedMoods}
          handleMoodChange={handleMoodChange}
        />
        <PlatformSelector
          selectedPlatforms={selectedPlatforms}
          handlePlatformChange={handlePlatformChange}
        />
        <Row className="mb-4">
          <Col className="text-center">
            <Form.Check
              type="checkbox"
              label="Wyszukaj też filmy animowane"
              onChange={handleIncludeAnimationChange}
              checked={includeAnimation}
            />
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Button variant="success" onClick={handleSubmit} disabled={loading}>
              Wyszukaj
            </Button>
          </Col>
        </Row>
      </Container>
      {isModalOpen && suggestedMovie && (
        <MovieSuggestionModal
          movie={suggestedMovie}
          onClose={() => setIsModalOpen(false)}
          onNextSuggestion={handleNextSuggestion}
        />
      )}
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar />
      {loading && (
        <div className="loading-overlay">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </div>
  );
};

const mapMoodsToGenres = (moods) => {
  const moodGenreMap = {
    happy: "35",
    sad: "18",
    excited: "28",
    scared: "27",
    romantic: "10749",
    adventurous: "12",
    mysterious: "9648",
    dramatic: "10751",
    sciFi: "878",
    fantasy: "14",
    historical: "36",
    thriller: "53",
    documentary: "99",
    funny: "35",
    inspirational: "99",
    calm: "10751",
    curious: "9648",
    energized: "28",
    nostalgic: "36",
    melancholic: "18",
    motivated: "99",
    relaxed: "10751",
    tense: "53",
    bored: "35",
  };
  return moods.map((mood) => moodGenreMap[mood]);
};

export default App;