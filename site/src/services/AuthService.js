import axios from "../utils/axios";

class AuthService {
  async login(user) {
    const response = await axios.post("/auth/login", {
      email: user.email,
      password: user.password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user, address) {
    return axios.post("/auth/register", {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      role: "user",
    });
  }
}

export default new AuthService();
