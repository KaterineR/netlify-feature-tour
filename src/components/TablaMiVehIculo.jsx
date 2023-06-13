import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import configData from '../config/config.json';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

//const API_URL_VEHICULOS ='http://localhost:8000/api/vehiculos'

const TablaMiVehiculo = () => {
    const [vehiculos, setVehiculos] = useState( [] );
    const API_URL_VEHICULOS = configData.VEHICLIS_API_URL;
    const miId = cookies.get('id');

    useEffect(()=>{
        getAllVehiculo()
    }, [])

    const getAllVehiculo=async()=>{
        const response = await axios.get(`${API_URL_VEHICULOS}/${miId}`);
        setVehiculos(response.data)
    }
  
    const deleteVehiculo=async(id)=>{
        const url=`${API_URL_VEHICULOS}/${id}`;
        await axios.delete(url)
        getAllVehiculo()
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
                <th>IMAGEN VEHICULO</th>
 
                <th>ELIMINAR</th>
                </tr>
            </thead>
            <tbody>
                {vehiculos.map ((vehiculo)=>(
                    <tr key={vehiculo.id}>
                        <td>{vehiculo.modelo}</td>
                        <td>{vehiculo.nro_placa}</td>
                        <td>{vehiculo.descripcion}</td>
                        <td><img src={vehiculo.foto} width="200px"></img></td>
  
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

export default TablaMiVehiculo