import React, { useState } from "react";
import './horasTotais.css'

import graficoHoras from '../../assets/img/grafico-horas.svg';
import horasCinza from '../../assets/img/horasCinza.svg';
import horasAzul from '../../assets/img/horasAzul.svg';

const HorasTotais = () => {

    return (
        <div className="content">
            <div className="card">
                <div className="card-header">
                    <div className="heading">
                        <img className="img" src={graficoHoras} />
                        <div className="text-wrapper">Grafico de Horas Totais</div>
                    </div>
                    <p className="div">Verifique a quantidade de horas que faltam para se formar.</p>
                </div>
                <div className="card-body">
                    <div className="chart-leyend">
                        <div className="frame-horas">
                            <img className="rectangle" src={horasCinza} />
                            <div className="text-wrapper-2">Horas Necessárias</div>
                        </div>
                        <div className="frame-horas">
                            <img className="rectangle" src={horasAzul} />
                            <div className="text-wrapper-2">Horas Aguardando Aprovação</div>
                        </div>
                        <div className="frame-horas">
                            <div className="rectangle-2"></div>
                            <div className="text-wrapper-2">Horas Aprovadas</div>
                        </div>
                    </div>
                </div>
                <div className="chart-graphic-wrapper">
                    <div className="chart-graphic">
                        <div className="overlap-group">
                            <div className="ellipse"></div>
                            <img className="ellipse-2" src="img/ellipse-20.svg" />
                            <img className="ellipse-3" src="img/ellipse-19.svg" />
                            <img className="ellipse-4" src="img/ellipse-17.svg" />
                            <div className="ellipse-5"></div>
                            <div className="element">78%</div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="media"><div class="media-body"></div></div>
                </div>
            </div>
        </div>
    )
}

export default HorasTotais