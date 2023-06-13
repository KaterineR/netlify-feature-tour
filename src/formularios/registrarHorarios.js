import { Form, Button, ListGroup, Container } from 'react-bootstrap';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistroH() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [startTime, setStartTime] = useState('');
  const [startTimeError, setStartTimeError] = useState('');
  const [endTime, setEndTime] = useState('');
  const [endTimeError, setEndTimeError] = useState('');
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/horarios')
      .then(response => {
        const newShifts = response.data.map(shift => ({
          name: shift.nombre,
          startTime: shift.inicio_turno,
          endTime: shift.salida_turno
        }));
        setShifts(newShifts);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value.replace(/[^a-zA-Z0-9ñÑ\s]/g, '').slice(0, 20));
    setNameError('');
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    setStartTimeError('');
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    setEndTimeError('');
    
    const end = new Date(`2000-01-01T${e.target.value}`);
    const start = new Date(`2000-01-01T${startTime}`);
    
    if (end < start) {
      alert("No se puede guardar un Fin de turno anterior al Inicio de turno");
      setEndTime('');
      return;
    }
  };
  
  const handleSave = async () => {
    if (!name || !startTime || !endTime) {
      if (!name) {
        setNameError("Por favor, complete este campo");
      } else {
        setNameError("");
      }

      if (!startTime) {
        setStartTimeError("Por favor, complete este campo");
      } else {
        setStartTimeError("");
      }

      if (!endTime) {
        setEndTimeError("Por favor, complete este campo");
      } else {
        setEndTimeError("");
      }

      return;
    }
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
  
    const maxDuration = 8 * 60 * 60 * 1000; // 8 horas en milisegundos
    const duration = end.getTime() - start.getTime();
  
    if (duration > maxDuration) {
      setEndTime('');
      alert("La duración del turno no puede ser mayor a 8 horas");
      return;
    }

    

    try {
      await axios.post('http://localhost:8000/api/horarios', {
        nombre: name,
        inicio_turno: startTime,
        salida_turno: endTime
      });

      notificacion();

      const newShift = { name, startTime, endTime };
      setShifts([...shifts, newShift]);
      setName('');
      setStartTime('');
      setEndTime('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (index) => {
    const newShifts = [...shifts];
    newShifts.splice(index, 1);
    setShifts(newShifts);
  };

  const notificacion = () => {
    toast.success('Horario Registrado con exito', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div>
      <h1>Registro de Horario</h1>

      <Form.Group controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" value={name} onChange={handleNameChange} required />
        {nameError && <div className="error-message">{nameError}</div>}
      </Form.Group>

      <Form.Group controlId="formBasicStartTime">
        <Form.Label>Inicio de Turno</Form.Label>
        <Form.Control type="time" value={startTime} onChange={handleStartTimeChange} required />
        {startTimeError && <div className="error-message">{startTimeError}</div>}
      </Form.Group>

      <Form.Group controlId="formBasicEndTime">
        <Form.Label>Fin de Turno</Form.Label>
        <Form.Control type="time" value={endTime} onChange={handleEndTimeChange} required />
        {endTimeError && <div className="error-message">{endTimeError}</div>}
      </Form.Group>

      <Button style={{backgroundColor: "#DC3545", marginLeft: "80px"}} variant="danger" type="reset">
        Cancelar
      </Button>
      <Button style={{backgroundColor: "#198754", marginLeft: "80px"}} variant="success" type="submit" onClick={handleSave}>Guardar</Button>

      <h2>Horarios Registrados</h2>
      <ListGroup>
        {shifts.map((shift, index) => (
          <ListGroup.Item key={index}>
            <span>{shift.name} - {shift.startTime} a {shift.endTime}</span>
            {/* <Button variant="danger" size="sm" className="float-right" onClick={() => handleDelete(index)}>
              Eliminar
            </Button> */}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <ToastContainer />

    </div>
  );
}

export default RegistroH;