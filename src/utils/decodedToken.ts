import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  name: string;
  email: string;
  role: string;
}

const decodedToken = (token: string): DecodedToken => {
  return jwtDecode(token);
}

export default decodedToken;
