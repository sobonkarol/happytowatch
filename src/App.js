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
import { TbBrandDisney } from "react-icons/tb";
import { FaAmazon } from "react-icons/fa";
import { SiHbo, SiAppletv } from "react-icons/si";
import MovieSuggestionModal from "./components/MovieSuggestionModal";
import useFetchMovies from "./useFetchMovies"; // Importuj nowy hook
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
    { id: "8", icon: <RiNetflixFill />, label: "Netflix" },
    { id: "10", icon: <FaAmazon />, label: "Amazon Prime Video" },
    { id: "337", icon: <TbBrandDisney />, label: "Disney Plus" },
    { id: "1899", icon: <SiHbo />, label: "HBO Max" },
    { id: "350", icon: <SiAppletv />, label: "Apple TV Plus" },
  ];

  const handleMoodChange = (mood) => {
    setSelectedMoods((prevMoods) => {
      if (prevMoods.includes(mood.id)) {
        return prevMoods.filter((m) => m !== mood.id);
      } else if (prevMoods.length < 2) {
        return [...prevMoods, mood.id];
      } else {
        return prevMoods;
      }
    });
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prevPlatforms) => {
      if (prevPlatforms.includes(platform.id)) {
        return prevPlatforms.filter((p) => p !== platform.id);
      } else {
        return [...prevPlatforms, platform.id];
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
        <h1 className="logo-text mb-4">MOODFILM</h1>
        <Row className="mb-4">
          <Col>
            <h3 className="text-center">Wybierz swój nastrój</h3>
            <div className="mood-selection d-flex flex-wrap justify-content-center">
              {moods.map((mood) => (
                <motion.div
                key={mood.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`mood-button ${
                  selectedMoods.includes(mood.id) ? "selected" : ""
                }`}
                onClick={() => handleMoodChange(mood)}
              >
                <Button
                  className={`m-2 ${
                    selectedMoods.includes(mood.id)
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
                  }}
                >
                  <span style={{ fontSize: "30px" }}>{mood.emoji}</span>
                  <span style={{ fontSize: "14px", textAlign: "center" }}>
                    {mood.label}
                  </span>
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
                key={platform.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`platform-button ${
                  selectedPlatforms.includes(platform.id) ? "selected" : ""
                }`}
                onClick={() => handlePlatformChange(platform)}
              >
                <Button
                  className={`m-2 ${
                    selectedPlatforms.includes(platform.id)
                      ? "selected-button"
                      : "btn-outline-light"
                  }`}
                  style={{
                    width: "120px",
                    height: "120px",
                    fontSize: "18px",
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