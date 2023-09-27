import { useEffect, useState } from "react";
import TelaDespesas from "./TelaDespesas";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { authContext } from "./authContext";
import { IUser, getUserEndpoint } from "./backend";
import { LoginScreen } from "./LoginScreen";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, onSignOut);
  }, []);

  function onSignOut() {
    setUser(null);
  }

  if (user) {
    return (
      <authContext.Provider value={{ user, onSignOut }}>
        <BrowserRouter>
          <Switch>
            <Route path="/despesas/:yearMonth">
              <TelaDespesas />
            </Route>
            <Redirect to={{ pathname: "/despesas/2020-06"}} />
          </Switch>
        </BrowserRouter>
      </authContext.Provider>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export default App;
