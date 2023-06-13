import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Col, Row } from 'react-bootstrap';
import axios from 'axios';

function ListaUsuarios() {
    const [boletas, setBoletas] = useState([]);
  
    useEffect(() => {
      axios
        .get("http://localhost:8000/api/users")
        .then((response) => {
          setBoletas(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    const handleEliminarClick = (id) => {
      axios
        .delete(`http://localhost:8000/api/users/${id}`)
        .then((response) => {
          // Eliminar el cliente de la lista
          const newBoletas = boletas.filter((boleta) => boleta.id !== id);
          setBoletas(newBoletas);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    return (
      <div>
        <h2>Usuarios Registrados:</h2>
        <ul>
          {boletas.map((boleta) => (
            <li key={boleta.id} style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginRight: "10px" }}>Nombre: {boleta.name}</p>
              <p style={{ marginRight: "10px" }}>Apellido: {boleta.apellido}</p>
              <p style={{ marginRight: "10px" }}>CI: {boleta.dni}</p>
              <p style={{ marginRight: "10px" }}>Gmail: {boleta.email}</p>
              {/* <Button style={{marginLeft: "100px"}} onClick={() => handleEliminarClick(boleta.id)}>
                Eliminar cliente
              </Button> */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
export default ListaUsuarios
