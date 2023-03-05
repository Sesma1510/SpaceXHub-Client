import { useState } from "react";
import axios from "axios";

export default function Favorite({
  launchId,
  isFavorite,
  setFavorites,
  userId,
}) {
  const [error, setError] = useState("");

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        // Remove launch from favorites
        const res = await axios.delete(`/favorites/${userId}/${launchId}`);
        setFavorites(res.data.favorites); // update favorites state
      } else {
        // Add launch to favorites
        const res = await axios.post(`/favorites/${userId}`, {
          launchId: launchId,
        });
        setFavorites(res.data.favorites); // update favorites state
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <button
      className="favorite-btn mb-8  py-2 px-4 rounded-full border border-solid border-gray-300 text-white font-semibold text-sm transition-colors duration-300 ease-in-out hover:bg-gray-800 hover:text-white"
      onClick={toggleFavorite}
    >
      {error ? (
        <span className="text-white">{error}</span>
      ) : isFavorite ? (
        "Remove from Favorites"
      ) : (
        "Add to Favorites"
      )}
    </button>
  );
}
