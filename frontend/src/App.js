import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Main from "./components/Main";



import Save from "./components/Save";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          {/* Component to view all the orders --> Sharon */}
          <Route exact path="/orders" /> 

          {/* Component to view specific order with given id */}
          <Route exact path="/orders/:order-id" />
          
          {/* Component to view form in order to save an order --> Daniel */}
          <Route exact path="/save-order" component={Save}/>

          {/* Component to view form in order to save an order --> Fiona */}
          <Route exact path="/find-restaurants" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
