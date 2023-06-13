import React, {useEffect, useState} from 'react'
import axios from 'axios'
import configData from '../config/config.json'

const API_URL_USERS = configData.SOLOCLIENTE_API_URL;
const CAPI_URL_USERS = configData.CUSER_API_URL;

const TablaUserClienteSE = () => {
    const [users, setUsers] = useState( [] );

    useEffect(()=>{
        getAllUser()
    }, [])

    const getAllUser=async()=>{
        const response = await axios.get(API_URL_USERS)
        setUsers(response.data)
    }
  
    // const deleteUser=async(id)=>{
    //     const url=`${CAPI_URL_USERS}/${id}`;
    //     await axios.delete(url)
    //     getAllUser()
    // }

  return (
    <div>
    <div>
        <div className='d-grid gap-2'>
        </div>
        <h3 style={{textAlign: "center"}}>Lista de Clientes:</h3>
        <table style={{marginLeft: "10px"}} className='table table-striped'>
            <thead className='bg-primary text-white'>
            <tr style={{backgroundColor: "#0C4D51"}}>
                <th>NOMBRE</th>
                <th>APELLIDO</th>
                <th>DNI</th>
                <th>TELEFONO</th>
                <th>CORREO ELECTRONICO</th>
                <th>FOTO DE PERFIL</th>
                {/* <th>ELIMINAR</th> */}
                </tr>
            </thead>
            <tbody>
                {users.map ((user)=>(
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.apellido}</td>
                        <td>{user.dni}</td>
                        <td>{user.telefono}</td>
                        <td>{user.email}</td>
                        <td><img src={user.foto_perfil} width="200px"></img></td>

                        {/* <td>
                            <button onClick={()=>deleteUser(user.id)} className='btn btn-danger'>Eliminar</button>
                        </td> */}

                    </tr>
                ))}

            </tbody>
        </table>
    </div>
    </div>
  )
}

export default TablaUserClienteSE