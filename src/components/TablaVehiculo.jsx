import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import configData from '../config/config.json';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

//const API_URL_VEHICULOS ='http://localhost:8000/api/vehiculos'

const TablaVehiculo = () => {
    const [vehiculos, setVehiculos] = useState( [] );
    const API_URL_VEHICULOS = configData.VEHICLIS_API_URL;
    const API_URL_VEHICULO = configData.VEHICULOS_API_URL;

    const tipou = cookies.get('tipo_usuario');
    const [admin, setAdmin] = useState(true);

    useEffect(()=>{
        getAllVehiculo()
        tipousuario()
        // console.log(admin);
        // console.log(tipou); 
    }, [])

    const getAllVehiculo=async()=>{
        const response = await axios.get(API_URL_VEHICULOS)
        setVehiculos(response.data)
    }
  
    const deleteVehiculo=async(id)=>{
        const url=`${API_URL_VEHICULO}/${id}`;
        await axios.delete(url)
        getAllVehiculo()
    }

    const tipousuario=()=>{
      switch (tipou){
        case 0 :
            setAdmin(true);  
            break;
        case 1 :
            setAdmin(false);  
             break;
        case 2 :
            setAdmin(false);  
            break; 
        case 3 :
            setAdmin(false);  
            break;
        case 4 :
            setAdmin(false);  
            break;    
        default :
            setAdmin(false);  
          break; 
      }
    }

  return (
    <div>
    <div>
        <div className='d-grid gap-2'>
        </div>
        <h3 style={{textAlign: "center"}}>Lista de Vehiculos:</h3>
        <table style={{marginLeft: "10px"}} className='table table-striped'>
            <thead className='bg-primary text-white'>
            <tr style={{backgroundColor: "#0C4D51"}}>
                <th>MODELO</th>
                <th>NRO_PLACA</th>
                <th>DESCRIPCION</th>
                <th>NOMBRE</th>
                <th>APELLIDO</th>
                <th>CORREO ELECTRONICO</th>
                <th>IMAGEN VEHICULO</th>
                {/* {admin ?
                : null} */}
                <th>ELIMINAR</th> 
                </tr>
            </thead>
            <tbody>
                {vehiculos.map ((vehiculo)=>(
                    <tr key={vehiculo.id}>
                        <td>{vehiculo.modelo}</td>
                        <td>{vehiculo.nro_placa}</td>
                        <td>{vehiculo.descripcion}</td>
                        <td>{vehiculo.name}</td>
                        <td>{vehiculo.apellido}</td>
                        <td>{vehiculo.email}</td>
                        <td><img src={vehiculo.foto} width="200px"></img></td>
                        {/* {admin ? 
                        : null
                    } */}
                        <td>
                            <button onClick={()=>deleteVehiculo(vehiculo.id)} className='btn btn-danger'>Eliminar</button>
                        </td>
                        
                    </tr>
                ))}

            </tbody>
        </table>
    </div>
    </div>
  )
}

export default TablaVehiculo