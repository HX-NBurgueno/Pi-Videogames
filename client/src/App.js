import "./App.css";
import "prueba"

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Detail from "./components/Detail";
import Form from "./components/Form";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/home/:id">
            <Detail />
          </Route>
          <Route exact path="/create">
            <Form />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
