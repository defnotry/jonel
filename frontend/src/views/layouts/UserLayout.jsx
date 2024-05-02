import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axios_client from "../../configs/axios-client";
import { useEffect } from "react";
import { Button } from "primereact/button";

function UserLayout() {
  const { user, token, setUser, setToken } = useStateContext();

  useEffect(() => {
    axios_client.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, [setUser]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axios_client.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <div>
      <div>
        <Button label="Logout" onClick={onLogout}/>
      </div>
      <Outlet />
    </div>
  );
}

export default UserLayout;
