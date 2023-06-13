import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


function NavBarOffOperador() {

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
            <Navbar.Brand href="#">Operador</Navbar.Brand>
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
                  Menu Operador
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">

                  <Nav.Link href="/MenuOperador/AsignarSitio">Asignar Sitio</Nav.Link>
                  <Nav.Link href="/RegistroBoletaManual">Registrar Pago de Boleta</Nav.Link>
                  <Nav.Link href="/MenuOperador/RegistroPersonal">Registrar Personal</Nav.Link>
                  <Nav.Link href="/SolicitudBoleta">Revisar Solicitudes de Boletas Por Transferencia</Nav.Link>
                  <Nav.Link href="/MenuOperador/SolicitudBoletaQR">Revisar Solicitudes de Boletas Por QR</Nav.Link>

                  <NavDropdown
                    title="Enviar Mensaje"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/MenuOperador/Mensaje">Enviar Mensaje Global</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuOperador/MensajeACliente">Enviar Mensaje Individual a Cliente</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuOperador/MensajeAOperador">Enviar Mensaje Individual a Operador</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuOperador/MensajeAGuardia">Enviar Mensaje Individual a Guardia</NavDropdown.Item>

                  </NavDropdown>

                  <Nav.Link href="/MenuOperador/TablaMensajeOperador">Mensajes Recibidos</Nav.Link>
                  
                  <NavDropdown
                    title="Listas/Tablas"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/MenuOperador/TablaBoletaT">Lista de Boletas Por Transferencia</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuOperador/TablaBoletaQR">Lista de Boletas Por QR</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuOperador/TablaManual">Lista de Boletas Registradas Manualmente</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuOperador/TablaUserSimple">Lista de Usuarios Simples</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuOperador/TablaUserCliente">Lista de Clientes</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuOperador/TablaUserGuardia">Lista de Guardias</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuOperador/TablaUsuarioParqueo">Lista de Clientes con Parqueos</NavDropdown.Item>

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

export default NavBarOffOperador;