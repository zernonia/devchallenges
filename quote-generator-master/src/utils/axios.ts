import axios from "axios";

export default axios.create({
  baseURL: "https://quote-garden.herokuapp.com/api/v2"
});