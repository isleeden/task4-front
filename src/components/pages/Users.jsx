import React, { useContext } from "react";
import { Context } from "../../App";

export default function Users() {
  const { store } = useContext(Context);

  const onLogout = () => {
    store.logout();
  };

  return <div onClick={onLogout}>Logout</div>;
}
