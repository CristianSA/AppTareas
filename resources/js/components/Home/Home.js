import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navba from '../Navbar/Navbar';
import Perfil from '../Usuario/Perfil/Perfil';
import Proyectos from '../Usuario/Proyectos/Proyectos';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import DatePicker , {registerLocale, setDefaultLocale} from 'react-datepicker';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import es from 'date-fns/locale/es';
import {format} from 'date-fns';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            usuarioData: this.props.location.state,
            usuarioProyectos: [],
            nuevoProyectoData: {
                titulo: "",
                descripcion: "",
                sprints: "",
                estado: false,//Por defecto
                fecha_inicio: format(new Date(), 'yyyy-MM-dd'), //Por defecto
                fecha_fin: "",
                token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            nuevoProyectoModal: false,
            fecha_inicio: new Date(),
            fecha_fin: new Date()
        }
        this.manejarCambioFechaInicio = this.manejarCambioFechaInicio.bind(this);
        this.manejarCambioFechaFin = this.manejarCambioFechaFin.bind(this);
    }
    usuarioProyectos(){
        const {id} = this.state.usuarioData;
        axios.get('http://127.0.0.1:8000/api/proyectos/'+id)
        .then((response) => {
            this.setState({
                usuarioProyectos: response.data
            })
        })
    }
    componentDidMount(){
        this.usuarioProyectos();
    }
    toggleNuevoProyectoModal(){
        this.setState({
            nuevoProyectoModal: !this.state.nuevoProyectoModal
        })
    }
    manejarCambioFechaInicio(date){
        let {nuevoProyectoData} = this.state
        nuevoProyectoData.fecha_inicio = format(date, 'yyyy-MM-dd')
        this.setState({nuevoProyectoData})
    }
    manejarCambioFechaFin(date){
        let {nuevoProyectoData} = this.state
        nuevoProyectoData.fecha_fin = format(date, 'yyyy-MM-dd')
        this.setState({nuevoProyectoData})
        console.log(nuevoProyectoData);
    }
    nuevoProyecto(e){
        e.preventDefault();
        const {id} = this.state.usuarioData;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const {titulo, descripcion, sprints, estado,fecha_inicio, fecha_fin, token} = this.state.nuevoProyectoData; 
        axios.post('http://127.0.0.1:8000/api/proyecto/nuevo/'+id, {titulo, descripcion, sprints, estado, fecha_inicio, fecha_fin})
        .then((response) => {
            let {usuarioProyectos} = this.state;
            this.usuarioProyectos();
            this.setState({usuarioProyectos, nuevoProyectoModal: false, nuevoProyectoData:{
                titulo: "",
                descripcion: "",
                sprints: "",
                estado: false,//Por defecto
                fecha_inicio: format(new Date(), 'yyyy-MM-dd'), //Por defecto
                fecha_fin: "",
                token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }})
            
        })
    }
    render(){
        const {id, name, email} = this.state.usuarioData;
        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        if(token){
            window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
        }else{
            console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
        }
        return(
            <div className="home container-fluid">
                <Navba link="Logout" />  
                <div className="row">
                    <div className="col-12 col-md-12">
                        <div className="card bg-dark border-light">
                            <div className="card-header border-light">
                                <h4 className="card-title text-white">Dashboard</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-md-12 text-right">
                                        <button className="btn btn-success btn-sm" type="button" onClick={this.toggleNuevoProyectoModal.bind(this)}>
                                            Nuevo proyecto
                                        </button>
                                    </div>
                                </div>
                                <Modal isOpen={this.state.nuevoProyectoModal} toggle={this.toggleNuevoProyectoModal.bind(this)}>
                                    <ModalHeader toggle={this.toggleNuevoProyectoModal.bind(this)}>
                                        Nuevo proyecto
                                    </ModalHeader>
                                    <ModalBody>
                                        
                                            <FormGroup>
                                                <Label for="titulo">
                                                    Título
                                                </Label>
                                                <Input id="titulo"
                                                    value={this.state.nuevoProyectoData.titulo} name="titulo"
                                                    onChange={(e) => {
                                                        let {nuevoProyectoData} = this.state
                                                        nuevoProyectoData.titulo = e.target.value
                                                        this.setState({nuevoProyectoData})
                                                    }}
                                                >
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="descripcion">
                                                    Descripcion
                                                </Label>
                                                <Input id="descripcion" type="textarea" name="descripcion"
                                                    value={this.state.nuevoProyectoData.descripcion}
                                                    onChange={(e) => {
                                                        let {nuevoProyectoData} = this.state
                                                        nuevoProyectoData.descripcion = e.target.value
                                                        this.setState({nuevoProyectoData})
                                                    }}
                                                >
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="sprints">
                                                    Nº Sprints
                                                </Label>
                                                <Input id="sprints" type="textarea" name="sprints"
                                                    value={this.state.nuevoProyectoData.sprints}
                                                    name="sprints"
                                                    type="number"
                                                    onChange={(e) => {
                                                        let {nuevoProyectoData} = this.state
                                                        nuevoProyectoData.sprints = e.target.value
                                                        this.setState({nuevoProyectoData})
                                                    }}
                                                >
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="estado">
                                                    Estado
                                                </Label>
                                                <BootstrapSwitchButton
                                                    checked={false}
                                                    onlabel='Publicar'
                                                    onstyle='success'
                                                    offlabel='No publicar'
                                                    offstyle='danger'
                                                    style='w-100'
                                                    value={false}
                                                    onChange={(e) => {
                                                        let {nuevoProyectoData} = this.state
                                                        nuevoProyectoData.estado = e ? true : false
                                                        this.setState({
                                                            nuevoProyectoData
                                                        })
                                                    }}
                                                    name='estado'
                                                />

                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="fecha_inicio">
                                                    Fecha inicio
                                                </Label>
                                                <br/>
                                                <DatePicker
                                                    locale="es"
                                                    selected={ this.state.fecha_inicio }
                                                    onChange={ this.manejarCambioFechaInicio }
                                                    name="fecha_inicio"
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="fecha_fin">
                                                    Fecha fin
                                                </Label>
                                                <br/>
                                                <DatePicker
                                                    locale="es"
                                                    selected={ this.state.fecha_fin }
                                                    onChange={ this.manejarCambioFechaFin }
                                                    name="fecha_fin"
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </FormGroup>
                                    </ModalBody>
                                    <ModalFooter>
                                        <button className="btn btn-success btn-block" onClick={this.nuevoProyecto.bind(this)}>
                                            Crear proyecto
                                        </button>
                                        <button className="btn btn-danger btn-block" onClick={this.toggleNuevoProyectoModal.bind(this)}>
                                            Cancelar
                                        </button>
                                    </ModalFooter>
                                </Modal>
                                <div className="row">
                                    <div className="col-12 col-md-12">
                                        <h4 className="text-white">
                                            Mis proyectos
                                        </h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <Proyectos
                                        proyectos={this.state.usuarioProyectos}
                                        usuario_id={id}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;