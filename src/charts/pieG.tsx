import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { barGraph } from "../types";

ChartJS.register(ArcElement, Tooltip, Legend)

export function PieG({user}: barGraph){

    const data = {
        labels: ['Tipo 1', 'Tipo 2', 'Tipo 3', 'Tipo 4', 'Tipo 5'],
        datasets: [{
                label: 'adasdad',
                data: [user.tareas_tipo_1_asignadas, user.tareas_tipo_2_asignadas, user.tareas_tipo_3_asignadas, user.tareas_tipo_4_asignadas, user.tareas_tipo_5_asignadas],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 1,
            }
        ]
    }
    return <Pie data={data} />
}