import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navba from '../Navbar/Navbar';
import axios from 'axios';

class Registro extends Component{
    constructor(props){
        super(props);
        this.state = {
            registroUsuarioData:{
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                token: ""
            }
        };
    }
    registrarUsuario(e){
        e.preventDefault();
        const {name, email, password, password_confirmation, token} = this.state.registroUsuarioData;
        axios.post('http://127.0.0.1:8000/api/registro', {name, email, password, token})
        .then((response) => {
            this.props.history.push({
                pathname: 'home',
                state: response.data
            })
        })
    }
    render(){
        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        if(token){
            window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
        }else{
            console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
        }
        return(
            <div className="registro">
                <Navba/>
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-2">
                        <div className="card bg-dark border-light">
                            <div className="card-header bg-blue-especial">
                                <h3 className="text-white">
                                    Registro
                                </h3>
                            </div>

                            <div className="card-body">
                                <form onSubmit={this.registrarUsuario.bind(this)} role="form" method="POST" className="form-horizontal" autoComplete="false">
                                    <input type="hidden" name="_token" value={token}/>
                                    <div className="form-group">
                                        <label className="text-white">Name</label>
                                        <input type="text" name="name" className="form-control" value={this.state.registroUsuarioData.name || ''}
                                            onChange={(e) => {
                                                let registroUsuarioData = this.state
                                                registroUsuarioData.name = e.target.value
                                                this.setState({registroUsuarioData});
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-white">Email</label>
                                        <input type="email" name="email" className="form-control" value={this.state.registroUsuarioData.email || ''}
                                            onChange={(e) => {
                                                let registroUsuarioData = this.state
                                                registroUsuarioData.email = e.target.value
                                                this.setState({registroUsuarioData});
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-white" >Password</label>
                                        <input type="password" name="password" className="form-control" value={this.state.registroUsuarioData.password || ''}
                                            onChange={(e) => {
                                                let registroUsuarioData = this.state
                                                registroUsuarioData.password = e.target.value
                                                this.setState({registroUsuarioData});
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-white">Password Confirmation</label>
                                        <input type="password" name="password_confirmation" className="form-control" value={this.state.registroUsuarioData.password_confirmation || ''}
                                            onChange={(e) => {
                                                let registroUsuarioData = this.state
                                                registroUsuarioData.password_confirmation = e.target.value
                                                this.setState({registroUsuarioData});
                                            }}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Register
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Registro;