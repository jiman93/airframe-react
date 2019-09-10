import api from "./api";
import Axios from "axios";

const axios = Axios.create({
  baseURL: api.baseURL,
  timeout: 30000,
  headers: {
    "X-DreamFactory-API-Key": api.apiKey,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Type": "application/json"
  }
});

export default axios;
