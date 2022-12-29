import { useState } from "react";

type TStatus = "IDLE" | "FETCHING";
type TResponse<T> = {
  data?: T;
  error?: AxiosError;
};
type TFetch<T, Q> = {
  status: TStatus;
  run: (args: Q) => Promise<TResponse<T>>;
  reset: () => Promise<void> | void;
};

interface AxiosError {
  error: string;
  message: Array<string> | string;
  statusCode: number;
}

export function useFetch<T, Q>(
  apiModel: (args: Q) => Promise<T>
): TFetch<T, Q> {
  const [status, setStatus] = useState<TStatus>("IDLE");

  const run = async (args: Q) => {
    setStatus("FETCHING");
    let data: T | undefined;
    let error: AxiosError | undefined;
    try {
      const response = await apiModel(args);
      data = response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      error = e.response.data as AxiosError;
    } finally {
      setStatus("IDLE");
      // eslint-disable-next-line no-unsafe-finally
      return { data, error };
    }
  };

  const reset = () => {
    // Cancel request
    setStatus("IDLE");
  };
  return { status, run, reset };
}
