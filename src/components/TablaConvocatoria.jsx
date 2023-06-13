import React, {useEffect, useState} from 'react'
import axios from 'axios'
import configData from '../config/config.json'

const API_URL_USERS = configData.CONVOCATORIA_API_URL;

const TablaConvocatoria = () => {
    const [users, setUsers] = useState( [] );

    useEffect(()=>{
        getAllUser()
    }, [])

    const getAllUser=async()=>{
        const response = await axios.get(API_URL_USERS)
        setUsers(response.data)
    }
  
    const deleteUser=async(id)=>{
        const url=`${API_URL_USERS}/${id}`;
        await axios.delete(url)
        getAllUser()
    }

  return (
    <div>
    <div>
        <div className='d-grid gap-2'>
        </div>
        <h3 style={{textAlign: "center"}}>Lista de Convocatorias:</h3>
        <table style={{marginLeft: "10px"}} className='table table-striped'>
            <thead className='bg-primary text-white'>
                <tr style={{backgroundColor: "#0C4D51"}}>
                <th>NOMBRE DEL PARQUEO</th>
                <th>NOMBRE DEL BANCO</th>
                <th>NRO CUENTA BANCO</th>
                <th>FECHA INICIO</th>
                <th>FECHA FIN</th>
                <th>PRECIO DE MENSUALIDAD</th>
                <th>DESCUENTO 3 MESES</th>
                <th>DESCUENTO 12 MESES</th>
                <th>MULTA</th>
                <th>QR</th>
                <th>ELIMINAR</th>
                </tr>
            </thead>
            <tbody>
                {users.map ((user)=>(
                    <tr key={user.id}>
                        <td>{user.nombre}</td>
                        <td>{user.nombre_banco}</td>
                        <td>{user.cuenta_banco}</td>                        
                        <td>{user.fecha_ini_solicitud}</td>
                        <td>{user.fecha_fin_solicitud}</td>
                        <td>{user.precio_mensual}</td>
                        <td>{user.descuento3meses}</td>
                        <td>{user.descuento12meses}</td>
                        <td>{user.multa}</td>
                        <td><img src={user.imagen} width="200px"></img></td>

                        <td>
                            <button onClick={()=>deleteUser(user.id)} className='btn btn-danger'>Eliminar</button>
                        </td>

                    </tr>
                ))}

            </tbody>
        </table>
    </div>
    </div>
  )
}

export default TablaConvocatoria