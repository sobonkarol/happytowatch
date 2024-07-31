import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import './MoodSelectorModal.css';

const MoodSelectorModal = ({ onMoodSelect }) => {
const [selectedMoods, setSelectedMoods] = useState([]);
const [selectedGenres, setSelectedGenres] = useState([]);
const [country, setCountry] = useState('');

const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy' },
    { id: 'sad', emoji: '😢', label: 'Sad' },
    { id: 'excited', emoji: '🤩', label: 'Excited' },
    { id: 'scared', emoji: '😱', label: 'Scared' },
    { id: 'romantic', emoji: '❤️', label: 'Romantic' },
    { id: 'adventurous', emoji: '🧗', label: 'Adventurous' },
    { id: 'mysterious', emoji: '🕵️', label: 'Mysterious' },
    { id: 'dramatic', emoji: '🎭', label: 'Dramatic' },
    { id: 'sciFi', emoji: '👽', label: 'Sci-Fi' },
    { id: 'fantasy', emoji: '🧚', label: 'Fantasy' },
    { id: 'historical', emoji: '🏛️', label: 'Historical' },
    { id: 'thriller', emoji: '🔪', label: 'Thriller' },
    { id: 'documentary', emoji: '🎥', label: 'Documentary' }
];

const genres = [
    { id: '28', name: 'Action' },
    { id: '12', name: 'Adventure' },
    { id: '16', name: 'Animation' },
    { id: '35', name: 'Comedy' },
    { id: '80', name: 'Crime' },
    { id: '99', name: 'Documentary' },
    { id: '18', name: 'Drama' },
    { id: '10751', name: 'Family' },
    { id: '14', name: 'Fantasy' },
    { id: '36', name: 'History' },
    { id: '27', name: 'Horror' },
    { id: '10402', name: 'Music' },
    { id: '9648', name: 'Mystery' },
    { id: '10749', name: 'Romance' },
    { id: '878', name: 'Science Fiction' },
    { id: '10770', name: 'TV Movie' },
    { id: '53', name: 'Thriller' },
    { id: '10752', name: 'War' },
    { id: '37', name: 'Western' }
];

const handleMoodChange = (mood) => {
    setSelectedMoods((prevMoods) => {
        if (prevMoods.includes(mood.id)) {
            return prevMoods.filter((m) => m !== mood.id);
        } else {
            return [...prevMoods, mood.id];
        }
    });
};

const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    setSelectedGenres((prevGenres) =>
        checked ? [...prevGenres, value] : prevGenres.filter((genre) => genre !== value)
    );
};

const handleCountryChange = (event) => {
    setCountry(event.target.value);
};

const handleSubmit = () => {
    if (selectedMoods.length >= 3) {
        onMoodSelect(selectedMoods, selectedGenres, country);
    } else {
        alert('Please select at least three moods.');
    }
};

return (
    <Modal show={true} onHide={() => {}}>
        <Modal.Header closeButton>
            <Modal.Title>Select Your Mood</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="mood-selection">
                {moods.map((mood) => (
                    <button
                        key={mood.id}
                        className={`mood-button btn btn-outline-light m-2 ${selectedMoods.includes(mood.id) ? 'selected' : ''}`}
                        onClick={() => handleMoodChange(mood)}
                    >
                        <span role="img" aria-label={mood.label}>
                            {mood.emoji}
                        </span>
                        <br />
                        {mood.label}
                    </button>
                ))}
            </div>
            <h3>Select Genres (optional)</h3>
            <Form>
                {genres.map((genre) => (
                    <Form.Check 
                        key={genre.id} 
                        type="checkbox" 
                        label={genre.name} 
                        value={genre.id} 
                        onChange={handleGenreChange} 
                    />
                ))}
            </Form>
            <h3>Select Country (optional)</h3>
            <Form.Group controlId="formCountry">
                <Form.Control 
                    type="text" 
                    placeholder="e.g., US, FR, JP" 
                    value={country} 
                    onChange={handleCountryChange} 
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => {}}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Get Suggestion
            </Button>
        </Modal.Footer>
    </Modal>
);
};

export default MoodSelectorModal;