import React, { useState } from 'react';
import { Form, Button, Col, Row,Modal } from 'react-bootstrap';
import axios from 'axios';
import configData from '../config/config.json';



const regexSoloLetras = /^[a-zA-Z ]+$/;
const regexSoloNumeros = /^[0-9]+$/;

const FormularioRegistroCuenta = () => {
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
  setErrorNombre('');
  setErrorApellido('');
  setErrorTelefono('');
  setErrorCI('');
  setErrorCorreoElectronico('');
}



  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [CI, setCI] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');

  const User_Api_Url = configData.USER_API_URL;

  const [errorNombre, setErrorNombre] = useState('');
  const [errorApellido, setErrorApellido] = useState('');
  const [errorTelefono, setErrorTelefono] = useState('');
  const [errorCI, setErrorCI] = useState('');
  const [errorContraseña, setErrorContraseña] = useState('');
  const [errorConfirmarContraseña, setErrorConfirmarContraseña] = useState('');
  const [errorCorreoElectronico, setErrorCorreoElectronico] = useState('');

  const validarNombre = (valor) => {

    if (!regexSoloLetras.test(valor)) {
      return "Por favor, ingresa solo letras en el campo de nombre";
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

      await axios.post(User_Api_Url, {

        name: nombre,
        apellido: apellido,
        dni: CI,
        foto_perfil: null,
        telefono: telefono,
        direccion: null,
        email: correoElectronico,
        password: contraseña,
        password_confirmed: confirmarContraseña,
        tipo_usuario: 3,
        cargo: null,
        departamento: null,
        sitio: null,
        primer_ini_sesion: 1,
        solicitud_parqueo: 0,
        id_zona: null,
        id_horario: null
      })

      resetForm();
      window.location.href='./Login';
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

  return (
    <div style={{color: '#EAF1F7', backgroundColor:"#EAF1F7"}} className="d-flex flex-column justify-content-center align-items-center" >
      <h1 style={{marginTop: "30px"}} >Registrar cuenta </h1>
      <Row className="justify-content-md-center">
        <Col md={6}>
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="nombre">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control
          type="text"
          value={nombre}
          
          pattern= "[a-zA-Z ]*$"
          maxLength={30}
          minLength={2}
          onChange={(event) => setNombre(event.target.value)}
          isInvalid={errorNombre}
          required
        />
        <Form.Control.Feedback type="invalid">
          {errorNombre}
        </Form.Control.Feedback>
        </Form.Group>

      <Form.Group controlId="apellido">
        <Form.Label>Apellido:</Form.Label>
        <Form.Control
          type="text"
          value={apellido}
          onChange={(event) => setApellido(event.target.value)}
          isInvalid={errorApellido}
          pattern="[a-zA-Z ]+"
          maxLength={30}
          minLength={2}
          required
        />
        <Form.Control.Feedback type="invalid">
          {errorApellido}
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="telefono">
          <Form.Label>Celular:</Form.Label>
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

        <Button onClick={handleClick}  variant="danger" >Cancelar </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmar acción</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>¿Estás seguro de cancelar el registro?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      No
                    </Button>
                    <Button variant="primary" onClick={ resetForm} >
                      
                      Si
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
  <Form.Label>Confirmar contraseña:</Form.Label>
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
  <Form.Label>Correo electrónico:</Form.Label>
  <Form.Control
    type="email"
    value={correoElectronico}
    maxLength={60}
    minLength={10}
    onChange={(event) => setCorreoElectronico(event.target.value)}
    isInvalid={errorCorreoElectronico}
    required
  />
  <Form.Control.Feedback type="invalid">
    {errorCorreoElectronico}
  </Form.Control.Feedback>
</Form.Group>
         

<Button variant="success" type="submit">Enviar</Button>
</Form>
</Col>
       </Row>
       </div>
 );
};

export default FormularioRegistroCuenta;