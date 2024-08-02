import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Form, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaRegSmile,
  FaRegFrown,
  FaRegSurprise,
  FaRegMeh,
  FaRegHeart,
  FaCompass,
  FaQuestionCircle,
  FaTheaterMasks,
  FaRocket,
  FaMagic,
  FaHistory,
  FaExclamationTriangle,
  FaFilm,
  FaLaugh,
  FaLightbulb,
  FaPeace,
  FaQuestion,
  FaBolt,
} from "react-icons/fa";
import { RiNetflixFill } from "react-icons/ri";
import { TbBrandDisney, TbPlayerPlayFilled } from "react-icons/tb";
import { FaAmazon } from "react-icons/fa";
import { SiHbo, SiAppletv } from "react-icons/si";
import MovieSuggestionModal from "./components/MovieSuggestionModal";
import useFetchMovies from "./useFetchMovies";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "./App.css";

const App = () => {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [includeAnimation, setIncludeAnimation] = useState(false);
  const [suggestedMovie, setSuggestedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, movies, fetchMovies } = useFetchMovies();

  const moods = [
    { id: "happy", emoji: <FaRegSmile />, label: "Szczęśliwy" },
    { id: "sad", emoji: <FaRegFrown />, label: "Smutny" },
    { id: "excited", emoji: <FaRegSurprise />, label: "Podekscytowany" },
    { id: "scared", emoji: <FaRegMeh />, label: "Przestraszony" },
    { id: "romantic", emoji: <FaRegHeart />, label: "Romantyczny" },
    { id: "adventurous", emoji: <FaCompass />, label: "Przygodowy" },
    { id: "mysterious", emoji: <FaQuestionCircle />, label: "Tajemniczy" },
    { id: "dramatic", emoji: <FaTheaterMasks />, label: "Dramatyczny" },
    { id: "sciFi", emoji: <FaRocket />, label: "Sci-Fi" },
    { id: "fantasy", emoji: <FaMagic />, label: "Fantastyczny" },
    { id: "historical", emoji: <FaHistory />, label: "Historyczny" },
    { id: "thriller", emoji: <FaExclamationTriangle />, label: "Thriller" },
    { id: "documentary", emoji: <FaFilm />, label: "Dokumentalny" },
    { id: "funny", emoji: <FaLaugh />, label: "Zabawny" },
    { id: "inspirational", emoji: <FaLightbulb />, label: "Inspirujący" },
    { id: "calm", emoji: <FaPeace />, label: "Spokojny" },
    { id: "curious", emoji: <FaQuestion />, label: "Ciekawy" },
    { id: "energized", emoji: <FaBolt />, label: "Energiczny" },
    { id: "nostalgic", emoji: <FaHistory />, label: "Nostalgiczny" },
    { id: "melancholic", emoji: <FaRegFrown />, label: "Melancholijny" },
    { id: "motivated", emoji: <FaLightbulb />, label: "Zmotywowany" },
    { id: "relaxed", emoji: <FaPeace />, label: "Zrelaksowany" },
    { id: "tense", emoji: <FaExclamationTriangle />, label: "Spięty" },
    { id: "bored", emoji: <FaQuestion />, label: "Znudzony" },
  ];

  const platforms = [
    { id: ["8"], icon: <RiNetflixFill />, label: "Netflix" },
    { id: ["119", "10"], icon: <FaAmazon />, label: "Amazon Video" }, // Multiple IDs for Amazon
    { id: ["337"], icon: <TbBrandDisney />, label: "Disney Plus" },
    { id: ["1899"], icon: <SiHbo />, label: "HBO Max" },
    { id: ["350"], icon: <SiAppletv />, label: "Apple TV+" },
    { id: ["505"], icon: <TbPlayerPlayFilled />, label: "Player" },
  ];

  const handleMoodChange = (mood) => {
    setSelectedMoods((prevMoods) => {
      // Toggle mood selection: select if not selected, deselect if selected
      if (prevMoods.includes(mood.id)) {
        return prevMoods.filter((m) => m !== mood.id);
      } else {
        return [...prevMoods, mood.id];
      }
    });
  };


  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prevPlatforms) => {
      const platformIDs = platform.id; // Use the array of IDs
      const isSelected = platformIDs.some((id) => prevPlatforms.includes(id)); // Check if any ID is selected

      if (isSelected) {
        // If any of the platform's IDs is selected, remove all
        return prevPlatforms.filter((p) => !platformIDs.includes(p));
      } else {
        // Add all platform IDs
        return [...prevPlatforms, ...platformIDs];
      }
    });
  };

  const handleIncludeAnimationChange = () => {
    setIncludeAnimation(!includeAnimation);
  };

  const handleSubmit = () => {
    if (selectedMoods.length < 1) {
      toast.warning("Wybierz proszę przynajmniej jeden nastrój.");
    } else if (selectedPlatforms.length < 1) {
      toast.warning("Wybierz proszę przynajmniej jedną platformę streamingową.");
    } else {
      fetchMovies(mapMoodsToGenres(selectedMoods), includeAnimation, selectedPlatforms);
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
        <Row className="mb-4">
          <Col>
            <h3 className="text-center">Wybierz swój nastrój (maksymalnie dwa)</h3>
            <div className="mood-selection d-flex flex-wrap justify-content-center">
              {moods.map((mood) => (
                <motion.div
                  key={mood.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`mood-button ${selectedMoods.includes(mood.id) ? "selected" : ""}`}
                  onClick={() => handleMoodChange(mood)}
                  onTouchEnd={(e) => {
                    e.preventDefault(); // Prevent touch events from interfering with clicks
                    handleMoodChange(mood);
                  }}
                >
                  <Button
                    className={`m-2 ${selectedMoods.includes(mood.id) ? "selected-button" : "btn-outline-light"}`}
                    style={{
                      width: "140px",
                      height: "140px",
                      fontSize: "14px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <span style={{ fontSize: "30px" }}>{mood.emoji}</span>
                    <span style={{ fontSize: "14px", textAlign: "center" }}>{mood.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
            </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h3 className="text-center">Wybierz platformy streamingowe</h3>
            <div className="platform-selection d-flex flex-wrap justify-content-center">
              {platforms.map((platform) => (
                <motion.div
                  key={platform.label} // Use a unique key for each platform
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`platform-button ${
                    platform.id.some((id) => selectedPlatforms.includes(id))
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handlePlatformChange(platform)}
                  onTouchEnd={(e) => {
                    e.preventDefault(); // Prevent touch events from interfering with clicks
                    handlePlatformChange(platform);
                  }}
                >
                  <Button
                    className={`m-2 ${
                      platform.id.some((id) => selectedPlatforms.includes(id))
                        ? "selected-button"
                        : "btn-outline-light"
                    }`}
                    style={{
                      width: "140px",
                      height: "140px",
                      fontSize: "14px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    <span style={{ fontSize: "30px" }}>{platform.icon}</span>
                    <span style={{ fontSize: "16px", textAlign: "center" }}>
                      {platform.label}
                    </span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </Col>
        </Row>
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