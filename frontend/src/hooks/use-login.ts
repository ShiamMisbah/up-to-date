import { login } from "@/app/services/auth.services";
import { LoginSchema } from "@/schema/auth.schema"
import { useState } from "react";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (data: LoginSchema) => {
        setLoading(true);
        setError("");

        try {
          const response = await login(data);
          return response;
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          }

          throw error;
        } finally {
          setLoading(false);
        }
    }

    return {
        loading,
        error,
        handleLogin
    }
}