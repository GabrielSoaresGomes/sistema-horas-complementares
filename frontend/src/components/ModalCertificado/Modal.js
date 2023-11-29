import HeaderModal from '../layout/HeaderModal/HeaderModal';
import './modal.css';

const Modal = ({ handleClose, show, children, pagina }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <HeaderModal pagina={pagina}/>
        <button type="button" onClick={handleClose}>
          X
        </button>
      </section>
    </div>
  );
};

export default Modal