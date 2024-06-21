import axios from "axios";
import { baseUrlSimit } from "../config";

export const apiSimit = axios.create({ baseURL: baseUrlSimit });
