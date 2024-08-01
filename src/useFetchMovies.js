import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const TMDB_API_KEY = "c7fefbc9842b298dffc7d99482474c9f";
const BASE_URL = "https://api.themoviedb.org/3";

const useFetchMovies = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (selectedGenres, includeAnimation, platforms) => {
    if (!Array.isArray(selectedGenres) || !selectedGenres.length || !Array.isArray(platforms) || !platforms.length) {
      toast.warning("Wybierz nastroje i platformy.");
      return;
    }

    setLoading(true);
    try {
      const promises = [1, 2, 3, 4, 5, 6, 7, 8].map(page =>
        axios.get(`${BASE_URL}/discover/movie`, {
          params: {
            api_key: TMDB_API_KEY,
            language: "pl-PL",
            sort_by: "popularity.desc",
            include_adult: true, // Zmiana include_adult na true
            page,
            with_genres: selectedGenres.join(","),
            without_genres: includeAnimation ? "" : "16",
            watch_region: "PL",
          }
        })
      );

      const results = await Promise.all(promises);
      const moviesWithProviders = await Promise.all(results.flatMap(result => result.data.results).map(async movie => {
        const providerResponse = await axios.get(`${BASE_URL}/movie/${movie.id}/watch/providers`, {
          params: {
            api_key: TMDB_API_KEY
          }
        });
        return {
          ...movie,
          providers: providerResponse.data.results.PL?.flatrate || []
        };
      }));

      // Filtruj filmy na podstawie wybranych platform
      const filteredMovies = moviesWithProviders.filter(movie =>
        movie.vote_average >= 7 &&
        movie.providers.some(provider => platforms.includes(provider.provider_id.toString()))
      );

      if (filteredMovies.length) {
        setMovies(filteredMovies);
      } else {
        toast.info("Nie znaleziono filmów spełniających kryteria.");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Wystąpił błąd podczas wyszukiwania filmów. Spróbuj ponownie!");
    } finally {
      setLoading(false);
    }
  };

  return { loading, movies, fetchMovies };
};

export default useFetchMovies;