import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Col, Row } from 'react-bootstrap';
import axios from 'axios';

function SolicitudPago() {
  const [boletas, setBoletas] = useState([]);
  const [aceptados, setAceptados] = useState([]);
  const [rechazados, setRechazados] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [boletasResponse, usersResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/boletas'),
          axios.get('http://localhost:8000/api/users')
        ]);
  
        const boletasData = boletasResponse.data;
        const usersData = usersResponse.data;
  
        const userNames = {};
        const boletasWithNames = [];
  
        boletasData.forEach(boleta => {
          if (boleta.id_user !== null) {
            userNames[boleta.id_user] = '';
            boletasWithNames.push({
              ...boleta,
              userName: '' // Esta propiedad se llenará más adelante
            });
          }
        });
  
        usersData.forEach(user => {
          if (userNames[user.id] !== undefined) {
            userNames[user.id] = user.name;
          }
        });
  
        boletasWithNames.forEach(boleta => {
          boleta.userName = userNames[boleta.id_user] || 'Usuario no encontrado';
        });
  
        const boletasPendientes = boletasWithNames.filter(boleta => boleta.estado === 0);
        const boletasAceptadas = boletasWithNames.filter(boleta => boleta.estado === 1);
        const boletasRechazadas = boletasWithNames.filter(boleta => boleta.estado === 2);
  
        setBoletas(boletasPendientes);
        setAceptados(boletasAceptadas);
        setRechazados(boletasRechazadas);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  const handleAceptadoClick = (id) => {
    const boletaAceptada = boletas.find(boleta => boleta.id === id);
  
    axios
      .put(`http://localhost:8000/api/boletas/${id}`, { estado: 1 })
      .then(response => {
        setAceptados([...aceptados, boletaAceptada]);
        setBoletas(boletas.filter(boleta => boleta.id !== id));
        setRechazados(rechazados.filter(boleta => boleta.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  const handleRechazoClick = (id) => {
    const boletaRechazada = boletas.find(boleta => boleta.id === id);
  
    axios
      .put(`http://localhost:8000/api/boletas/${id}`, { estado: 2 })
      .then(response => {
        setRechazados([...rechazados, boletaRechazada]);
        setBoletas(boletas.filter(boleta => boleta.id !== id));
        setAceptados(aceptados.filter(boleta => boleta.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Row style={{ marginLeft: "0px", background: "#0C4D51" }}>
      <h2 style={{ marginLeft: "520px", color: "#F1F1F2" }}>Solicitudes de Pago:</h2>
      <></>
      <Col style={{ marginLeft: "5px", background: "#F3F3FA" }}>
        <h2>Pendientes:</h2>
        <ul>
          <p>--------------------------------------------------</p>
          {boletas.map(boleta => (
            <li key={boleta.id}>
              <p>Nombre de usuario: {boleta.userName}</p>
              <p>Numero de transaccion: {boleta.nro_transaccion}</p>
              <p>Meses a pagar: {boleta.mensualidad}</p>
              <p>Monto a pagar: {boleta.monto}</p>
              <p>Fecha de deposito: {boleta.fecha_deposito}</p>
              <img src={boleta.foto_comprobante} width="350px" alt="Comprobante"></img>
              <p></p>
              <Button style={{ backgroundColor: "#198754", marginLeft: "35px" }} onClick={() => handleAceptadoClick(boleta.id)}>Aceptar</Button>
              <Button style={{ backgroundColor: "#DC3545", marginLeft: "40px" }} onClick={() => handleRechazoClick(boleta.id)}>Rechazar</Button>
              <p>--------------------------------------------------</p>
            </li>
          ))}
        </ul>
      </Col>

      <Col style={{ marginLeft: "5px", background: "#F3F3FA" }}>
        <h2>Aceptados:</h2>
        <p>--------------------------------------------------</p>
        <ul>
          {aceptados.map(boleta => (
            <li key={boleta.id}>
              <p>Nombre de usuario: {boleta.userName}</p>
              <p>Numero de transaccion: {boleta.nro_transaccion}</p>
              <p>Meses a pagar: {boleta.mensualidad}</p>
              <p>Monto a pagar: {boleta.monto}</p>
              <p>Fecha de deposito: {boleta.fecha_deposito}</p>
              <p>--------------------------------------------------</p>
            </li>
          ))}
        </ul>
      </Col>

      <Col style={{ marginLeft: "5px", background: "#F3F3FA" }}>
        <h2>Rechazados:</h2>
        <p>--------------------------------------------------</p>
        <ul>
          {rechazados.map(boleta => (
            <li key={boleta.id}>
              <p>Nombre de usuario: {boleta.userName}</p>
              <p>Numero de transaccion: {boleta.nro_transaccion}</p>
              <p>Meses a pagar: {boleta.mensualidad}</p>
              <p>Monto a pagar: {boleta.monto}</p>
              <p>Fecha de deposito: {boleta.fecha_deposito}</p>
              <p>--------------------------------------------------</p>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  );
}

export default SolicitudPago;