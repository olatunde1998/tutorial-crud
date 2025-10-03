import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASEURL;

// CREATE TODO REQUEST
export const useCreateTodoRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      description,
    }: {
      title: string;
      description?: string;
    }) => {
      const response = await axios.post(
        `${baseURL}/todos/`,
        { title, description },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Todo created successfully 🎉");
      queryClient.invalidateQueries({ queryKey: ["todoService"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error creating todo");
    },
  });
};

// READ (GET) TODOS  REQUEST
export const useGetTodosRequest = () => {
  return useQuery({
    queryKey: ["todoService"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${baseURL}/todos?query=reactjs&complete=false`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
  });
};

// READ (GET) TODO  REQUEST
export const useGetTodoRequest = (todoId: string) => {
  return useQuery({
    queryKey: ["singleTodoService"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${baseURL}/todos/${todoId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    enabled: !!todoId,
  });
};

// UPDATE TODO REQUEST
export const useUpdateTodoRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      todoId,
      payload,
    }: {
      todoId: string;
      payload: any;
    }) => {
      try {
        const response = await axios.patch(
          `${baseURL}/todos/${todoId}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              // Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Todo updated successfully 🎉");
      queryClient.invalidateQueries({ queryKey: ["todoService"] });
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

// UPDATE TODO REQUEST
export const useDeleteTodoRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ todoId }: { todoId: string }) => {
      try {
        const response = await axios.delete(`${baseURL}/todos/${todoId}`, {
          maxBodyLength: Infinity,
          headers: {
            Accept: "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Todo deleted successfully 🎉");
      queryClient.invalidateQueries({ queryKey: ["todoService"] });
    },
    onError: (error: any) => {
      if (error.response?.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

// TODO STATUS REQUEST
export const useTodoStatusRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ todoId }: { todoId: string }) => {
      const response = await axios.patch(
        `${baseURL}/todos/toggle/status/${todoId}`,
        {},
        { headers: { accept: "application/json" } }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Status updated successfully 🎉");
      queryClient.invalidateQueries({ queryKey: ["todoService"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error updating status");
    },
  });
};
