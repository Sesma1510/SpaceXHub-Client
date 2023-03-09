import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });
  }

  fetchUser = (userId) => {
    return this.api.get(`user/${userId}`);
  };

  updateUserProfileImage = (userId, imageBase64) => {
    return this.api.put(
      `/user/profile/update/${userId}`,
      { imageBase64 },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
}

// Create one instance (object) of the service
const userService = new UserService();

export default userService;
