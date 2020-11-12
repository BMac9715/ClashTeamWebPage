import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {ProtectedRoute} from './components/protected.route';
import Dashboard from './components/dashboard/dashboard.js';
import Home from './components/home/home.js';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={()=>{
          return(
            <Redirect to="/home"/>
          )
        }}/>
        <Route path="/home" component={Home}/>
        <ProtectedRoute 
          path="/dashboard"
          component={Dashboard}
        />
        <Route path="*" component={()=> "404 NOT FOUND"}/>
      </Switch>      
    </div>
  );
}

export default App;
