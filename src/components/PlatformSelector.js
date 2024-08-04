// PlatformSelector.js
import React, { memo } from "react";  // Ensure React and memo are imported
import { Row, Col } from "react-bootstrap"; // Import Row and Col from react-bootstrap
import { motion } from "framer-motion";
import { RiNetflixFill } from "react-icons/ri";
import { TbBrandDisney, TbPlayerPlayFilled } from "react-icons/tb";
import { FaAmazon } from "react-icons/fa";
import { SiHbo, SiAppletv } from "react-icons/si";

// Define platform objects in the component to avoid duplication
const platforms = [
  { id: ["8"], icon: <RiNetflixFill />, label: "Netflix" },
  { id: ["119", "10"], icon: <FaAmazon />, label: "Amazon Video" },
  { id: ["337"], icon: <TbBrandDisney />, label: "Disney Plus" },
  { id: ["1899"], icon: <SiHbo />, label: "HBO Max" },
  { id: ["350"], icon: <SiAppletv />, label: "Apple TV+" },
  { id: ["505"], icon: <TbPlayerPlayFilled />, label: "Player" },
  { id: ["0"], icon: <TbPlayerPlayFilled />, label: "SkyShowtime" },
];

const PlatformSelector = memo(({ selectedPlatforms, handlePlatformChange }) => (
  <Row className="mb-4">
    <Col>
      <h3 className="text-center">Wybierz platformy streamingowe</h3>
      <div className="platform-selection d-flex flex-wrap justify-content-center">
        {platforms.map((platform) => (
          <motion.div
            key={platform.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`platform-button ${
              platform.id.some((id) => selectedPlatforms.includes(id))
                ? "selected"
                : ""
            }`}
          >
            <motion.button
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
                transition: "background-color 0.3s, color 0.3s, box-shadow 0.3s",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                backgroundColor: platform.id.some((id) =>
                  selectedPlatforms.includes(id)
                )
                  ? "#5a647d"
                  : "transparent",
                borderColor: "#5a647d",
                color: platform.id.some((id) => selectedPlatforms.includes(id))
                  ? "#fff"
                  : "#5a647d",
              }}
              onTap={() => handlePlatformChange(platform.id)}
            >
              <span style={{ fontSize: "30px" }}>{platform.icon}</span>
              <span style={{ fontSize: "16px", textAlign: "center" }}>
                {platform.label}
              </span>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </Col>
  </Row>
));

export default PlatformSelector;