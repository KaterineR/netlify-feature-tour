import React from 'react-dom';
import { Routes,Route, BrowserRouter } from 'react-router-dom';

import RegistroHorario from '../formularios/registrarHorarios';  
import FormularioRegistroCliente from '../formularios/registrarDatosCliente';
import FormularioRegistroCuentaUsuario from '../formularios/registrarDatosU';
import RegistroVehiculo from '../formularios/registrarVehiculo';
import FormularioRegistroPersonal from '../formularios/registrarDatosDelPersonal';
import RegistroZonaParqueo from '../formularios/registrarZparqueo';
import Login from '../login';

import RegistroHorarioParqueo from '../forlumarios2/registroPar';
import RegistroConvocatoria from '../forlumarios2/estadoPar';
import FormularioRegistroBoleta from '../forlumarios2/registrarBoleta';
import RegistroBoletaManual from '../forlumarios2/pagoEfec';

import MenuAdministrador from '../components/MenuAdministrador';
import MenuCliente from '../components/MenuCliente';
import MenuGuardia from '../components/MenuGuardia';
import MenuOperador from '../components/MenuOperador';
import MenuUComun from '../components/MenuUComun';
import MenuPrincipal from '../components/MenuPrincipal';

import SolicitarSitioParqueo from '../formularios/solicitarSitioParqueo';
import SolicitudBoleta from '../forlumarios2/revicionSolicitudPago';
import ListaUsuarios from '../forlumarios2/lista de usuarios';
import SidebarAdministrador from '../components/SidebarAdministrador';
import BarraNavegacion from '../navegacion/barraNavegacion';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import NavBarAdministrador from '../components/NavbarMenu';
import NavBarMenu from '../components/NavbarMenu';
import NavBarOffAdministrador from '../components/NavbarOffAdministrador';
import NavBarOffCliente from '../components/NavbarOffCliente';
import NavBarOffOperador from '../components/NavbarOffOperador';
import NavBarOffGuardia from '../components/NavbarOffGuardia';
import NavBarOffUsuarioComun from '../components/NavbarOffUsuarioComun';
import InfoConvocatoria from '../components/InfoConvocatoria';
import TablaBoleta from '../components/TablaBoleta';
import TablaVehiculo from '../components/TablaVehiculo';
import MensajeA from '../components/Mensaje';
import TablaMensaje from '../components/TablaMensaje';
import TablaMiBoleta from '../components/TablaMiBoleta';
import TablaBoletaManual from '../components/TablaBoletaManual';
import TablaMensajeOperador from '../components/TablaMensajeOperador';
import TablaMensajeGuardia from '../components/TablaMensajeGuardia';
import AsignarSitiosParqueo from '../formularios/aignarSitiosParqueo';
import ActuliazarDatos from '../formularios/actualizarDatosCliente';
import TablaConvocatoria from '../components/TablaConvocatoria';
import TablaHorarioParqueo from '../components/TablaHorarioParqueo';
import TablaZona from '../components/TablaZona';
import TablaUser from '../components/TablaUser';
import TablaUserCliente from '../components/TablaUserCliente';
import TablaUserOperador from '../components/TablaUserOperador';
import TablaUserGuardia from '../components/TablaUserGuardia';
import TablaHorarioPersonal from '../components/TablaHorarioPersonal'; 
import TablaUserGuardiaSE from '../components/TablaUserGuardiaSE';
import TablaMiVehiculo from '../components/TablaMiVehIculo';
import MensajeACliente from '../components/MensajeACliente';
import MensajeAGuardia from '../components/MensajeAGuardia';
import MensajeAOperador from '../components/MensajeAOperador';
import TablaUserClienteSE from '../components/TablaUserClienteSE';
import TablaVehiculoSE from '../components/TablaVehiculoSE';
import RegistrarBoletaQr from '../forlumarios2/registrarBoletaQR';
import TablaBoletaQR from '../components/TablaBoletaQR';
import TablaBoletaSE from '../components/TablaBoletaSE';
import TablaBoletaQRSE from '../components/TablaBoletaQRSE';
import SolicitudPagoQr from '../forlumarios2/solicitudPagoQr';
import ListaUsuariosParqueo from '../forlumarios2/listaUsuariosParqueos';

