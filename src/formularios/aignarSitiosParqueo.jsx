import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Button, Modal } from 'react-bootstrap';

function AsignarSitiosParqueo() {
  const [users, setUsers] = useState([]);
  const [zones, setZones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedZoneData, setSelectedZoneData] = useState(null);
  const [pendingUsers, setPendingUsers] = useState([]);

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then(response => {
        const filteredUsers = response.data.filter(user => user.solicitud_parqueo === 1);
        setUsers(filteredUsers);
        
        const pendingUsers = response.data.filter(user => user.solicitud_parqueo === 2);
        setPendingUsers(pendingUsers);
      })
      .catch(error => {
        console.error(error);
      });

      axios.get('http://localhost:8000/api/zonas')
      .then(response => {
        const zonesData = response.data
          .map(zona => ({
            id: zona.id,
            nombre: zona.nombre,
            sitios: zona.sitios ? zona.sitios.split(',').map(sitio => sitio.trim()) : null
          }))
          .filter(zona => zona.sitios !== null);
    
        setZones(zonesData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleRandomClick = (userId) => {
    const randomZoneIndex = Math.floor(Math.random() * zones.length);
    const randomZone = zones[randomZoneIndex];

    if (randomZone && randomZone.sitios.length > 0) {
      const randomSiteIndex = Math.floor(Math.random() * randomZone.sitios.length);
      const randomSite = randomZone.sitios[randomSiteIndex];

      const updatedSites = randomZone.sitios.filter(
        (site, index) => index !== randomSiteIndex
      );

      setSelectedZoneData({
        ...randomZone,
        sitios: updatedSites,
      });

      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            sitioAsignado: randomSite,
            nombreZona: randomZone.nombre,
            idZona: randomZone.id,
          };
        }
        return user;
      });

      const updatedZones = zones.map((zone) => {
        if (zone.id === randomZone.id) {
          return {
            ...zone,
            sitios: updatedSites,
          };
        }
        return zone;
      });

      setUsers(updatedUsers);
      setZones(updatedZones);

      // Actualizar la base de datos
      const updatedSitesString = updatedSites.length > 0 ? updatedSites.join(',') : null;
      axios.put(`http://localhost:8000/api/zonas/${randomZone.id}`, { sitios: updatedSitesString, nro_sitios: updatedSites.length })
        .then(response => {
          console.log('Sitios disponibles actualizados en la base de datos:', response.data);
        })
        .catch(error => {
          console.error('Error al actualizar los sitios disponibles en la base de datos:', error);
        });

      if (randomSite) {
        const user = users.find((user) => user.id === userId);

        axios
          .put(`http://localhost:8000/api/users/${userId}`, {
            name: user.name,
            apellido: user.apellido,
            dni: user.dni,
            foto_perfil: null,
            telefono: user.telefono,
            direccion: user.direccion,
            email: user.email,
            password: user.password_confirmed,
            password_confirmed: user.password_confirmed,
            tipo_usuario: 4,
            cargo: user.cargo,
            departamento: user.departamento,
            solicitud_parqueo: 2,
            sitio: randomSite,
            id_zona: randomZone.id // Agregar el ID de la zona seleccionada
          })
          .then((response) => {
            console.log('Sitio asignado:', response.data);
            // Remover al usuario de la lista de usuarios que solicitan parqueo
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
          })
          .catch((error) => {
            console.error('Error al actualizar la base de datos:', selectedUserId);
          });
      }
    }
  };

  const handleManualClick = (userId) => {
    openModal(userId);
  };

  const handleZoneSelect = (zoneId, siteIndex) => {
    const selectedZone = zones.find((zone) => zone.id === zoneId);
    if (selectedZone && selectedZone.sitios[siteIndex]) {
      const selectedSite = selectedZone.sitios[siteIndex];

      const updatedSites = selectedZone.sitios.filter(
        (site, index) => index !== siteIndex
      );

      setSelectedZoneData({
        ...selectedZone,
        sitios: updatedSites,
      });

      const updatedUsers = users.map((user) => {
        if (user.id === selectedUserId) {
          return {
            ...user,
            sitioAsignado: selectedSite,
            nombreZona: selectedZone.nombre,
            idZona: selectedZone.id, // Agregar el ID de la zona seleccionada
          };
        }
        return user;
      });

      const updatedZones = zones.map((zone) => {
        if (zone.id === zoneId) {
          return {
            ...zone,
            sitios: updatedSites,
          };
        }
        return zone;
      });

      setUsers(updatedUsers);
      setZones(updatedZones);
      closeModal();

      // Actualizar la base de datos
      const updatedSitesString = updatedSites.length > 0 ? updatedSites.join(',') : null;
      axios
        .put(`http://localhost:8000/api/zonas/${zoneId}`, { sitios: updatedSitesString, nro_sitios: updatedSites.length })
        .then((response) => {
          console.log('Sitios disponibles actualizados en la base de datos:', response.data);
        })
        .catch((error) => {
          console.error('Error al actualizar los sitios disponibles en la base de datos:', error);
        });

      // Actualizar la base de datos del usuario si selectedSite está definido
      if (selectedSite) {
        const user = users.find((user) => user.id === selectedUserId);
        console.log(user.sitioAsignado);
        axios
          .put(`http://localhost:8000/api/users/${selectedUserId}`, {
            name: user.name,
            apellido: user.apellido,
            dni: user.dni,
            foto_perfil: null,
            telefono: user.telefono,
            direccion: user.direccion,
            email: user.email,
            password: user.password_confirmed,
            password_confirmed: user.password_confirmed,
            tipo_usuario: 4,
            cargo: user.cargo,
            departamento: user.departamento,
            solicitud_parqueo: 2,
            sitio: selectedSite,
            id_zona: selectedZone.id // Agregar el ID de la zona seleccionada
          })
          .then((response) => {
            console.log('Sitio asignado:', response.data.sitioAsignado);
            // Remover al usuario de la lista de usuarios que solicitan parqueo
            const updatedUsers = users.filter(user => user.id !== selectedUserId);
            setUsers(updatedUsers);
          })
          .catch((error) => {
            console.error('Error al actualizar la base de datos:', selectedUserId);
          });
      }
    }
  };

  const handleSiteDelete = () => {
    closeModal();
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h2>Lista de usuarios que solicitan parqueos</h2>
        <h4>Zonas disponibles:</h4>
        <ul>
          {zones.map((zone, index) => (
            <li key={index}>
              {zone.nombre} tiene: {zone.sitios.length} sitios disponibles
            </li>
          ))}
        </ul>
        {users.length > 0 ? (
          <ListGroup>
            {users.map((user) => (
              <ListGroup.Item key={user.id}>
                <h4>{user.name}</h4>
                <h4>{user.apellido}</h4>
                <p>DNI: {user.dni}</p>
                <p>Email: {user.email}</p>
                <p>Telefono: {user.telefono}</p>
                {user.sitioAsignado && (
                  <>
                    <p>Sitio asignado: {user.sitioAsignado}</p>
                    <p>Nombre de la zona: {user.nombreZona}</p>
                  </>
                )}
                <Button style={{backgroundColor: "#198754", marginLeft: "50px"}} variant="primary" onClick={() => handleRandomClick(user.id)}>
                  Aleatorio
                </Button>{" "}
                <Button style={{backgroundColor: "#198754", marginLeft: "50px"}} variant="secondary" onClick={() => handleManualClick(user.id)}>
                  Manual
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No hay solicitudes de sitios de parqueo.</p>
        )}

        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Seleccionar zona</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {zones.map((zone, index) => (
              <div key={index}>
                <h5>{zone.nombre}</h5>
                <p>Sitios disponibles: </p>
                <ul>
                  {zone.sitios.map((sitio, sitioIndex) => (
                    <li key={sitioIndex} onClick={() => handleZoneSelect(zone.id, sitioIndex)}>
                      {sitio}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleSiteDelete}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

     
    </div>
  );
}

export default AsignarSitiosParqueo;