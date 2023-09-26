import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3004/",
  timeout: 10000,
  // json-server --watch db.json --port 3004
});

export async function read(url) {
  const { data } = await API.get(url);
  return data;
}
