import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { scopes, msalInstance } from "./msal";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  if (config.headers) {
    config.headers["Content-Type"] = "application/json";
  }

  const account = msalInstance.getAllAccounts()[0];
  if (account) {
    const accessTokenResponse = await msalInstance.acquireTokenSilent({
      scopes: scopes,
      account: account,
    });

    if (accessTokenResponse) {
      const accessToken = accessTokenResponse.accessToken;

      if (config.headers && accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
  }
  return config;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { url } = error.config as AxiosRequestConfig;
    const { statusText, status } = (error.response as AxiosResponse) ?? {};

    console.error(`Axios error calling URL ${url}: HTTP status ${status} (${statusText}): ${message}`);
  } else {
    console.error(`API error: ${error.message}`);
  }

  return Promise.reject(error);
};

instance.interceptors.request.use(onRequest, onErrorResponse);

export default instance;
