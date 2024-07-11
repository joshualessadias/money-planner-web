import { api } from "@/services/Api/api";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AppUserResponseDTO,
  AuthenticationRequestDTO,
  AuthenticationResponseDTO,
} from "@/entities/money-planner-api";
import { AxiosResponse } from "axios";

const useAuth = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AppUserResponseDTO>();
  const pathname = usePathname();

  api.interceptors.request.use((request) => {
    const token = localStorage.getItem("token");

    if (token) {
      request.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    } else {
      router.push("/login");
    }

    return request;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 403) {
        console.log("error", error);
        console.log("Removing Token");
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = "";
        setIsAuth(false);
        router.push("/login");
        return Promise.reject(error);
      }
      return error.response;
    }
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    (async () => {
      if (!token) {
        router.push("/login");
      }
      setLoading(false);
    })();
  }, [router]);

  useEffect(() => {
    if (!isAuth) return;

    (async () => {
      const response: AxiosResponse<AppUserResponseDTO> = await api.get(
        "/app-user/current"
      );
      setUser(response.data);

      if (pathname === "/login" || pathname === "/") {
        router.push("/outcome");
      }
    })();
  }, [isAuth, pathname, router]);

  const handleLogin = async (authRequest: AuthenticationRequestDTO) => {
    setLoading(true);

    console.log("Removing Token");
    localStorage.removeItem("token");

    try {
      const response: AxiosResponse<AuthenticationResponseDTO> = await api.post(
        "/auth/authenticate",
        authRequest
      );

      const accessToken = response.data.token;

      localStorage.setItem("token", JSON.stringify(accessToken));
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      setIsAuth(true);

      router.push("/outcome");

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      await api.delete("/auth/logout");
      setIsAuth(false);
      setUser(undefined);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      api.defaults.headers.Authorization = "";
      setLoading(false);
      router.push("/login");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return { isAuth, user, loading, handleLogin, handleLogout };
};

export default useAuth;
