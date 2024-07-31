import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import './MovieSuggestionModal.css';
import { RiNetflixFill } from "react-icons/ri";
import { TbBrandDisney } from "react-icons/tb";
import { FaAmazon } from "react-icons/fa";
import { SiHbo, SiAppletv } from "react-icons/si";
import { motion } from 'framer-motion';
import { FaSync } from 'react-icons/fa';

const providerIcons = {
    '8': <RiNetflixFill />,
    '10': <FaAmazon />,
    '337': <TbBrandDisney />,
    '1899': <SiHbo />,
    '350': <SiAppletv />
};

const MovieSuggestionModal = ({ movie, onClose, onNextSuggestion, loading }) => {
    if (!movie) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
        >
            <Modal show={true} onHide={onClose} dialogClassName="custom-modal">
                <Modal.Header>
                    <div className="modal-title-container">
                        <Modal.Title className="custom-modal-title">{movie.title}</Modal.Title>
                        <Button 
                            variant="outline-light" 
                            className="refresh-button" 
                            onClick={onNextSuggestion}
                            disabled={loading}
                        >
                            Już to widziałem! <FaSync />
                        </Button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : (
                        <>
                            <p className="custom-modal-overview">{movie.overview}</p>
                            <p><strong>Rating:</strong> {movie.vote_average}</p>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="img-fluid custom-modal-poster"
                            />
                            <h3 className="custom-modal-providers-title">Available on:</h3>
                            {movie.providers && movie.providers.length > 0 ? (
                                <ul className="custom-modal-providers">
                                    {movie.providers.map(provider => (
                                        <li key={provider.provider_id} className="custom-modal-provider-icon">
                                            {providerIcons[provider.provider_id.toString()] || provider.provider_name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No streaming providers available.</p>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </motion.div>
    );
};

export default MovieSuggestionModal;