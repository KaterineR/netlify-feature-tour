import React, { useState, useEffect } from 'react';
import { Form, Button , Modal} from 'react-bootstrap';
import axios from 'axios'
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import {subirImagen} from '../firebase/config';
import configData from '../config/config.json';

const cookies = new Cookies();
const URL_CONVOCATARIA = configData.CONVOCATORIA_API_URL;
const URL_BOLETA = configData.BOLETAS_API_URL;
const URL_IMAGENSTORAGE = configData.IMAGENSTORAGE_API_URL;

function BoletaFormQR() {
  const [formData, setFormData] = useState({
    mesesPagar: '',
    numeroTransaccion: '',
    costoMensualida: '',
    fecha: '',
    imagen: null
  });

  const iduser = cookies.get('id');
  
  const min = 111111111;
  const max = 999999999;
  const nfactura = Math.floor(Math.random()*(max-min+1)+min);
  
  const [fileUrl, setFileUrl] = useState('');


  const [ultimaConv, setUltimaConv] = useState([]);
  useEffect(() => {
    axios
      .get(URL_CONVOCATARIA)
      .then((response) => {
        var ult = response.data[response.data.length -1];
        setUltimaConv(ult);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch(URL_CONVOCATARIA)
      .then(response => response.json())
      .then(data => {
        let precioMe = parseInt(ultimaConv.precio_mensual);
        let descuento = parseInt(ultimaConv.descuento3meses);
        let descuento12 = parseInt(ultimaConv.descuento12meses);

        let mesesPagar = parseInt(formData.mesesPagar);
        let costoTotal = isNaN(mesesPagar) ? 0 : precioMe * mesesPagar;

        if (formData.mesesPagar > 3 && formData.mesesPagar < 12 ) {
          costoTotal -= descuento;
        } else if (formData.mesesPagar > 11) {
          costoTotal -= descuento12;
        }
  
        setFormData(prevState => ({
          ...prevState,
          costoMensualida: costoTotal
        }));
      })
      .catch(error => console.error(error));
  }, [formData.mesesPagar]);
  
  const handleMesesPagarChange = event => {
    const mesesPagar = event.target.value;
    setFormData(prevState => ({
      ...prevState,
      mesesPagar
    }));
  };

  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {  
    setShowModal(true);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    let value = event.target.type === 'file' ? event.target.files[0] : event.target.value;
  
    if (name === 'numeroTransaccion') {
      // Eliminar cualquier carácter que no sea un dígito
      value = value.replace(/\D/g, '');
  
      // Limitar la longitud del número de transacción entre 6 y 10 dígitos
      value = value.slice(0, 10);
    }
    if (name === 'fecha') {
      const currentDate = new Date().toISOString().split('T')[0];
      if (value > currentDate) {
        // Si la fecha seleccionada es posterior a la fecha actual,
        // se establece la fecha actual como valor
        value = currentDate;
      }
    }
  setFormData({
    ...formData,
    [name]: value
    });
  };
  //subida imagen
  const initialValues ={
    file:null,
    nombre: ''
  }
  const [archivo, setArchivo] = useState(initialValues);
  //fin subida imagen

  const handleSubmit = async (event) => {
    event.preventDefault();
    //firebase
    // try {
    //   const url = await subirImagen(file);
    //   setFileUrl(url);
    //   console.log(url);
    // } catch (error) {
    //   console.error(error);
    // }

    //localstorage
    const fd = new FormData();
    fd.append('file', archivo.file);
    await axios.post(URL_IMAGENSTORAGE, fd)
    .then(response=>{ 
        var urli= response.data.urlimagen;
        var auxi = `http://localhost:8000/${urli}`;
        axios.post(URL_BOLETA, 
        {
          mensualidad: formData.mesesPagar,
          monto: formData.costoMensualida,
          nro_transaccion: formData.numeroTransaccion,
          fecha_deposito: formData.fecha,
          foto_comprobante: auxi,
          estado: 4,
          nro_factura: nfactura,
          id_user: iduser
        })
    })
    resetFormData();
    notificacion();

   };

  const renderImage = () => {
    if (formData.image) {
      return <img src={URL.createObjectURL(formData.image)} alt="Imagen"  style={{ width: '400px', height: '400px' }} />;
    }
  };

  const resetFormData = () => {
    setShowModal(false)
    setFormData({
      mesesPagar: 0,
      numeroTransaccion: '',
      costoMensualida: 0,
      fecha: '',
      imagen: null
    });
  };
  const notificacion = () => {
    toast.success('Boleta Registrada con Exito', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  } 

  const [ultiConv, setUltiConv] = useState([]);
  useEffect(() => {
    axios
      .get(URL_CONVOCATARIA)
      .then((response) => {
        var ult = response.data[response.data.length -1];
        setUltiConv(ult);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="d-flex align-items-center" style={{ height: '100vh' }}>
  
      <Form onSubmit={handleSubmit}  className="mx-auto">
        <h1 style={{marginTop:"230px"}}>Registro de Boleta de Pago por QR</h1>
          
            {/* <img>
            type="img"
            src="http:\/\/localhost:8000\/imagen\/1686102244-129-0.jpg"
            width="200px"
          
            </img> */}
                        <Form.Group controlId="qr">
            <Form.Label>QR:</Form.Label>
            <div align="center"><img src={ultiConv.imagen} width="350px"></img></div>
            {/* <img src="http://localhost:8000/imagen/1686102244-129-0.jpg" width="200px"></img> */}

            </Form.Group>

            <Form.Group controlId="mesesPagar">
            <Form.Label>Cantidad de meses a pagar</Form.Label>
            <Form.Control
              as="select"
              name="mesesPagar"
              value={formData.mesesPagar || ''}
              onChange={handleMesesPagarChange} 
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>

             
            </Form.Control>
          </Form.Group>





        <Form.Group controlId="numeroTransaccion">
          <Form.Label>Número de transacción</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingresa el número de transacción"
            name="numeroTransaccion"
            value={formData.numeroTransaccion}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="costoMensualida">
          <Form.Label>Total a pagar</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingresa el monto"
            name="costoMensualida"
            value={formData.costoMensualida}
            onChange={handleChange}
            disabled
          />
        </Form.Group>

        <Form.Group controlId="fecha">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="date"
            placeholder="Ingresa la fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Comprobante de Pago</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={e=> setArchivo({file: e.target.files[0]})}
            required
          />
        </Form.Group>

        {renderImage()}

        <div>
        
        <Button style={{backgroundColor: "#DC3545", marginLeft: "80px", marginTop:"20px"}} onClick={handleClick}  variant="danger" >Cancelar </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmar acción</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>¿Estás seguro de cancelar el registro?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      no
                    </Button>
                    <Button variant="primary" onClick={ resetFormData} >
                      
                      si
                    </Button>
                  </Modal.Footer>
               </Modal>

          <Button style={{backgroundColor: "#198754", marginLeft: "80px", marginTop:"20px"}} variant="primary" type="submit" className="mr-2">
            Enviar
          </Button>
        </div>
      </Form>
      <ToastContainer />
      
    </div>
  );
}

export default BoletaFormQR;