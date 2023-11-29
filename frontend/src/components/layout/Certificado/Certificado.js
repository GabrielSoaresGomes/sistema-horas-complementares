import './certificado.css'

const Certificado = (props) => {
    

    return (
        <div className='Certificado'>
            <img src={props.imagem}/>
            <div className='Dados'>
                <p className='NomeCerificado'>{props.nome}</p>
                <p>|</p>
                <p clAssName='Horas'>{props.horas}  Horas</p>
            </div>
            <p>{props.status}</p>
        </div>
    )
}

export default Certificado