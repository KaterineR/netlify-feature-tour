import React, {useEffect, useState} from 'react'
import axios from 'axios'
import configData from '../config/config.json'

const API_URL_USERS = configData.ZONAS_API_URL;

const TablaZona = () => {
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
        <h3 style={{textAlign: "center"}}>Lista de Zonas:</h3>
        <table style={{marginLeft: "10px"}} className='table table-striped'>
            <thead className='bg-primary text-white'>
            <tr style={{backgroundColor: "#0C4D51"}}>
                <th>NOMBRE ZONA</th>
                <th>NRO DE SITIOS</th>
                <th>DIRECCION</th>
                <th>DESCRIPCION</th>
                <th>IMAGEN</th>
                <th>ELIMINAR</th>
                </tr>
            </thead>
            <tbody>
                {users.map ((user)=>(
                    <tr key={user.id}>
                        <td>{user.nombre}</td>
                        <td>{user.nro_sitios}</td>
                        <td>{user.direccion}</td>
                        <td>{user.descripcion}</td>
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

export default TablaZona