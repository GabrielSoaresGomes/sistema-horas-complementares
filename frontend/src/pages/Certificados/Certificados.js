import './certificados.css'

import Certificado from '../../components/layout/Certificado/Certificado';
import Adicionar from '../../components/Adicionar/Adicionar';

import { useState } from "react";



const Certificados = () => {

    const certificados = [
        {
          nome: "Curso Photoshop",
          horas: "15",
          status: "Aprovado",
          imagem: "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/72034828085/original/5bq9ZOJZHwO5jISQT6_wxaLNhYBKyjB7cg.png?1674489608",
        },
        {
            nome: "Palestra",
            horas: "40",
            status: "Aprovado",
            imagem: "https://marketplace.canva.com/EAFYPPj1Lsk/1/0/1600w/canva-certificado-de-conclus%C3%A3o-simples-azul-GSpXqEfjO7Y.jpg",
        },
        {
            nome: "Mentoria",
            horas: "37",
            status: "Aprovado",
            imagem: "https://ievi.com.br/wp-content/uploads/2009/06/Certificado-Coaching.png",
          },
          {
              nome: "Curso",
              horas: "25",
              status: "Pendente",
              imagem: "https://marketplace.canva.com/EAE52XadGp0/1/0/1600w/canva-certificado-de-conclus%C3%A3o-de-curso-livre-monocrom%C3%A1tico-UrLmdESIErE.jpg",
          },
          {
            nome: "Evento",
            horas: "20",
            status: "Pendente",
            imagem: "https://marketplace.canva.com/EAEumk5hkWI/1/0/1600w/canva-certificado-de-aprecia%C3%A7%C3%A3o-com-borda-em-roxo-e-dourado-5fiwm3jqTNk.jpg",
          },
          {
              nome: "Palestra",
              horas: "5",
              status: "Rejeitado",
              imagem: "https://www.ufc.br/images/ft_230628_certifica1_gr.png",
          },
          {
            nome: "Seminario",
            horas: "5",
            status: "Aprovado",
            imagem: "https://unidas.org.br/wp-content/uploads/2022/05/Certificado-Seminario-e1652208910139.png",
          },
          {
              nome: "Curso c#",
              horas: "5",
              status: "Aprovado",
              imagem: "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/72034828085/original/5bq9ZOJZHwO5jISQT6_wxaLNhYBKyjB7cg.png?1674489608",
          },
      ];
    
    return (
        <section>
        {certificados.map((certificado) => (
        <Certificado nome={certificado.nome} horas={certificado.horas} status={certificado.status} imagem={certificado.imagem}/>
        ))}
        <Adicionar 
        />
        </section>
    );

}

export default Certificados;