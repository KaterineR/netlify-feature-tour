import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import axios from 'axios';
import configData from '../config/config.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User_Api_Url = configData.USER_API_URL;
const URL_IMAGENSTORAGE = configData.IMAGENSTORAGE_API_URL;

const regexSoloLetras = /^[a-zA-Z]+$/;
const regexSoloNumeros = /^[0-9]+$/;

const FormularioRegistroPerso = () => {

  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    
    setShowModal(true);
  };
  function resetForm() {
    setShowModal(false)
    
    setNombre('');
   
    setApellido('');
    setTelefono('');
    setCI('');
    setContraseña('');
    setConfirmarContraseña('');
    setCorreoElectronico('');
    setDireccion('');
    setImage(null);
   
    setHorarioTrabajo('');
    setCargo('');

   

  }


  const [horarioTrabajo, setHorarioTrabajo] = useState('');
  const [horariosTrabajo, setHorariosTrabajo] = useState([]);





  const [tipoUsuario, setTipoUsuario] = useState(0);
  const [nombre, setNombre] = useState('');
  
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [CI, setCI] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [direccion, setDireccion] = useState("");

  const [cargo, setCargo] = useState("");
  const [sitio, setSitio] = useState("sitio");
  const [estado, setEstado] = useState(1);
  const [fotoString, setFotoString] = useState("imagen.jpg");


  const [errorNombre, setErrorNombre] = useState('');

  const [errorApellido, setErrorApellido] = useState('');
  const [errorTelefono, setErrorTelefono] = useState('');
  const [errorCI, setErrorCI] = useState('');
  const [errorContraseña, setErrorContraseña] = useState('');
  const [errorConfirmarContraseña, setErrorConfirmarContraseña] = useState('');
  const [errorCorreoElectronico, setErrorCorreoElectronico] = useState('');


  const handleDireccionChange = (event) => {
    setDireccion(event.target.value);
  };
  const validarNombre = (valor) => {
    if (!regexSoloLetras.test(valor)) {
      return "Por favor, ingresa solo letras en el campo de nombre";
    }
  };
  const validarDepartamento = (valor) => {
    if (!regexSoloLetras.test(valor)) {
      return "Por favor, ingresa solo letras en el campo de Departamento";
    }
  };
  const validarApellido = (valor) => {
    if (!regexSoloLetras.test(valor)) {
      return "Por favor, ingresa solo letras en el campo de apellido";
    }
  };

  const validarTelefono = (valor) => {
    if (!regexSoloNumeros.test(valor)) {
      return "Por favor, ingresa solo números en el campo de teléfono";
    }
  };
  const validarCI = (valor) => {
    if (!regexSoloNumeros.test(valor)) {
      return "Por favor, ingresa solo números en el campo de teléfono";
    }
  };
  const validarContraseña = (valor) => {
    if (valor.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
  };

  const validarConfirmarContraseña = (valor) => {
    if (valor !== contraseña) {
      return "Las contraseñas no coinciden";
    }
  };

  const validarCorreoElectronico = (valor) => {
    if (!valor.includes('@gmail.com')) {
      return "Por favor, ingresa una dirección de correo electrónico válida de Gmail";
    }
  };

  //subida imagen
  const initialValues ={
    file:null,
    nombre: ''
  }
  const [archivo, setArchivo] = useState(initialValues);
  //fin subida imagen

  const onSubmit = async (event) => {
    event.preventDefault();

    const errorNombre = validarNombre(nombre);
  
    const errorApellido = validarApellido(apellido);
    const errorTelefono = validarTelefono(telefono);
    const errorCI = validarCI(CI);
    const errorContraseña = validarContraseña(contraseña);
    const errorConfirmarContraseña = validarConfirmarContraseña(confirmarContraseña);
    const errorCorreoElectronico = validarCorreoElectronico(correoElectronico);

    setErrorNombre(errorNombre);

    setErrorApellido(errorApellido);
    setErrorTelefono(errorTelefono);
    setErrorCI(errorCI);
    setErrorContraseña(errorContraseña);
    setErrorConfirmarContraseña(errorConfirmarContraseña);
    setErrorCorreoElectronico(errorCorreoElectronico);

    if (!errorNombre && !errorTelefono && !errorCI && !errorContraseña && !errorConfirmarContraseña && !errorCorreoElectronico && !errorApellido) {
      console.log("El formulario se envió correctamente");
      const fd = new FormData();
      fd.append('file', archivo.file);
      await axios.post(URL_IMAGENSTORAGE, fd)
      .then(response=>{ 
          var urli= response.data.urlimagen;
          var auxi = `http://localhost:8000/${urli}`;
      axios.post(User_Api_Url,{
      name: nombre,
      apellido: apellido,
      dni: CI,
      foto_perfil: auxi,
      telefono: telefono,
      direccion: null,
      email: correoElectronico,
      password: contraseña,
      password_confirmed: confirmarContraseña,
      tipo_usuario: tipoUsuario,
      cargo: cargo,
      departamento: null,
      sitio: null,
      primer_ini_sesion: 1,
      solicitud_parqueo: 0,
      id_zona: null,
      id_horario: horarioTrabajo
      })
    })
      resetForm();
      notificacion();
      // Aquí podrías enviar los datos del formulario al servidor
    } else {
      console.log("Hay errores en el formulario:");
      console.log(errorNombre);
     
      console.log(errorApellido);
      console.log(errorTelefono);
      console.log(errorCI);
      console.log(errorContraseña);
      console.log(errorConfirmarContraseña);
      console.log(errorCorreoElectronico);
    }
  };
  useEffect(() => {
    const fetchHorariosTrabajo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/horarios');
        const horariosData = response.data.map((horario) => ({
          ...horario,
          horaInicio: horario.horaInicio, // Reemplaza "horaInicio" con el nombre de la propiedad en tu objeto de horario de trabajo
          horaFin: horario.horaFin, // Reemplaza "horaFin" con el nombre de la propiedad en tu objeto de horario de trabajo
        }));
        setHorariosTrabajo(horariosData);
      } catch (error) {
        console.error('Error al obtener los horarios de trabajo:', error);
      }
    };

    fetchHorariosTrabajo();
  }, []);

  const notificacion = () => {
    toast.success('Registro Exitoso del Personal', {
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
    <div className="d-flex flex-column justify-content-center align-items-center" >
      <h1>Registrar Datos Del Personal</h1>
      <Row className="justify-content-md-center">
        <Col md={6}>
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="nombre">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control
          type="text"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          isInvalid={errorNombre}
          pattern="[a-zA-Z]+"
          maxLength={30}
          minLength={2}
          required
        />
        <Form.Control.Feedback type="invalid">
          {errorNombre}
        </Form.Control.Feedback>
        </Form.Group>

      <Form.Group controlId="apellido">
        <Form.Label>Apellido: </Form.Label>
        <Form.Control
          type="text"
          value={apellido}
          onChange={(event) => setApellido(event.target.value)}
          isInvalid={errorApellido}
          pattern="[a-zA-Z]+"
          maxLength={30}
          minLength={2}
          required
        />
        <Form.Control.Feedback type="invalid">
          {errorApellido}
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="telefono">
          <Form.Label>Teléfono:</Form.Label>
          <Form.Control
            type="tel"
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}
            isInvalid={errorTelefono}
            pattern="[0-9]+"
            maxLength={8}
            minLength={2}
            required
          />
          <Form.Control.Feedback type="invalid" >
            {errorTelefono}
          </Form.Control.Feedback>
        </Form.Group>
              
        <Form.Group controlId="CI">
          <Form.Label>CI/DNI:</Form.Label>
          <Form.Control
            type="t"
            value={CI}
            onChange={(event) => setCI(event.target.value)}
            isInvalid={errorCI}
            pattern="[0-9]+"
            maxLength={10}
            minLength={6}
            required
          />
          <Form.Control.Feedback type="invalid" >
            {errorCI}
          </Form.Control.Feedback>
        </Form.Group>

         <Form.Group controlId="direccion">
          <Form.Label>Direcion: </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingresa una descripción del vehículo"
            value={direccion}
            onChange={handleDireccionChange}
            maxLength={250}
            minLength={2}
            required
          />
        </Form.Group>
{/* Espacio entre la sección de "Foto de Perfil" y "Selecciona un horario de trabajo" */}
<div style={{ marginBottom: '20px' }}></div>

<Form.Group>
  <Form.Label>Cargo:</Form.Label>
  <Form.Control
    as="select"
    value={cargo}
    onChange={(event) => {
      const selectedCargo = event.target.value;
      setCargo(selectedCargo);
      let tipoUsuarioValue = 0;

      if (selectedCargo === "Operador") {
        tipoUsuarioValue = 1;
      } else if (selectedCargo === "Guardia") {
        tipoUsuarioValue = 2;
      }

      setTipoUsuario(tipoUsuarioValue);
    }}
    required
  >
    <option value="">Seleccione cargo</option>
    <option value="Operador">Operador</option>
    <option value="Guardia">Guardia</option>
    {/* Otras opciones de cargo */}
  </Form.Control>
</Form.Group>


            <Button onClick={handleClick} variant="danger"  >Cancelar </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                 
                  <Modal.Body>¿Estás seguro de cancelar el registro?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      no
                    </Button>
                    <Button variant="primary" onClick={ resetForm}  type="reset"   >
                      
                      si
                    </Button>
                  </Modal.Footer>
               </Modal>


    </Form>
    </Col>
        <Col md={6}>
        <Form onSubmit={onSubmit}>
        <Form.Group controlId="contraseña">
        <Form.Label>Contraseña:</Form.Label>
        <Form.Control
            type="password"
            value={contraseña}
            onChange={(event) => setContraseña(event.target.value)}
            isInvalid={errorContraseña}
            minLength={8}
            required
        />
  <Form.Control.Feedback type="invalid">
    {errorContraseña}
  </Form.Control.Feedback>
</Form.Group>

<Form.Group controlId="confirmar-contraseña">
  <Form.Label>Confirmar Contraseña:</Form.Label>
  <Form.Control
    type="password"
    value={confirmarContraseña}
    onChange={(event) => setConfirmarContraseña(event.target.value)}
    isInvalid={errorConfirmarContraseña}
    minLength={8}
    required
  />
  <Form.Control.Feedback type="invalid">
    {errorConfirmarContraseña}
  </Form.Control.Feedback>
</Form.Group>

<Form.Group controlId="correo-electronico">
  <Form.Label>Correo Electrónico:</Form.Label>
  <Form.Control
    type="email"
    value={correoElectronico}
    onChange={(event) => setCorreoElectronico(event.target.value)}
    isInvalid={errorCorreoElectronico}
    required
  />
  <Form.Control.Feedback type="invalid">
    {errorCorreoElectronico}
  </Form.Control.Feedback>
</Form.Group>




<Form.Group controlId="formBasicFoto">
  <Form.Label>Foto de Perfil</Form.Label>
  <Form.Control 
  type="file"             
  onChange={e=> setArchivo({file: e.target.files[0]})}
  accept="image/*" required
  />
  {image && (
    <div>
      <img src={image} alt="Foto del cliente" width="300" height="300" />
    </div>
  )}
  <Form.Text className="text-muted"></Form.Text>
</Form.Group>

{/* Espacio entre la sección de "Foto de Perfil" y "Selecciona un horario de trabajo" */}
<div style={{ marginBottom: '20px' }}></div>

<Form.Group>
  <Form.Label>Horario de Trabajo:</Form.Label>
  <Form.Control
    as="select"
    value={horarioTrabajo}
    onChange={(event) => setHorarioTrabajo(event.target.value)}
    required
  >
    <option value="">Selecciona un horario de trabajo</option>
    {horariosTrabajo.map((horario) => (
      <option key={horario.id} value={horario.id}>
        {horario.nombre} ({horario.inicio_turno} - {horario.salida_turno})
      </option>
    ))}
  </Form.Control>
</Form.Group>


<Button variant="success" type="submit">Enviar</Button>
</Form>
</Col>
       </Row>
       <ToastContainer />
       </div>
 );
};

export default FormularioRegistroPerso;