import axios from "axios";

class LaunchesService {
  constructor() {
    this.api = axios.create({
      baseURL:
        process.env.REACT_APP_SERVER_URL + "/api" ||
        "http://localhost:5005/api",
    });
  }

  getLaunches = () => {
    return this.api.get("/launches");
  };

  getLaunchById = (id) => {
    return this.api.get(`/launches/${id}`);
  };
}

// Create one instance (object) of the service
const launchesService = new LaunchesService();

export default launchesService;
