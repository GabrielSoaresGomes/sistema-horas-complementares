import Modal from '../ModalCertificado/Modal.js';
import CertificadoModal from '../layout/CertificadoModal/CertificadoModal.js';
import React, { Component } from "react";
import './adicionar.css'

import imagem  from '../../assets/img/+.png'

class Adicionar extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <main>

        <div className='Adicionar'>
            <div className='Imagem'>
            <button type="button" onClick={this.showModal}> <img src={imagem} /></button>
            </div>
            <Modal show={this.state.show} handleClose={this.hideModal} pagina='Adicionar Certificado'>
            <CertificadoModal />
             </Modal>
            <p>Adicionar Certificado</p>
        </div>

      </main>
    );
  }
}

export default Adicionar





