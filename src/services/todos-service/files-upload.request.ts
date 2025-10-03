import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;

export const MAX_UPLOAD_MB = 10; // change to your limit
export const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;

// FILES UPLOAD REQUESTS
export const useFilesUploadRequest = () => {
  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      try {
        const response = await axios.post(`${baseURL}/users/avatar`, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error(
          error.response?.data?.message ||
            "File too large. Please upload a smaller file."
        );
      }
    },
  });
};
