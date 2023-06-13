import React, {useEffect, useState} from 'react'
import axios from 'axios'
import configData from '../config/config.json'
import Cookies from 'universal-cookie';
import VistaComprobanteManual from './VistaComprobanteManual';
import ComprobantePdfManual from './ComprobantePdfManual';
import { PDFViewer } from '@react-pdf/renderer';

const cookies = new Cookies();

const API_URL_BOLETAS = configData.BOLETAMANUAL_API_URL;
const API_URL_BOLETAS2 = configData.BOLETACLIENTE_API_URL;

const TablaBoletaManual = () => {
    const [boletas, setBoletas] = useState( [] );
    const miId = cookies.get('id');
    const [miboleta, setMiboleta] = useState( [] );

    const [verComprobante, setVerComprobante] = useState(false);
    const [verPdf, setVerPdf] = useState(false);

    useEffect(()=>{
        getAllBoleta()
    }, [])

    const getAllBoleta=async()=>{
        const response = await axios.get(API_URL_BOLETAS)
        setBoletas(response.data)
    }
  
    const verFactura=async(id)=>{
        const url=`${API_URL_BOLETAS2}/${id}`;
        const response = await axios.get(url)
        setMiboleta(response.data[0]);
    }

    function solofecha(props){
        var fechac = props;
        var sfecha = fechac.substring(0,10);
        return sfecha;
    }

  return (
    <div>
    <div>
        <div className='d-grid gap-2'>
        </div>
        <h3 style={{textAlign: "center"}}>Boletas Registradas Manualmente:</h3>
        <table style={{marginLeft: "10px", marginRight: "10px"}} className='table table-striped'>
            <thead className='bg-primary text-white'>
            <tr style={{backgroundColor: "#0C4D51"}}>
                <th>MENSUALIDAD</th>
                <th>MONTO</th>
                <th>FECHA DE PAGO</th>
                <th>NOMBRE</th>
                <th>APELLIDO</th>
                <th>CORREO ELECTRONICO</th>
                <th>FACTURA</th>
                <th>PDF</th>
                </tr>
            </thead>
            <tbody>
                {boletas.map ((boleta)=>(
                    <tr key={boleta.id}>
                        <td>{boleta.mensualidad}</td>
                        <td>{boleta.monto}</td>
                        <td>{solofecha(boleta.created_at)}</td>
                        <td>{boleta.name}</td>
                        <td>{boleta.apellido}</td>
                        <td>{boleta.email}</td>

                        <td>
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

                    </tr>
                ))}

            </tbody>
        </table>
        {miboleta ? 
        <>
        {verComprobante? <VistaComprobanteManual boletas= {miboleta}/> : null}
        {verPdf ? (
            <PDFViewer style={{width:"100%", height:"90vh"}}>
                <ComprobantePdfManual boletas= {miboleta}/>
            </PDFViewer>
        ) : null}
        </>
        : null}
    </div>
    </div>
  )
}

export default TablaBoletaManual