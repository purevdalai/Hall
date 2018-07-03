import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Edit from './components/App';
import Old from './componentsOld/App';
class App extends Component {
    render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Edit} />
          </Switch>
        </BrowserRouter>);
    }
  }
  
  export default App;