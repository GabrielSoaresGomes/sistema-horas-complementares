import './certificadomodal.css'

const CertificadoModal = (props) => {

    const aoSalvar = (evento) => {
    evento.preventDefault()


    }
     

    return (
        <div  className='formulariocertificado'>   
                 
          <form action="/certificados" id='certificado' onSubmit={aoSalvar}>
          
          <div >
            <div>
              <input   className='atividade' type="text" placeholder='Nome da Atividade' required autocomplete="off" />
              <input   className='horas' type="text"  placeholder='Quantidade de Horas' required autocomplete="off"/>
            </div>
          </div>

          <div>
            <textarea className='descricao' form="certificado" placeholder='Descrição'></textarea>
          </div>
          
          <div>
            <input className='arquivo' type="file"  required autocomplete="off"/> 
          </div>

          <button>Enviar Certificado</button>

          </form>

          

        </div>       
    )
}

export default CertificadoModal