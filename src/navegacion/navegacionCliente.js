import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const NavegacionCliente = () => {

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
  <a className="navbar-brand fs-4" href="#"> Cliente</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
       
    
    
      
        <li className="nav-item">
          <Link className="nav-link " to='/RegistroBoleta' >Registrar Boleta</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to='/SolicitarSitioParqueo' >Solicitar Sitio de Parqueo</Link>
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

export default NavegacionCliente