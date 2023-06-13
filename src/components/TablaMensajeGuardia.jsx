import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import configData from '../config/config.json'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const API_URL_USERS = configData.MENSGUARDIA_API_URL;
const API_URL_GLOBAL = configData.MENSGLOBAL_API_URL;
const API_URL_INDI = configData.MENSCLIENTE_API_URL;

const TablaMensajeGuardia = () => {
    const [users, setUsers] = useState( [] );
    const [globals, setGlobals] = useState( [] );
    const [indiv, setIndiv] = useState( [] );
    const miId = cookies.get('id');

    useEffect(()=>{
        getAllUser()
        getAllGlobal()
        getMenInd()
    }, [])

    const getAllUser=async()=>{
        const response = await axios.get(API_URL_USERS)
        setUsers(response.data)
    }
    const getAllGlobal=async()=>{
        const response = await axios.get(API_URL_GLOBAL)
        setGlobals(response.data)
    }
    const getMenInd=async()=>{
        const url = `${API_URL_INDI}/${miId}`;
        const response = await axios.get(url)
        setIndiv(response.data)
    }

    function tipocargo(props){
        var usu = props;
        var resul = '';
        switch (usu){
        case 0 :
            resul = "ADMINISTRADOR"
             return resul;
        case 1 :
            resul = "OPERADOR"
            return resul;
        case 2 :
            resul = "GUARDIA"
            return resul;
        case 3 :
            resul = "USUARIO COMUN"
            return resul;
        case 4 :
            resul = "CLIENTE"
            return resul;   
        default :
            resul = "NO DEFINIDO"
            return resul;
      }
    }

  return (
    <div>
    <div>
        <div className='d-grid gap-2'>
        </div>
        <h3 style={{textAlign: "center"}}>Lista de Mensajes:</h3>
        <table style={{marginLeft: "10px"}} className='table table-striped'>
            <thead className='bg-primary text-white'>
            <tr style={{backgroundColor: "#0C4D51"}}>
                <th>RECIBIDO EL:</th>
                <th>ASUNTO</th>
                <th>MENSAJE</th>
                <th>CARGO EMISOR</th>
                <th>NOMBRE EMISOR</th>
                <th>APELLIDO EMISOR</th>

                </tr>   
            </thead>
            <tbody>
                {users.map ((user)=>(
                    <tr key={user.id}>
                        <td>{user.created_at}</td>
                        <td>{user.asunto}</td>
                        <td>{user.mensaje}</td>
                        <td>{tipocargo(user.tipo_usuario)}</td>
                        <td>{user.name}</td>
                        <td>{user.apellido}</td>

                    </tr>
                ))}
                {globals.map ((user)=>(
                    <tr key={user.id}>
                        <td>{user.created_at}</td>
                        <td>{user.asunto}</td>
                        <td>{user.mensaje}</td>
                        <td>{tipocargo(user.tipo_usuario)}</td>
                        <td>{user.name}</td>
                        <td>{user.apellido}</td>

                    </tr>
                ))}
                {indiv.map ((user)=>(
                    <tr key={user.id}>
                        <td>{user.created_at}</td>
                        <td>{user.asunto}</td>
                        <td>{user.mensaje}</td>
                        <td>{tipocargo(user.tipo_usuario)}</td>
                        <td>{user.name}</td>
                        <td>{user.apellido}</td>

                    </tr>
                ))}

            </tbody>
        </table>
    </div>
    </div>
  )
}

export default TablaMensajeGuardia