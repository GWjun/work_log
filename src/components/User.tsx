import { useAppContext } from "@/context/context";
import Table from "./Table";
import Login from "./Login";
import { useEffect } from "react";

const User = () => {
  const { user, setUser } = useAppContext();

  const fetcherUser = async () => {
    const localData = JSON.parse(
      localStorage.getItem("sb-meinnuxtjuwqmpofgqda-auth-token") || "{}"
    );

    if (Object.keys(localData).length !== 0) {
      setUser([
        localData.user.user_metadata.email,
        localData.user.user_metadata.full_name,
      ]);
    } else {
      setUser([]);
    }
  };

  useEffect(() => {
    fetcherUser();
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hash.startsWith("#access_token")
    ) {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }, [typeof window !== "undefined" && window.location.href]);

  return user.length ? <Table /> : <Login />;
};

export default User;
