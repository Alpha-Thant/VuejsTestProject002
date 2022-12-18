import http from "./http-common";

class DataServices {
  getAll() {
    return http.get("/players");
  }
}

export default new DataServices();