import React, {useEffect, useState} from 'react'
import axios from 'axios'
import configData from '../config/config.json'

const API_URL_USERS = configData.HORARIOPARQUEO_API_URL;

const TablaHorarioParqueo = () => {
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
                <th>DIA DE APERTURA</th>
                <th>DIA DE CIERRE</th>
                <th>HORA DE APERTURA</th>
                <th>HORA DE CIERRE</th>
                <th>ELIMINAR</th>
                </tr>
            </thead>
            <tbody>
                {users.map ((user)=>(
                    <tr key={user.id}>
                        <td>{user.dia_ini}</td>
                        <td>{user.dia_fin}</td>
                        <td>{user.hora_ini}</td>
                        <td>{user.hora_fin}</td>

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

export default TablaHorarioParqueo