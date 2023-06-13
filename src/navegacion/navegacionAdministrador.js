import React from 'react'
import { Link } from 'react-router-dom'

import Cookies from 'universal-cookie';

const cookies = new Cookies();
const NavegacionAdministrador = () => {

  const cerrarSesion =()=>{

    //remueve los datos de cookies
  cookies.remove('id', {path: "/"});
  cookies.remove('name', {path: "/"});
  cookies.remove('apellido', {path: "/"});
  cookies.remove('dni', {path: "/"});
  cookies.remove('foto_perfil', {path: "/"});
  cookies.remove('telefono', {path: "/"});
  cookies.remove('direccion', {path: "/"});
  cookies.remove('email', {path: "/"});
  cookies.remove('password_confirmed', {path: "/"});
  cookies.remove('tipo_usuario', {path: "/"});
  cookies.remove('cargo', {path: "/"});
  cookies.remove('departamento', {path: "/"});
  cookies.remove('sitio', {path: "/"});
  cookies.remove('primer_ini_sesion', {path: "/"});
  cookies.remove('solicitud_parqueo', {path: "/"});
  cookies.remove('id_zona', {path: "/"});
  cookies.remove('id_horario', {path: "/"});

  //redirecciona a App.js
  //window.location.href='./MenuPrincipal';
}




    return (
      <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark" >
    <div className="container-fluid">
    <a className="navbar-brand fs-4" href="#">Administrador </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          

           {/* <li className="nav-item">
            <Link className="nav-link"to='/FormularioRegistroPerso'>Registrar Datos Del Personal</Link>
          </li>
          
       
          <li className="nav-item">
            <Link className="nav-link " to='/RegistroZonasParqueo' >Registrar Zonas de Parqueo</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to='/RegistroH' >Registrar de Horarios</Link>
          </li> */}
  
          <li className="nav-item">
            <Link className="nav-link " to='/RegistroHorarioParqueo'>Registrar Horario Parqueo</Link>
          </li>
       
          <li className="nav-item">
            <Link className="nav-link " to='/RegistroBoletaManual' >Registro Pago Efectivo</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to='/SolicitudBoleta' >Solicitud de Boletas</Link>
          </li> 
          <li className="nav-item">
            <Link className="nav-link " to='/Convocatoria' >Datos de Convocatoria</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to='/ListaUsuarios' >Lista de Usuarios</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to='/RegistroPersonal' >Registro de Personal</Link>
          </li>
          <li className="nav-item">
            <Link onClick={cerrarSesion} className="nav-link " to='/MenuPrincipal' >CerrarSesion</Link>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
      
      </>
    )
  }
  
  export default NavegacionAdministrador