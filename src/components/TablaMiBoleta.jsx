import React, {useEffect, useState} from 'react'
import axios from 'axios'
import configData from '../config/config.json'
import Cookies from 'universal-cookie';
import VistaComprobante from './VistaComprobante';
import ComprobantePdf from './ComprobantePdf';
import { PDFViewer } from '@react-pdf/renderer';

const cookies = new Cookies();

const API_URL_BOLETAS = configData.MISBOLCLI_API_URL;
const API_URL_BOLETAS2 =configData.BOLETACLIENTE_API_URL;

const TablaMiBoleta = () => {
    const [boletas, setBoletas] = useState( [] );
    const miId = cookies.get('id');
    const [miboleta, setMiboleta] = useState( [] );

    const [verComprobante, setVerComprobante] = useState(false);
    const [verPdf, setVerPdf] = useState(false);

    useEffect(()=>{
        getAllBoleta()
    }, [])

    const getAllBoleta=async()=>{
        const response = await axios.get(`${API_URL_BOLETAS}/${miId}`)
        setBoletas(response.data)
    }
  
    const verFactura=async(id)=>{
        const url=`${API_URL_BOLETAS2}/${id}`;
        const response = await axios.get(url)
        setMiboleta(response.data[0]);
    }

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
        <h3 style={{textAlign: "center"}}>Mis Boletas:</h3>
        <table style={{marginLeft: "10px", marginRight: "10px"}} className='table table-striped'>
            <thead className='bg-primary text-white'>
            <tr style={{backgroundColor: "#0C4D51"}}>
                <th>MENSUALIDAD</th>
                <th>MONTO</th>
                <th>NRO TRANSACCION</th>
                <th>FECHA DEPOSITO</th>
                <th>NOMBRE</th>
                <th>APELLIDO</th>
                <th>CORREO ELECTRONICO</th>
                <th>ESTADO</th>
                <th>IMAGEN</th>
                <th>FACTURA</th>
                <th>PDF</th>
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
                        <td>{tipoboleta(boleta.estado)}</td>
                        <td><img src={boleta.foto_comprobante} width="200px"></img></td>

                        {boleta.estado == 1 || boleta.estado == 5 ?
                            <><td>
                            <button onClick={()=>{
                                verFactura(boleta.id);
                                setVerComprobante(true);
                                setVerPdf(false);
                                }} className='btn btn-danger'>
                                    Ver Factura
                                </button>
                        </td>
                        <td>
                            <button onClick={()=>{
                                verFactura(boleta.id);
                                setVerComprobante(false);
                                setVerPdf(true);
                                }} className='btn btn-danger'>Descargar Factura</button>
                        </td>
                        </>
                        : null
                        }

                    </tr>
                ))}

            </tbody>
        </table>
        {miboleta ? 
        <>
        {verComprobante? <VistaComprobante boletas= {miboleta}/> : null}
        {verPdf ? (
            <PDFViewer style={{width:"100%", height:"90vh"}}>
                <ComprobantePdf boletas= {miboleta}/>
            </PDFViewer>
        ) : null}
        </>
        : null}
    </div>
    </div>
  )
}

export default TablaMiBoleta