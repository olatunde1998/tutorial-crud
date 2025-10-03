import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;

// EMAIL VERIFICATION REQUEST
export const VerifyEmailRequest = async (userId: string) => {
  try {
    const response = await axios.get(
      `${baseURL}/users/verify-email/${userId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    console.log(data, "data is here");
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// FORGOT PASSWORD REQUEST
export const ForgotPasswordRequest = async (body: any) => {
  try {
    const response = await axios.post(
      `${baseURL}/users/forgot-password`,
      body,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    console.log(data, "data is here");
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// RESET FORGOTTEN PASSWORD REQUEST
export const ResetPasswordRequest = async (body: any) => {
  try {
    const response = await axios.post(
      `${baseURL}/users/reset-password/null`,
      body,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    console.log(data, "data is here");
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