const Rutas=()=> {

  return (
    //<div className="container"> 
    <>
    
      <Routes>
        <Route path='/RegistroCliente' element={<FormularioRegistroCliente/>}/>
        <Route path='/ListaUsuarios' element={<ListaUsuarios/>}/>

        {/* <Route path="/" element={<TablaUser/>}/> */}
        <Route path="/" element={<NavBarMenu/>}/>
        <Route path='/MenuPrincipal' element={<NavBarMenu/>}/>
        <Route path='/RegistroCuenta' element={<><NavBarMenu/><FormularioRegistroCuentaUsuario/></>}/>
        <Route path='/Login' element={<><NavBarMenu/><Login/></>}/>
        <Route path='/MenuPrincipal/Convocatoria' element={<><NavBarMenu/><InfoConvocatoria/></>}/>
        
        <Route path='/MenuAdministrador' element={<NavBarOffAdministrador/>}/>
        <Route path='/RegistroConvocatoria' element={<><NavBarOffAdministrador/><RegistroConvocatoria/></>}/>
        <Route path='/MenuAdministrador/RegistroHorarioParqueo' element={<><NavBarOffAdministrador/><RegistroHorarioParqueo/></>}/>
        <Route path='/RegistroZonaParqueo' element={<><NavBarOffAdministrador/><RegistroZonaParqueo/></>}/>
        <Route path='/MenuAdministrador/RegistroPersonal' element={<><NavBarOffAdministrador/><FormularioRegistroPersonal/></>}/>
        <Route path='/RegistroHorario' element={<><NavBarOffAdministrador/><RegistroHorario/></>}/>
        <Route path='/MenuAdministrador/TablaBoleta' element={<><NavBarOffAdministrador/><TablaBoleta/></>}/>
        <Route path='/MenuAdministrador/TablaVehiculo' element={<><NavBarOffAdministrador/><TablaVehiculo/></>}/>
        <Route path='/MenuAdministrador/Mensaje' element={<><NavBarOffAdministrador/><MensajeA/></>}/>
        <Route path='/MenuAdministrador/TablaConvocatoria' element={<><NavBarOffAdministrador/><TablaConvocatoria/></>}/>
        <Route path='/MenuAdministrador/TablaHorarioParqueo' element={<><NavBarOffAdministrador/><TablaHorarioParqueo/></>}/>
        <Route path='/MenuAdministrador/TablaZona' element={<><NavBarOffAdministrador/><TablaZona/></>}/>
        <Route path='/MenuAdministrador/TablaUserSimple' element={<><NavBarOffAdministrador/><TablaUser/></>}/>
        <Route path='/MenuAdministrador/TablaUserCliente' element={<><NavBarOffAdministrador/><TablaUserCliente/></>}/>
        <Route path='/MenuAdministrador/TablaUserOperador' element={<><NavBarOffAdministrador/><TablaUserOperador/></>}/>
        <Route path='/MenuAdministrador/TablaUserGuardia' element={<><NavBarOffAdministrador/><TablaUserGuardia/></>}/>
        <Route path='/MenuAdministrador/TablaHorarioPersonal' element={<><NavBarOffAdministrador/><TablaHorarioPersonal/></>}/>
        <Route path='/MenuAdministrador/MensajeACliente' element={<><NavBarOffAdministrador/><MensajeACliente/></>}/>
        <Route path='/MenuAdministrador/MensajeAOperador' element={<><NavBarOffAdministrador/><MensajeAOperador/></>}/>
        <Route path='/MenuAdministrador/MensajeAGuardia' element={<><NavBarOffAdministrador/><MensajeAGuardia/></>}/>
        <Route path='/MenuAdministrador/TablaBoletaManual' element={<><NavBarOffAdministrador/><TablaBoletaManual/></>}/>
        <Route path='/MenuAdministrador/TablaBoletaQR' element={<><NavBarOffAdministrador/><TablaBoletaQR/></>}/>
        <Route path='/MenuAdministrador/TablaUsuarioParqueo' element={<><NavBarOffAdministrador/><ListaUsuariosParqueo/></>}/>

        <Route path='/MenuCliente' element={<NavBarOffCliente/>}/>
        <Route path='/RegistroVehiculo' element={<><NavBarOffCliente/><RegistroVehiculo/></>}/>
        <Route path='/RegistroBoleta' element={<><NavBarOffCliente/><FormularioRegistroBoleta/></>}/>
        <Route path='/MenuCliente/TablaMensaje' element={<><NavBarOffCliente/><TablaMensaje/></>}/> 
        <Route path='/MenuCliente/TablaMiBoleta' element={<><NavBarOffCliente/><TablaMiBoleta/></>}/>
        <Route path='/MenuCliente/ActualiarDatos' element={<><NavBarOffCliente/><ActuliazarDatos/></>}/>
        <Route path='/MenuCliente/TablaUserGuardia' element={<><NavBarOffCliente/><TablaUserGuardiaSE/></>}/>
        <Route path='/MenuCliente/Mensaje' element={<><NavBarOffCliente/><MensajeA/></>}/>
        <Route path='/MenuCliente/TablaMiVehiculo' element={<><NavBarOffCliente/><TablaMiVehiculo/></>}/>
        <Route path='/MenuCliente/MensajeAOperador' element={<><NavBarOffCliente/><MensajeAOperador/></>}/>
        <Route path='/MenuCliente/MensajeAGuardia' element={<><NavBarOffCliente/><MensajeAGuardia/></>}/>
        <Route path='/MenuCliente/RegistroBoletaQR' element={<><NavBarOffCliente/><RegistrarBoletaQr/></>}/>

        <Route path='/MenuOperador' element={<NavBarOffOperador/>}/>
        <Route path='/RegistroBoletaManual' element={<><NavBarOffOperador/><RegistroBoletaManual/></>}/>
        <Route path='/MenuOperador/RegistroPersonal' element={<><NavBarOffOperador/><FormularioRegistroPersonal/></>}/>
        <Route path='/SolicitudBoleta' element={<><NavBarOffOperador/><SolicitudBoleta/></>}/>
        <Route path='/MenuOperador/TablaManual' element={<><NavBarOffOperador/><TablaBoletaManual/></>}/>
        <Route path='/MenuOperador/TablaMensajeOperador' element={<><NavBarOffOperador/><TablaMensajeOperador/></>}/>
        <Route path='/MenuOperador/AsignarSitio' element={<><NavBarOffOperador/><AsignarSitiosParqueo/></>}/>
        <Route path='/MenuOperador/Mensaje' element={<><NavBarOffOperador/><MensajeA/></>}/>
        <Route path='/MenuOperador/TablaUserSimple' element={<><NavBarOffOperador/><TablaUser/></>}/>
        <Route path='/MenuOperador/TablaUserCliente' element={<><NavBarOffOperador/><TablaUserCliente/></>}/>
        <Route path='/MenuOperador/TablaUserGuardia' element={<><NavBarOffOperador/><TablaUserGuardiaSE/></>}/>
        <Route path='/MenuOperador/MensajeACliente' element={<><NavBarOffOperador/><MensajeACliente/></>}/>
        <Route path='/MenuOperador/MensajeAOperador' element={<><NavBarOffOperador/><MensajeAOperador/></>}/>
        <Route path='/MenuOperador/MensajeAGuardia' element={<><NavBarOffOperador/><MensajeAGuardia/></>}/>
        <Route path='/MenuOperador/TablaBoletaT' element={<><NavBarOffOperador/><TablaBoletaSE/></>}/>
        <Route path='/MenuOperador/TablaBoletaQR' element={<><NavBarOffOperador/><TablaBoletaQRSE/></>}/>
        <Route path='/MenuOperador/SolicitudBoletaQR' element={<><NavBarOffOperador/><SolicitudPagoQr/></>}/>
        <Route path='/MenuOperador/TablaUsuarioParqueo' element={<><NavBarOffOperador/><ListaUsuariosParqueo/></>}/>

        <Route path='/MenuGuardia' element={<NavBarOffGuardia/>}/>
        <Route path='/MenuGuardia/TablaMensajeGuardia' element={<><NavBarOffGuardia/><TablaMensajeGuardia/></>}/>
        <Route path='/MenuGuardia/Mensaje' element={<><NavBarOffGuardia/><MensajeA/></>}/>
        <Route path='/MenuGuardia/MensajeACliente' element={<><NavBarOffGuardia/><MensajeACliente/></>}/>
        <Route path='/MenuGuardia/MensajeAOperador' element={<><NavBarOffGuardia/><MensajeAOperador/></>}/>
        <Route path='/MenuGuardia/MensajeAGuardia' element={<><NavBarOffGuardia/><MensajeAGuardia/></>}/>
        <Route path='/MenuGuardia/TablaClientes' element={<><NavBarOffGuardia/><TablaUserClienteSE/></>}/>
        <Route path='/MenuGuardia/TablaVehiculos' element={<><NavBarOffGuardia/><TablaVehiculoSE/></>}/>

        <Route path='/MenuUComun' element={<NavBarOffUsuarioComun/>}/>
        <Route path='/SolicitarSitioParqueo' element={<><NavBarOffUsuarioComun/><SolicitarSitioParqueo/></>}/>
        <Route path='/MenuUComun/Convocatoria' element={<><NavBarOffUsuarioComun/><InfoConvocatoria/></>}/>

      </Routes>    
      </>       
    //</div>

  );
}

export default Rutas;
