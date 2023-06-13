import React, { useState } from 'react';
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import axios from 'axios';

const regexSoloLetras = /^[a-zA-Z]+$/;
const regexSoloNumeros = /^[0-9]+$/;

const FormularioRegistroCli = () => {

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
    setDepartamento('');
    setApellido('');
    setTelefono('');
    setCI('');
    setContraseña('');
    setConfirmarContraseña('');
    setCorreoElectronico('');
    setDireccion('');
    setImage(null);
    setCargo('');
    setDepartamento('');
   

  }



  const [nombre, setNombre] = useState('');
  const [Departamento, setDepartamento] = useState('');
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
  const [errorDepartamento, setErrorDepartamento] = useState('');
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

  const onSubmit = async (event) => {
    event.preventDefault();

    const errorNombre = validarNombre(nombre);
    const errorDepartamento = validarDepartamento(nombre);
    const errorApellido = validarApellido(apellido);
    const errorTelefono = validarTelefono(telefono);
    const errorCI = validarCI(CI);
    const errorContraseña = validarContraseña(contraseña);
    const errorConfirmarContraseña = validarConfirmarContraseña(confirmarContraseña);
    const errorCorreoElectronico = validarCorreoElectronico(correoElectronico);

    setErrorNombre(errorNombre);
    setErrorDepartamento(errorDepartamento);
    setErrorApellido(errorApellido);
    setErrorTelefono(errorTelefono);
    setErrorCI(errorCI);
    setErrorContraseña(errorContraseña);
    setErrorConfirmarContraseña(errorConfirmarContraseña);
    setErrorCorreoElectronico(errorCorreoElectronico);

    if (!errorNombre && !errorDepartamento && !errorTelefono && !errorCI && !errorContraseña && !errorConfirmarContraseña && !errorCorreoElectronico && !errorApellido) {
      console.log("El formulario se envió correctamente",Departamento, cargo);

      await axios.post('http://localhost:8000/api/auth/register', {
    
      name: nombre,
      apellido: apellido,
      dni: CI,
      foto_perfil: null,
      telefono: telefono,
      direccion: direccion,
      email: correoElectronico,
      password: contraseña,
      password_confirmed: confirmarContraseña,
      tipo_usuario: 3,
      cargo: cargo,
      departamento: Departamento,
      sitio: null,
      primer_ini_sesion: 1,
      solicitud_parqueo: 1,
      id_zona: null,
      id_horario: null
      } 
      
      )
      
      resetForm();
      // Aquí podrías enviar los datos del formulario al servidor
    } else {
      console.log("Hay errores en el formulario:");
      console.log(errorNombre);
      console.log(errorDepartamento);
      console.log(errorApellido);
      console.log(errorTelefono);
      console.log(errorCI);
      console.log(errorContraseña);
      console.log(errorConfirmarContraseña);
      console.log(errorCorreoElectronico);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" >
      <h1>Registrar Datos Del Cliente</h1>
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

        <Form.Group controlId="formBasicCargo">
              <Form.Label>Cargo: </Form.Label>
              <Form.Control as="select" defaultValue="Seleccione el cargo"  value={cargo}  required  onChange={(event) => setCargo(event.target.value)}>
              <option value="">Seleccione cargo</option>
    <option value="docente">docente</option>
    <option value="Adminisrativo">administrativo</option>
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

<Form.Group controlId="Departamento">
  <Form.Label> Departamento: </Form.Label>
  <Form.Control as="select" defaultValue="Seleccione el departamento" value={Departamento} required onChange={(event) => setDepartamento(event.target.value)}>
  <option value="">Seleccione Departamento</option>
    <option value="Sistemas">Sistemas</option>
    <option value="Informatica">Informatica</option>
  </Form.Control>
</Form.Group>


          <Form.Group controlId="formBasicFoto">            
          <Form.Label>Foto de Perfil</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} accept="image/*"   required />
              {image && (
                <div>
                  <img src={image} alt="Foto del cliente" width="300" height="300" />
                </div>
              )}
            
            </Form.Group>


<Button variant="success" type="submit">Enviar</Button>
</Form>
</Col>
       </Row>
       </div>
 );
};

export default FormularioRegistroCli;