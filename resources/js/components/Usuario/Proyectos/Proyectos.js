import React, { Component, useState } from 'react';
import DatePicker , {registerLocale, setDefaultLocale} from 'react-datepicker';
import es from 'date-fns/locale/es';
import Proyecto from './Proyecto';

registerLocale('es', es)

class Proyectos extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }

    }
    render(){
        return this.props.proyectos.map((proyecto) => (
            <Proyecto
                proyecto={proyecto}
                key={proyecto.id}
            />
        ));
        
    }
}
export default Proyectos;