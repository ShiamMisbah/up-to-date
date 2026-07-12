import { signup } from "@/app/services/auth.services";
import { SignupPayloadSchema } from "@/schema/auth.schema";
import { useState } from "react";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const handleSignup = async (data: SignupPayloadSchema) => {
        setLoading(true)
        setError("")

        try {
          const response = await signup(data);
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
      handleSignup,
    };
};
