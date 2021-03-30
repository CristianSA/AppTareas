import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navba from '../Navbar/Navbar';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginUsuarioData: {
                email: "",
                password: "",
                token: ""
            }
        };
    }
    validarUsuario(e){
        e.preventDefault();
        const {email, password, token} = this.state.loginUsuarioData;
        axios.post('http://127.0.0.1:8000/api/login',{email, password, token})
        .then((response) => {
            console.log(response);
            if(response.data.status){
                this.props.history.push({
                    pathname: 'home',
                    state: { user: response.data.usuario_data}
                })
            }else{
                console.log('No autenticated');
            }
            /* return this.props.history.push("home"); */
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
            <div className="login">
                <Navba />
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-2">
                        <div className="card bg-dark border-light">
                            <div className="card-header text-center bg-blue-especial">
                                <h3 className="text-white">Login</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.validarUsuario.bind(this)} role="form" method="POST" className="form-horizontal">
                                    <input type="hidden" name="_token" value={token}/>
                                    <div className="form-group">
                                        <label className="text-white">Email</label>
                                        <input type="email" name="email" className="form-control" value={this.state.loginUsuarioData.email}
                                            onChange={(e) => {
                                                let {loginUsuarioData} = this.state
                                                loginUsuarioData.email = e.target.value
                                                this.setState({loginUsuarioData})
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-white">Contraseña</label>
                                        <input type="password" name="password" className="form-control" value={this.state.loginUsuarioData.password}
                                            onChange={(e) => {
                                                let {loginUsuarioData} = this.state
                                                loginUsuarioData.password = e.target.value
                                                this.setState({loginUsuarioData})
                                            }}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Login
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
export default Login;