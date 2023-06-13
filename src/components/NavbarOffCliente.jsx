import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cookies from 'universal-cookie';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
const cookies = new Cookies();


function NavBarOffCliente() {

  const nombre = cookies.get('name');
  const [nombreZona, setNombreZona] = useState();
  const apellido = cookies.get('apellido');
  const idParqueo = cookies.get('id_zona');
  const sitio = cookies.get('sitio');
  const nombre_c = nombre+" "+apellido;
  const nombre_d = sitio +" "+nombreZona;


  useEffect(() => {
    axios
    .get(`http://localhost:8000/api/zonas/${idParqueo}`)
      .then((response) => {
        setNombreZona(response.data.nombre);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const cerrarSesion =()=>{
    //remueve los datos de cookies
  cookies.remove('id', {path: "/"});
  cookies.remove('name', {path: "/"});
  cookies.remove('apellido', {path: "/"});
  cookies.remove('dni', {path: "/"});
  cookies.remove('foto_perfil', {path: "/"});
  cookies.remove('telefono', {path: "/"});
  cookies.remove('direccion', {path: "/"});
  cookies.remove('email', {path: "/"});
  cookies.remove('password_confirmed', {path: "/"});
  cookies.remove('tipo_usuario', {path: "/"});
  cookies.remove('cargo', {path: "/"});
  cookies.remove('departamento', {path: "/"});
  cookies.remove('sitio', {path: "/"});
  cookies.remove('primer_ini_sesion', {path: "/"});
  cookies.remove('solicitud_parqueo', {path: "/"});
  cookies.remove('id_zona', {path: "/"});
  cookies.remove('id_horario', {path: "/"});
  }

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Cliente</Navbar.Brand>
            <Navbar.Text>
            Logueado como: <a >{nombre_c}</a>
            -Con sitio de parqueo: <a >{nombre_d}</a>
            

          </Navbar.Text>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu Cliente
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">

                  <Nav.Link href="/RegistroVehiculo">Registrar Vehiculo</Nav.Link>
                  <Nav.Link href="/RegistroBoleta">Registrar Boleta de Pago por Transferencia</Nav.Link>
                  <Nav.Link href="/MenuCliente/RegistroBoletaQR">Registrar Boleta de Pago por QR</Nav.Link>

                  <NavDropdown
                    title="Enviar Mensaje"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/MenuCliente/MensajeAOperador">Enviar Mensaje Individual a Operador</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuCliente/MensajeAGuardia">Enviar Mensaje Individual a Guardia</NavDropdown.Item>

                  </NavDropdown>

                  <Nav.Link href="/MenuCliente/TablaMensaje">Mensajes Recibidos</Nav.Link>
                  <Nav.Link href="/MenuCliente/TablaMiBoleta">Mis Boletas</Nav.Link>
                  <Nav.Link href="/MenuCliente/TablaMiVehiculo">Mis Vehiculos</Nav.Link>
                  <Nav.Link href="/MenuCliente/ActualiarDatos">Actualizar mis Datos</Nav.Link>
                  
                  <NavDropdown
                    title="Listas/Tablas"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/MenuCliente/TablaUserGuardia">Lista de Guardias</NavDropdown.Item>
                    {/* <NavDropdown.Divider /> */}


                  </NavDropdown>

                  <Nav.Link onClick={cerrarSesion} href="/">Cerrar Sesion</Nav.Link>
                </Nav>
                
              </Offcanvas.Body>
              
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBarOffCliente;