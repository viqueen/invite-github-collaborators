import axios from "axios";
import { configuration } from "./configuration";

const API_ENDPOINT = "https://api.github.com";

export const githubClient = axios.create({
  headers: {
    Authorization: `Bearer ${configuration.GITHUB_ACCESS_TOKEN}`,
  },
  baseURL: API_ENDPOINT,
});
