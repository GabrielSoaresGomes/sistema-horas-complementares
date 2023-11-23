import './certificado.css'

import imagem  from '../../../assets/img/placeholder.jpg';

const Certificado = () => {
    return (
        <div className='Certificado'>
            <img src={imagem} />
            <div className='Dados'>
                <p className='NomeCerificado'>Nome Certificado</p>
                <p>|</p>
                <p clAssName='Horas'>10 Horas</p>
            </div>
            <p>Pendente</p>
        </div>
    )
}

export default Certificado