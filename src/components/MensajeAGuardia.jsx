import { useState, useEffect } from "react";
import { Form, Button} from "react-bootstrap";
import configData from '../config/config.json';
import Cookies from 'universal-cookie';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();
const MENSAJES_API_URL = configData.MENSAJES_API_URL;
const CLIENTES_API_URL = configData.SOLOGUARDIA_API_URL;

function MensajeAGuardia() {

    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [receptor, setReceptor] = useState(1);

    const handleAsuntoChange = (event) => {
        setAsunto(event.target.value);
    };
    const handleMensajeChange = (event) => {
        setMensaje(event.target.value);
    };

    const [clientes, setClientes] = useState( [] );
    const [idAc, setIdAc] = useState('');

    useEffect(()=>{
      getAllClientes()
    }, [])

    const getAllClientes=async()=>{
    const response = await axios.get(CLIENTES_API_URL)
      setClientes(response.data)
    }

    const handleReceptorChange = (event) => {
      setIdAc(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post(MENSAJES_API_URL, {
            asunto: asunto,
            mensaje: mensaje,
            id_receptor: idAc,
            global: 0,
            estado: 0,
            id_user: cookies.get('id')
        })

        resetForm();
        notificacion();
    };

    function resetForm () {
        setAsunto('');
        setMensaje('');
        setReceptor('');
      };

      const notificacion = () => {
        toast.success('Mensaje enviado con exito', {
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

  return (
    <>
    <div>
    <h2 style={{textAlign: "center", marginTop: "20px"}}>Sistema de Mensajeria A Guardias</h2>
    <Form style={{marginLeft: "80px", marginRight: "80px"}} onSubmit={handleSubmit}>
    <Form.Group className="mb-3">
        <Form.Label style={{marginTop: "50px"}} >Guardia:</Form.Label>
        <Form.Select onChange={handleReceptorChange}>
        <option value="">Seleccione un Guardia</option>
        {clientes.map ((cliente)=>(
          <option
            key={cliente.id}
            value={cliente.id}  
          >
            {`${cliente.name} ${cliente.apellido}`}
          </option>
        ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Asunto:</Form.Label>
        <Form.Control 
            placeholder="Escribe el Asunto"  
            type="text"
            id="asunto"
            name="asunto"
            value={asunto}
            onChange={handleAsuntoChange}
            maxLength={100}
            minLength={2}
            required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Mensaje:</Form.Label>
        <Form.Control 
            placeholder="Escribe tu mensaje"  
            type="text"
            id="mensaje"
            name="mensaje"
            value={mensaje}
            onChange={handleMensajeChange}
            maxLength={255}
            minLength={2}
            required
        />
      </Form.Group>
      <Form.Group className="mb-3">
      <Button style={{marginLeft: "20px"}} variant="success" type="submit">
            Enviar
        </Button>
        {/* <Button style={{marginLeft: "20px"}} variant="success" onChange={resetForm}>
            Cancelar
        </Button> */}
      </Form.Group>
      </Form>
      <ToastContainer />
      </div>
    </>
  );
}

export default MensajeAGuardia;