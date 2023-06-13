import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


function NavBarOffGuardia() {

  const nombre = cookies.get('name');
  const apellido = cookies.get('apellido');
  const nombre_c = nombre+" "+apellido;

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
            <Navbar.Brand href="#">Guardia</Navbar.Brand>
            <Navbar.Text>
            Logueado como: <a >{nombre_c}</a>
          </Navbar.Text>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu Guardia
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">

                <NavDropdown
                    title="Enviar Mensaje"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/MenuGuardia/MensajeACliente">Enviar Mensaje Individual a Cliente</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuGuardia/MensajeAOperador">Enviar Mensaje Individual a Operador</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuGuardia/MensajeAGuardia">Enviar Mensaje Individual a Guardia</NavDropdown.Item>

                  </NavDropdown>

                  <Nav.Link href="/MenuGuardia/TablaMensajeGuardia">Mensajes Recibidos</Nav.Link>

                  {/* <Nav.Link href="/RegistroConvocatoria">Registrar Convocatoria</Nav.Link>
                  <Nav.Link href="/MenuAdministrador/RegistroHorarioParqueo">Registrar Horario de Parqueo</Nav.Link>
                  <Nav.Link href="/RegistroZonaParqueo">Registrar Zona de Parqueo</Nav.Link>
                  <Nav.Link href="/MenuAdministrador/RegistroPersonal">Registrar Personal</Nav.Link> */}
                  
                  <NavDropdown
                    title="Listas/Tablas"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/MenuGuardia/TablaClientes">Lista de Clientes</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuGuardia/TablaVehiculos">Lista de Vehiculos</NavDropdown.Item>

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

export default NavBarOffGuardia;