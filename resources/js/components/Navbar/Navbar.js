import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Navba extends Component{
    constructor(props){
      super(props);
    }
    logout(e){
       e.preventDefault();  
       axios.post('http://127.0.0.1:8000/api/logout')
          .then(response=> {
            this.props.history.push('/');
          })
          .catch(error=> {
            console.log(error);
          });
    }
    handleClick(e){
        e.preventDefault();
        this.props.history.push('/');
    }
    render(){
        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        if(token){
            window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
        }else{
            console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
        }
        if(this.props.link){
            const {name, email} = this.props.location.state.user;
            return(
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand text-white" href="#">App Tareas</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon text-white"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <form onSubmit={this.logout.bind(this)} method="POST">
                                    <input type="hidden" name="_token" value={token}/>
                                    <button type="submit" className="btn btn-sm btn-danger">
                                        {this.props.link}
                                    </button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand text-white" href="#">App Tareas</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon text-white"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/registro">Register</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default withRouter(Navba);