import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./components/Router";
import Store from "./store";
import { createContext, useEffect } from "react";

export const store = new Store();

export const Context = createContext({
  store,
});

function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <Context.Provider value={{ store }}>
      <Router />
    </Context.Provider>
  );
}

export default App;
