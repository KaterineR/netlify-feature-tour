import React, { useState } from 'react';
import { Button, Col, ListGroup, Modal, Row } from 'react-bootstrap';

function ListaConBotones() {
  const [nombres, setNombres] = useState(['Juan', 'María', 'Pedro', 'Lucía', 'Sofía']);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [editarIndex, setEditarIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [numeros, setNumeros] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const mostrarNombres = () => {
    setMostrarLista(true);
  };

  const mostrarNumeros = (index, numero) => {
    setEditarIndex(editarIndex === index ? null : index);
    if (numero) {
      const nuevosNombres = [...nombres];
      nuevosNombres.splice(index, 1);
      setNombres(nuevosNombres);
    }
    else {
      setNumeros([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }
  };

  const eliminarNombre = () => {
    const nuevosNombres = [...nombres];
    nuevosNombres.splice(editarIndex, 1);
    setNombres(nuevosNombres);
    setNumeros(numeros.filter(numero => numero !== numeros[0]));
    setShowModal(false);
  };

  return (
    <div>
      <Row>
        <Col md={4}>
          <Button variant="primary" onClick={mostrarNombres}>
            Mostrar lista de espera
          </Button>
        </Col>
        <Col md={8}>
          {mostrarLista && (
            <ListGroup>
              {nombres.map((nombre, index) => (
                <ListGroup.Item key={index}>
                  {nombre}
                  <Button
                    variant="secondary"
                    className="ml-2"
                    onClick={() => mostrarNumeros(index)}
                  >
                    asignar manual
                  </Button>
                  <Button variant="danger" className="ml-2" onClick={() => setShowModal(true)}>
                    asignar aleatorio
                  </Button>
                  {editarIndex === index && (
                    <ListGroup className="mt-3">
                      {numeros.map((numero) => (
                        <ListGroup.Item key={numero} onClick={() => {
                          mostrarNumeros(index, numero);
                          setNumeros(numeros.filter((n) => n !== numero));
                        }}>
                          {numero}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>asignar aleatorio</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Estás seguro que deseas asignar aleatorio?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            no
          </Button>
          <Button variant="danger" onClick={eliminarNombre}>
            si
          </Button>
        </Modal.Footer>
      </Modal>
      </Row>
    </div>
  );
}

export default ListaConBotones;