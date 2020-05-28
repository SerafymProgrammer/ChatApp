import { URL_API } from "../environment";
import axios from "axios";

export default class AuthService {
  static loginUser = (user) => {
    return axios.post(`${URL_API}/auth/login`, user)
  };
}
