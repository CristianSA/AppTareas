import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import 'moment/locale/es';
import '../../../../css/app.css';

class Proyecto extends Component{
    
    render(){
        const {proyecto} = this.props;
        return (
            <div className="col-12 col-sm-6 col-xl-3 mt-2 mb-2">
                <div className="card-group">
                    <div className="card bg-secondary border-white">
                        <div className="card-header bg-blue-especial border-light">
                            <div className="row">
                                <div className="col-12 col-md-8">
                                    <h5 className="card-title text-white">
                                        {proyecto.titulo}
                                    </h5>
                                </div>
                                <div className="col-12 col-md-4">
                                    <button className="btn btn-primary btn-sm ml-1 float-right">
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </button>
                                    <button className={proyecto.estado ? "btn btn-danger btn-sm float-right opacity-5 cursor-default" : "btn btn-danger btn-sm float-right"}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-md-12">
                                    <h6 className="font-weight-bold text-white">
                                        Descripción:
                                    </h6>
                                    <p className="text-white">
                                        {proyecto.descripcion}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-12">
                                    <span className={proyecto.estado ? "badge bg-success text-white" : "badge bg-danger text-white"}>
                                        {proyecto.estado ? "Publicado" : "No publicado"}
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col12 col-md-12">
                                    <span className="badge bg-warning text-white">
                                        Creado hace &nbsp;
                                        <Moment
                                            fromNow
                                            ago
                                        >
                                            {proyecto.created_at}
                                        </Moment>
                                        &nbsp;
                                        <FontAwesomeIcon icon={faClock}/>
                                    </span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Proyecto;