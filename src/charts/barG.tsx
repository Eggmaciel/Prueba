import React from "react";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { barGraph } from "../types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

 const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };

const labels = ['Tipo 1', 'Tipo 2', 'Tipo 3', 'Tipo 4', 'Tipo 5']

export function BarG({user}: barGraph){

    const data = {
        labels,
        datasets: [
            {
                label: 'Tareas asignadas',
                data: [user.tareas_tipo_1_asignadas,user.tareas_tipo_2_asignadas,user.tareas_tipo_3_asignadas,user.tareas_tipo_4_asignadas,user.tareas_tipo_5_asignadas],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Tareas completadas',
                data: [user.tareas_tipo_1_completadas,user.tareas_tipo_2_completadas,user.tareas_tipo_3_completadas,user.tareas_tipo_4_completadas,user.tareas_tipo_5_completadas],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ]

    }

    return <Bar options={options} data={data}/>;

}