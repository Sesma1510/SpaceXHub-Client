import axios from "axios";

class FavoritesService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL
        ? `${process.env.REACT_APP_SERVER_URL}/api`
        : "http://localhost:5005/api",
    });
  }

  addFavorite = (userId, launchId) => {
    // remove isFavorite here
    return this.api.post(`/favorites/${userId}`, { launchId });
  };

  removeFavorite = (userId, launchId) => {
    return this.api.delete(`/favorites/${userId}/${launchId}`);
  };

  getFavorites = (userId) => {
    return this.api.get(`/favorites/${userId}`);
  };
}

// Create one instance (object) of the service
const favoritesService = new FavoritesService();

export default favoritesService;
