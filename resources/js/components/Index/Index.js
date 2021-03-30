import React, { Component } from 'react'
import Navba from '../Navbar/Navbar';


class Index extends Component {

  render() {
    return (
       <div className=""> 
          <Navba />       
          <div className="text-center  title">
              <h1 className="h1 display-4 text-white">
                App Tareas
              </h1>
          </div> 
       </div>   
    )
  }

}

export default Index