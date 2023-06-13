import '../style/Modal.css';

const Modal = ({ children }) => {
  return (
    <>
    <h1>MOa</h1>
    
    <article className="modal is-open">
        <div className="modal-container">
            <button className="modal-close">X fdsfa</button>
            {children}  
        </div>
    </article>
    </>
  );
};

export default Modal;