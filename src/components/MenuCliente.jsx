import React from "react";
import Cookies from 'universal-cookie';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NavegacionCliente from "../navegacion/navegacionCliente";
import RegistroVehiculo from "../formularios/registrarVehiculo";
import BoletaForm from "../forlumarios2/registrarBoleta";


const cookies = new Cookies();

function Cliente() {

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
      window.location.href='./LoginForm';
    }

    return(
        <>
                    

                <NavegacionCliente/>

              

          

        {/* <button onClick={cerrarSesion}>Cerra Sesion</button> */}
        </>
    );
}
export default Cliente