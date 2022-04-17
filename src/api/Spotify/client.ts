import axios from "axios";

const baseURL = "https://api.spotify.com/v1";
const client = axios.create({ baseURL });

export default client;
