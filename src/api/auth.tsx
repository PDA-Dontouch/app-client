import { authInstance } from "./api";

export const login = async (sns: string) => {
  const baseUrl = `/login/${sns}`;
  
  try {
    const response = await authInstance.post(baseUrl);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};