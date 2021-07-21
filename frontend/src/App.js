import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Main from "./components/Main";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
