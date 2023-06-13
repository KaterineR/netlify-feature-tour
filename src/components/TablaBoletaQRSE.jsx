import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import configData from '../config/config.json'

const API_URL_BOLETAS = configData.BOLETAQRS_API_URL;
const API_URL_BOLETAS2 = configData.BOLETAS_API_URL;

const TablaBoletaQRSE = () => {
    const [boletas, setBoletas] = useState( [] );

    useEffect(()=>{
        getAllBoleta()
    }, [])

    const getAllBoleta=async()=>{
        const response = await axios.get(API_URL_BOLETAS)
        setBoletas(response.data)
    }
  
    // const deleteBoleta=async(id)=>{
    //     const url=`${API_URL_BOLETAS2}/${id}`;
    //     await axios.delete(url)
    //     getAllBoleta()
    // }
    function tipoboleta(props){
        var usu = props;
        var resul = '';
        switch (usu){
        case 0 :
            resul = "PENDIENTE"
             return resul;
        case 1 :
            resul = "ACEPTADA"
            return resul;
        case 2 :
            resul = "RECHAZADA"
            return resul;
        case 3 :
            resul = "BOLETA MANUAL"
            return resul;  
        case 4 :
            resul = "BOLETA QR PENDIENTE"
            return resul; 
        case 5 :
            resul = "BOLETA QR ACEPTADA"
            return resul; 
        case 6 :
            resul = "BOLETA QR RECHAZADA"
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
        <h3 style={{textAlign: "center"}}>Lista de Boletas Por QR:</h3>
        <table style={{marginLeft: "10px"}} className='table table-striped'>
            <thead className='bg-primary text-white'>
            <tr style={{backgroundColor: "#0C4D51"}}>
                <th>MENSUALIDAD</th>
                <th>MONTO</th>
                <th>NRO TRANSACCION</th>
                <th>FECHA DEPOSITO</th>
                <th>NOMBRE</th>
                <th>APELLIDO</th>
                <th>CORREO ELECTRONICO</th>
                <th>IMAGEN</th>
                <th>ESTADO</th>
                {/* <th>ELIMINAR</th> */}
                </tr>
            </thead>
            <tbody>
                {boletas.map ((boleta)=>(
                    <tr key={boleta.id}>
                        <td>{boleta.mensualidad}</td>
                        <td>{boleta.monto}</td>
                        <td>{boleta.nro_transaccion}</td>
                        <td>{boleta.fecha_deposito}</td>
                        <td>{boleta.name}</td>
                        <td>{boleta.apellido}</td>
                        <td>{boleta.email}</td>
                        <td><img src={boleta.foto_comprobante} width="200px"></img></td>
                        <td>{tipoboleta(boleta.estado)}</td>    

                        {/* <td>
                            <button onClick={()=>deleteBoleta(boleta.id)} className='btn btn-danger'>Eliminar</button>
                        </td> */}

                    </tr>
                ))}

            </tbody>
        </table>
    </div>
    </div>
  )
}

export default TablaBoletaQRSE