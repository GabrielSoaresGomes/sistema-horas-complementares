import './adicionar.css'

import imagem  from '../../assets/img/+.png'

const Adicionar = () => {
    return (
        <div className='Adicionar'>
            <div className='Imagem'>
            <img src={imagem} />
            </div>
            <p>Adicionar Certificado</p>
        </div>
    )
}

export default Adicionar