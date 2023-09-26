import TelaDespesas from "./TelaDespesas";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/despesas/:yearMonth">
          <TelaDespesas />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
