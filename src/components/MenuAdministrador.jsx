import React from "react";
import NavegacionAdministrador from "../navegacion/navegacionAdministrador";
import SidebarAdministrador from './SidebarAdministrador';
import '../style/MenuAdministrador.css';
import { Route, Routes} from 'react-router-dom';
import RegistroZonasParqueo from "../formularios/registrarZparqueo";


import Cookies from 'universal-cookie';

const cookies = new Cookies();

function MenuAdministrador() {

    const nombre = cookies.get('name');
    const email = cookies.get('email');
    const password = cookies.get('password_confirmed');
    const tipo_usuario = cookies.get('tipo_usuario');

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
      window.location.href='./login';
    }




    return(
        <>
        <SidebarAdministrador/>
        
        <Routes>
            <Route path='/RegistroZonaParqueo' element={<RegistroZonasParqueo/>}/>

        </Routes>
        </>
    );
}
export default MenuAdministrador