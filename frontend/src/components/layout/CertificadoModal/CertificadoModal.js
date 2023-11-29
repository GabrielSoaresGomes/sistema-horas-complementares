import './certificadomodal.css'

const CertificadoModal = (props) => {

    return (
    <div className='certificadomodal'>
        <form>
            <input placeholder='Nome da Atividade'></input>
            <input placeholder='Quantidade de Horas'></input>
            <input placeholder='Descrição'></input>
            <div>
                <img></img>
                <p></p>
                <button></button>
            </div>
        </form>
    </div>
    )
}

export default CertificadoModal