export type pred = {
    id_proyecto: number,
    id_usuario: number,
    tareas_tipo_1_asignadas: number,
    tareas_tipo_1_completadas: number,
    tareas_tipo_2_asignadas: number,
    tareas_tipo_2_completadas: number,
    tareas_tipo_3_asignadas: number,
    tareas_tipo_3_completadas: number,
    tareas_tipo_4_asignadas: number,
    tareas_tipo_4_completadas: number,
    tareas_tipo_5_asignadas: number,
    tareas_tipo_5_completadas: number,
    tipo_mas_eficiente: number,
    tipo_menos_eficiente: number,
    indice1: GLfloat,
    indice2: GLfloat,
    indice3: GLfloat,
    indice4: GLfloat,
    indice5: GLfloat,
}

export type predProps = {
    user: pred,
    modelo1: (user: pred) => number
}

export type barGraph = {
    user: pred
}