import React, { useEffect, useState } from 'react';
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configData from '../config/config.json';

const cookies = new Cookies();

const regexSoloLetras = /^[a-zA-Z ]+$/;
const regexSoloNumeros = /^[0-9]+$/;

const URL_USER = configData.CUSER_API_URL;
const URL_IMAGENSTORAGE = configData.IMAGENSTORAGE_API_URL;

const ActuliazarDatos = () => {

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

  const miId = cookies.get('id');
  const nombrea = cookies.get('name');
  const apellidoa = cookies.get('apellido');
  const telefonoa = cookies.get('telefono');
  const dnia = cookies.get('dni');
  const direcciona = cookies.get('direccion');
  const cargoa = cookies.get('cargo');
  const emaila = cookies.get('email');
  const departamentoa = cookies.get('departamento');
  const sitioa= cookies.get('sitio');
  const primer_ini_sesiona= cookies.get('primer_ini_sesion');
  const solicitud_parqueoa= cookies.get('solicitud_parqueo');
  const id_zonaa= cookies.get('id_zona');
  const id_horarioa= cookies.get('id_horario');

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
      console.log("El formulario se envió correctamente",Departamento, cargo,miId,sitioa,id_zonaa,image);
      const fd = new FormData();
      fd.append('file', archivo.file);
      await axios.post(URL_IMAGENSTORAGE, fd)
      .then(response=>{ 
          var urli= response.data.urlimagen;
          var auxi = `http://localhost:8000/${urli}`;
      axios.put(`${URL_USER}/${miId}`, {
      name: nombre,
      apellido: apellido,
      dni: CI,
      foto_perfil:auxi,
      telefono: telefono,
      direccion: direccion,
      email: correoElectronico,
      password: contraseña,
      password_confirmed: confirmarContraseña,
      tipo_usuario: 4,
      cargo: cargo,
      departamento: Departamento,
      sitio: sitioa,
      id_zona: id_zonaa,
      })
      })
      resetForm();
      actualizarCookies();
      notificacion();
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

  useEffect ( ()=>{
    setNombre(nombrea)
    setApellido(apellidoa)
    setTelefono(telefonoa)
    setCI(dnia)
    setDireccion(direcciona)
    setCargo(cargoa)
    setCorreoElectronico(emaila)
    setDepartamento(departamentoa)
  }, [])

  function actualizarCookies(){
      cookies.set('name', nombre, {path: "/"});
      cookies.set('apellido', apellido, {path: "/"});
      cookies.set('telefono', telefono, {path: "/"});
      cookies.set('dni', CI, {path: "/"});
      cookies.set('direccion', direccion, {path: "/"});
      cookies.set('cargo', cargo, {path: "/"});
      cookies.set('password_confirmed', contraseña, {path: "/"});
      cookies.set('email', correoElectronico, {path: "/"});
      cookies.set('departamento', Departamento, {path: "/"});
      cookies.set('foto_perfil', null, {path: "/"});
  }
  const notificacion = () => {
    toast.success('Datos Actualizados con Exito', {
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
      <h1>Actulizar mis Datos</h1>
      <Row className="justify-content-md-center">
        <Col md={6}>
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="nombre">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control
          type="text"
          value={nombre }
          onChange={(event) => setNombre(event.target.value)}
          isInvalid={errorNombre}
          pattern="[a-zA-Z ]+"
          maxLength={30}
          minLength={2}
          required
          // placeholder= {nombrea}
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
          pattern="[a-zA-Z ]+"
          maxLength={30}
          minLength={2}
          required
          // placeholder= {apellidoa}
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
            // placeholder= {telefonoa}
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
            // placeholder= {dnia}
          />
          <Form.Control.Feedback type="invalid" >
            {errorCI}
          </Form.Control.Feedback>
        </Form.Group>

         <Form.Group controlId="direccion">
          <Form.Label>Direccion: </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={direccion}
            onChange={handleDireccionChange}
            maxLength={250}
            minLength={2}
            required
            // placeholder= {direcciona}
          />
        </Form.Group>

        <Form.Group controlId="formBasicCargo">
              <Form.Label>Cargo: </Form.Label>
              <Form.Control as="select"  value={cargo}  required  onChange={(event) => setCargo(event.target.value)}>
              <option value="">{cargoa}</option>
    <option value="Docente">Docente</option>
    <option value="Adminisrativo" >Administrativo</option>
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
    // placeholder= {emaila}

  />
  <Form.Control.Feedback type="invalid">
    {errorCorreoElectronico}
  </Form.Control.Feedback>
</Form.Group>

<Form.Group controlId="Departamento">
  <Form.Label> Departamento: </Form.Label>
  <Form.Control as="select" value={Departamento} required onChange={(event) => setDepartamento(event.target.value)}>
  <option value="">{departamentoa}</option>
    <option value="Sistemas">Sistemas</option>
    <option value="Informatica">Informatica</option>
  </Form.Control>
</Form.Group>


          <Form.Group controlId="formBasicFoto">            
          <Form.Label>Foto de Perfil</Form.Label>
              <Form.Control 
              type="file" 
              onChange={e=> setArchivo({file: e.target.files[0]})}
              accept="image/*"   
              required />
              {image && (
                <div>
                  <img src={image} alt="Foto del cliente" width="300" height="300" />
                </div>
              )}
            
            </Form.Group>


<Button variant="success" type="submit">Actualizar</Button>
</Form>
<ToastContainer />
</Col>
       </Row>
       </div>
 );
};

export default ActuliazarDatos;