// MoodSelector.js
import React, { memo } from "react"; // Ensure React and memo are imported
import { Row, Col } from "react-bootstrap"; // Import Row and Col from react-bootstrap
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

// Define mood objects in the component to avoid duplication
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

const MoodSelector = memo(({ selectedMoods, handleMoodChange }) => (
  <Row className="mb-4">
    <Col>
      <h3 className="text-center">Wybierz swój nastrój (maksymalnie dwa)</h3>
      <div className="mood-selection d-flex flex-wrap justify-content-center">
        {moods.map((mood) => (
          <motion.div
            key={mood.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`mood-button ${
              selectedMoods.includes(mood.id) ? "selected" : ""
            }`}
          >
            <motion.button
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
                borderRadius: "8px",
                transition: "background-color 0.3s, color 0.3s, box-shadow 0.3s",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                backgroundColor: selectedMoods.includes(mood.id)
                  ? "#5a647d"
                  : "transparent",
                borderColor: "#5a647d",
                color: selectedMoods.includes(mood.id) ? "#fff" : "#5a647d",
              }}
              onTap={() => handleMoodChange(mood.id)}
            >
              <span style={{ fontSize: "30px" }}>{mood.emoji}</span>
              <span style={{ fontSize: "14px", textAlign: "center" }}>
                {mood.label}
              </span>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </Col>
  </Row>
));

export default MoodSelector;