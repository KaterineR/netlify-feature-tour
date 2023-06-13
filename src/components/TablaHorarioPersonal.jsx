import React, {useEffect, useState} from 'react'
import axios from 'axios'
import configData from '../config/config.json'

const API_URL_USERS = configData.HORARIOPERSONAL_API_URL;

const TablaHorarioPersonal = () => {
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
        <h3 style={{textAlign: "center"}}>Lista de Horarios del Personal:</h3>
        <table style={{marginLeft: "10px"}} className='table table-striped'>
            <thead className='bg-primary text-white'>
            <tr style={{backgroundColor: "#0C4D51"}}>
                <th>NOMBRE HORARIO</th>
                <th>HORA DE INICIO</th>
                <th>HORA DE SALIDA</th>
                <th>ELIMINAR</th>
                </tr>
            </thead>
            <tbody>
                {users.map ((user)=>(
                    <tr key={user.id}>
                        <td>{user.nombre}</td>
                        <td>{user.inicio_turno}</td>
                        <td>{user.salida_turno}</td>

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

export default TablaHorarioPersonal