import { Chart } from "react-google-charts";
import "./index.css";

export const data = [
    ["Talvez", "MT TALVEZ"],
    ["Necessárias", 180],
    ["Aprovadas", 20],
    ["Aguardando", 60],
]

export const options = {
    pieHole: 0.35,
    legend: 'top',
    is3D: false,
    slices: {
        0: { color: "#a6a1a6" },
        1: { color: "green" },
        2: { color: "blue" },
    },
};


const horasTotais = () => {
    return (
        <div className={'graph-container'}>
            <Chart
                className={'graph-container'}
                chartType="PieChart"
                width="600px"
                height="70vh"
                data={data}
                options={options}
            />
        </div>
    );
}

export default horasTotais;