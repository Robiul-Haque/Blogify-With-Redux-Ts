import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  role: string;
}

const decodedToken = (token: string): DecodedToken => {
  return jwtDecode(token);
}

export default decodedToken;
