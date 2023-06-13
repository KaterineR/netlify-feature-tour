import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


function NavBarOffAdministrador() {

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
            <Navbar.Brand href="#">Administrador</Navbar.Brand>
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
                  Menu Administrador
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">

                  <Nav.Link href="/RegistroConvocatoria">Registrar Convocatoria</Nav.Link>
                  <Nav.Link href="/MenuAdministrador/RegistroHorarioParqueo">Registrar Horario de Parqueo</Nav.Link>
                  <Nav.Link href="/RegistroZonaParqueo">Registrar Zona de Parqueo</Nav.Link>
                  <Nav.Link href="/MenuAdministrador/RegistroPersonal">Registrar Personal</Nav.Link>
                  <Nav.Link href="/RegistroHorario">Registrar Horario del Personal</Nav.Link>
                  <NavDropdown
                    title="Enviar Mensaje"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/MenuAdministrador/Mensaje">Enviar Mensaje Global</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuAdministrador/MensajeACliente">Enviar Mensaje Individual a Cliente</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuAdministrador/MensajeAOperador">Enviar Mensaje Individual a Operador</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuAdministrador/MensajeAGuardia">Enviar Mensaje Individual a Guardia</NavDropdown.Item>

                  </NavDropdown>
                  <NavDropdown
                    title="Listas/Tablas"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/MenuAdministrador/TablaConvocatoria">Lista de Convocatorias</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuAdministrador/TablaZona">Lista de Zonas de Parqueo</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuAdministrador/TablaHorarioParqueo">Lista de Horarios del Parqueo</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuAdministrador/TablaHorarioPersonal">Lista de Horarios del Personal</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuAdministrador/TablaBoleta">Lista de Boletas Por Transferencia</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuAdministrador/TablaBoletaQR">Lista de Boletas Por QR</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuAdministrador/TablaBoletaManual">Lista de Boletas Por Pago en Efectivo</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuAdministrador/TablaVehiculo">Lista de Vehiculos</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuAdministrador/TablaUsuarioParqueo">Lista de Clientes con Parqueos</NavDropdown.Item>

                  </NavDropdown>
                  <NavDropdown
                    title="Listas de Usuarios del Sistema"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/MenuAdministrador/TablaUserSimple">Lista de Usuarios Simples</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuAdministrador/TablaUserCliente">Lista de Clientes</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuAdministrador/TablaUserOperador">Lista de Operadores</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/MenuAdministrador/TablaUserGuardia">Lista de Guardias</NavDropdown.Item>

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

export default NavBarOffAdministrador;