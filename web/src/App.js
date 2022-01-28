import React from "react";
import SearchComponent from "./component/SearchComponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Router>
          <Switch>
            <Route path="/" exact>
              <SearchComponent />
            </Route>
            <Route path="/:keyparams" exact>
              <SearchComponent history />
            </Route>
          </Switch>
        </Router>

        <div></div>
      </div>
    </div>
  );
}

export default App;
