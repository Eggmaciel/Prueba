
Los objetivos de la aplicación:

1.- Recuperar los datos de usuario de la base de datos, en especifico el nombre, y las estadisticas de las tareas completadas y asignadas de cada tipo.

El archivo Data/server.js sirve como servidor web para enviar la petición al gestor mediante express 

los datos se guardan mendiante un useState llamado "usuarios" con estos datos se generan las fichas de cada uno de los integrantes del equipo y un boton "Medir".

2.- Calcular los indices correspondientes del usuario al que se quiere medir su desempeño, enviar los datos al modelo para obtener la prediccion.

La función array calcula los indices correspondientes de cada tipo de tarea

Se hace una rregla de 3 donde se calcula el porcentaje de completado de cada tarea, esto con los datos "tareas_tipo_x_completadas" y "tareas_tipo_x_asignadas", esto se va a guardar en un arreglo de tip GLfloat.

indices[0] = ((est_user.tareas_tipo_1_completadas* 100)/est_user.tareas_tipo_1_asignadas)

Una vez calculado el porcentaje, este mismo se multiplica por un indice el cual varia segun el tipo de tarea que sea y el resultado se suma al mismo indice. Este proceso se hace por los 5 tipos de tarea y al final la funcion retorna un array con los cinco indices ya listos para enviar al modelo.

indices[0] += (indices[0] * 0.1)

Para poder enviarlo al modelo, se utiliza la funcion "modelo1(index: GLfloat[])" en el archivo "hooks/script.ts", el cual hace una fetch al modelo desde un servidor en Flask, el cual una API hecha en python recive los datos los pone en el modelo y este regresa la prediccion, donde es recibido por la función "modelo1()" y lo retorna en un JSON. 

3.- Al presionar el boton "medir" se debera mostrar los datos correspondientes del usuario al que se presiono el boton, se manda a llamar la funcion "modelo1" de la cual se debe mostrar el resultado y por ultimo se generan los diagramas correspondientes.

Para que se muestre los diagramas y la predicción se propuso utilizar un useState, el cual al cambiar su valor mostrara los datos correspondientes 

Notas

el SQL utilizado se encuentra en la carpeta "Data" y el api de Piton se encuentra en "Hooks"

