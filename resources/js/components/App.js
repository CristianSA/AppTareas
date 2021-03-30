import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import '../../css/app.css';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from './Index/Index';
import Login from './Login/Login';
import Registro from './Registro/Registro';
import Home from './Home/Home';


export default class App extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path='/' component={Index}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/registro' component={Registro}/>
                    <Route path='/home' component={Home}/>
                </Switch>
            </Router>
        );
    }
}


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
