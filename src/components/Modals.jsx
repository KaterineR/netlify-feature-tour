import React from 'react'
import Modal from './Modal'

const Modals = () => {
  return (
    <div>
        <h2>Modales</h2>
        <button>Modal 1</button>
        <Modal>
            <h3>Modal Prueba</h3>
            <p>Contenido del modal 1</p>
        </Modal>
    </div>
  )
}

export default Modals