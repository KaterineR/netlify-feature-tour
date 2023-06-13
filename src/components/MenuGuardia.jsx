import React from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function MenuGuardia() {

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
      window.location.href='./';
    }

    return(
        <>
        <h2>Menu Guardia</h2>
        <h3>{nombre}</h3>
        <h3>{email}</h3>
        <h3>{password}</h3>
        <h3>Tipo de Usuario: {tipo_usuario}</h3>

        <button onClick={cerrarSesion}>Cerra Sesion</button>
        </>
    );
}
export default MenuGuardia