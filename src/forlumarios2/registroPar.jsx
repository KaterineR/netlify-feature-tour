import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ParqueoForm() {
  const [horasAbierto, setHorasAbierto] = useState({
    horaAbre: '',
    horaCierra: '',
    diaAbre: '',
    diaCierra: ''
  });
  const [horariosRegistrados, setHorariosRegistrados] = useState([]);
  const [horaAbiError, setHoraAbiError] = useState('');
  const [horaCierError, setHoraCierError] = useState('');
  const [diaAbrError, setDiaAbrError] = useState('');
  const [diaCierrError, setDiaCierrError] = useState('');

  const diasSemana = [
    { value: '', label: 'Selecciona un día' },
    { value: 'Lunes', label: 'Lunes' },
    { value: 'Martes', label: 'Martes' },
    { value: 'Miercoles', label: 'Miércoles' },
    { value: 'Jueves', label: 'Jueves' },
    { value: 'Viernes', label: 'Viernes' },
    { value: 'Sabado', label: 'Sábado' },
    { value: 'Domingo', label: 'Domingo' }
  ];

  const URL_HORARIOPARQUEO ='http://localhost:8000/api/horarioparqueos';

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHorasAbierto({
      ...horasAbierto,
      [name]: value
    });
  };


  

  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {  
  setShowModal(true);
  };
  function resetForm() {
    setShowModal(false)
    setHorasAbierto({
      horaAbre: '',
    horaCierra: '',
    diaAbre: '',
    diaCierra: ''
     
    });
    
  }  

  useEffect(() => {
    axios.get('http://localhost:8000/api/horarioparqueos')
      .then(response => {
        const newShifts = response.data.map(shift => ({
          horaAbre: shift.hora_ini,
          horaCierra: shift.hora_fin,
          diaAbre: shift.dia_ini,
          diaCierra: shift.dia_fin
         
        }));
        setHorariosRegistrados(newShifts);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const handleSubmit = async(event) => {


    event.preventDefault();
    if (!horasAbierto.horaAbre || !horasAbierto.horaCierra || !horasAbierto.diaAbre || !horasAbierto.diaCierra) {
      if (!horasAbierto.horaAbre ) {
        setHoraAbiError("Por favor, complete este campo");
      } else {
        setHoraAbiError("");
      }

      if (!horasAbierto.horaCierra) {
        setHoraCierError("Por favor, complete este campo");
      } else {
        setHoraCierError("");
      }

      if (!horasAbierto.diaAbre ) {
        setDiaAbrError("Por favor, complete este campo");
      } else {
        setDiaAbrError("");
      }
      if (!horasAbierto.diaCierra ) {
        setDiaCierrError("Por favor, complete este campo");
      } else {
        setDiaCierrError("");
      }

      
      return;
    }

  
    // Verificar si el nuevo horario está dentro del rango de alguno de los horarios existentes
    const conflicto = horariosRegistrados.some((horario) => {
      const diaAbre = diasSemana.findIndex((dia) => dia.value === horario.diaAbre);
      const diaCierra = diasSemana.findIndex((dia) => dia.value === horario.diaCierra);
      const nuevoDiaAbre = diasSemana.findIndex((dia) => dia.value === horasAbierto.diaAbre);
      const nuevoDiaCierra = diasSemana.findIndex((dia) => dia.value === horasAbierto.diaCierra);
  
      if (diaAbre <= nuevoDiaAbre && nuevoDiaAbre <= diaCierra) {
        return true; // Nuevo horario está dentro del rango de horario existente
      }
  
      if (diaAbre <= nuevoDiaCierra && nuevoDiaCierra <= diaCierra) {
        return true; // Nuevo horario está dentro del rango de horario existente
      }
  
      if (nuevoDiaAbre <= diaAbre && diaCierra <= nuevoDiaCierra) {
        return true; // Horario existente está dentro del rango del nuevo horario
      }
  
      return false;

    });
  
    if (conflicto) {
      alert('El nuevo horario está dentro del rango de un horario existente. Por favor, seleccione otro horario.');
      
      return;
    }

    const horaAbre = new Date(`2000-01-01T${horasAbierto.horaAbre}`);
    const horaCierra = new Date(`2000-01-01T${horasAbierto.horaCierra}`);
  
    // Comparar las horas
    if (horaCierra < horaAbre) {
      alert('la hora de cierre es menor a la hora de apertura .');
     
      return;
    }
  
    // Si no hay conflictos, agregar el nuevo horario a la lista
    setHorariosRegistrados([...horariosRegistrados, horasAbierto]);
  
    await axios.post(URL_HORARIOPARQUEO, 
      {
        hora_ini: horasAbierto.horaAbre,
        hora_fin: horasAbierto.horaCierra,
        dia_ini: horasAbierto.diaAbre,
        dia_fin: horasAbierto.diaCierra,
        id_parqueo: null
      })

    resetForm();
    notificacion();
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
  } 
  return (
      < >
       <div className="d-flex align-items-center" style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} className="mx-auto">
      <h1>Registro de Horarios de Atencion</h1>
        <Form.Group>
          <Form.Label>Hora de apertura</Form.Label>
          <Form.Control type="time" name="horaAbre" value={horasAbierto.horaAbre} onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Hora de cierre</Form.Label>
          <Form.Control type="time" name="horaCierra" value={horasAbierto.horaCierra} onChange={handleInputChange} required/>
        </Form.Group>
      <Form.Group>
        <Form.Label>Día de apertura</Form.Label>
        <Form.Control as="select" name="diaAbre" value={horasAbierto.diaAbre} onChange={handleInputChange} required>
          {diasSemana.map((dia) => (
            <option key={dia.value} value={dia.value}>
              {dia.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Día de cierre</Form.Label>
        <Form.Control as="select" name="diaCierra" value={horasAbierto.diaCierra} onChange={handleInputChange} required>
          {diasSemana.map((dia) => (
            <option key={dia.value} value={dia.value}>
              {dia.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

               
        <Button style={{backgroundColor: "#DC3545", marginLeft: "80px"}} onClick={handleClick}  variant="danger" >Cancelar </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmar acción</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>¿Estás seguro de cancelar el registro?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      no
                    </Button>
                    <Button variant="primary" onClick={ resetForm} >
                      
                      si
                    </Button>
                  </Modal.Footer>
               </Modal>


      <Button style={{backgroundColor: "#198754", marginLeft: "80px"}} type="submit">Registrar</Button>
      <ul>
            {horariosRegistrados.map((horario, index) => (
                <li key={index}>
                Horario {index + 1}: se abre de {horario.horaAbre} a {horario.horaCierra} de {horario.diaAbre} a {horario.diaCierra}
                </li>
            ))}
            </ul>

    </Form>
    <ToastContainer />
              
            </div>
            </>
  );
}

export default ParqueoForm;