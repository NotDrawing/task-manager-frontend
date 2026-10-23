# Preguntas de cierre EC2 F3 A8

## 1 ¿Por qué las reglas de validación se colocaron en una utilidad?

Para que exista una sola fuente de las reglas del título. Si las reglas
estuvieran escritas dentro de TaskForm y de TaskItem, habría código
duplicado y, al cambiar una regla, podría actualizarse un componente y
olvidarse el otro. Con la función validateTaskTitle en src/utils, el registro
y la edición aplican exactamente las mismas reglas y es más fácil mantenerlas.

## 2 ¿Qué significa el retorno string o null de validateTaskTitle?

Significa que la función devuelve un mensaje de error (string) cuando el
título tiene un problema, o null cuando el título es válido. Obliga a quien la
usa a comprobar si existe un mensaje antes de continuar: si hay mensaje, se
muestra el error y no se guarda; si es null, se puede registrar o editar la
tarea.

## 3 ¿Qué función cumplen aria-invalid, aria-describedby y role alert?

aria-invalid comunica a las tecnologías de asistencia que el valor del campo
no es válido. aria-describedby vincula el campo con la ayuda y con el mensaje
de error, de modo que un lector de pantalla los lea al enfocar el campo.
role="alert" hace que el mensaje de error se anuncie automáticamente cuando
aparece, sin que el usuario tenga que buscarlo.

## 4 ¿Por qué query, filter y sortBy son estados controlados?

Porque sus valores viven en el estado de App y los controles de TaskFilters
los muestran mediante value, mientras que onChange solicita actualizarlos.
Así React es la fuente de verdad de cada control, y App puede usar esos
valores para calcular la vista y para restablecerlos al limpiar los criterios.

## 5 ¿Por qué visibleTasks no debe almacenarse como estado independiente?

Porque se puede calcular en cada renderizado a partir de tasks, query, filter
y sortBy. Si también se guardara como estado, habría dos colecciones que
sincronizar y podrían quedar inconsistentes, por ejemplo al agregar o
eliminar una tarea y olvidar actualizar la copia. Calcularlo durante el
renderizado garantiza que la vista siempre coincida con el estado principal.

## 6 ¿Cómo se normaliza una búsqueda?

Se eliminan los espacios externos con trim() y se convierte el texto a
minúsculas con toLocaleLowerCase('es-MX'). El título de cada tarea se
convierte también a minúsculas antes de compararlo con includes(). Así,
"Programar", "programar" y " PROGRAMAR " producen la misma coincidencia.

## 7 ¿Por qué se crea una copia antes de utilizar sort?

Porque sort modifica el arreglo sobre el que se ejecuta. Si se ordenara
directamente tasks o el arreglo del estado, se estaría mutando el estado de
React, lo que está prohibido. Con [...filteredTasks].sort(...) se ordena una
copia y el arreglo original permanece intacto.

## 8 ¿Qué responsabilidad tiene task-query.service.ts?

Transformar los datos de consulta: normaliza la búsqueda, filtra por texto y
por estado, y ordena según el criterio elegido, devolviendo un arreglo nuevo.
No conoce componentes ni modifica el estado; recibe tareas y opciones y
devuelve la vista resultante, lo que lo hace fácil de probar y reutilizar.

## 9 ¿Por qué el resultado de JSON.parse se trata como unknown?

Porque JSON.parse puede producir cualquier estructura: un número, un texto,
un objeto o un arreglo con otra forma, especialmente si alguien modificó
localStorage desde las herramientas del navegador. Tratarlo como unknown
obliga a validarlo antes de usarlo como Task[], en lugar de confiar
ciegamente en datos externos.

## 10 ¿Qué comprueba la función isTask?

Comprueba que el valor sea un objeto y que tenga id y title de tipo texto, un
status válido ('pending' o 'completed'), y createdAt y updatedAt como textos
que representen fechas válidas (Date.parse devuelve un número finito). Si el
dato cumple todo, TypeScript lo reconoce como Task; si no, se descarta.

## 11 ¿Qué ventaja ofrece la inicialización diferida de useState?

La función inicializadora se ejecuta solo una vez, al crear el estado, y no
en cada renderizado. Así loadTasks lee localStorage y analiza el JSON una
sola vez al iniciar la aplicación, lo que evita trabajo innecesario durante
los renderizados posteriores.

## 12 ¿Por qué localStorage se sincroniza mediante useEffect?

Porque localStorage es un sistema externo a React y guardar datos es un
efecto secundario que no debe ocurrir durante el renderizado. useEffect se
ejecuta después de renderizar y, con la dependencia [tasks], solo guarda
cuando la colección cambia. Así cada operación CRUD queda reflejada en el
almacenamiento sin escribir en él desde cada manejador.

## 13 ¿Por qué TaskSummary recibe tasks y TaskList recibe visibleTasks?

TaskSummary representa el total real de la aplicación, por lo que debe
calcularse con todas las tareas aunque haya búsqueda o filtros activos.
TaskList solo muestra los resultados de la consulta actual, por lo que
recibe la colección derivada. Si el resumen recibiera visibleTasks, sus
números cambiarían al filtrar, lo cual sería incorrecto.

## 14 ¿Qué información se pierde y cuál permanece al recargar?

Permanecen las tareas (crear, editar, completar y eliminar), porque se
guardan en localStorage como JSON. Se pierden los criterios de consulta
(búsqueda, filtro y orden), el texto escrito en los formularios, cualquier
edición en curso y la página actual de la paginación, porque son estado de
interfaz que no se guarda.

## 15 ¿Qué dificultad encontraste y cómo la resolviste?

Escribe aquí una dificultad real que hayas tenido. Ejemplo: al principio
ordené directamente el arreglo con sort y noté que cambiaba el orden de las
tareas guardadas; lo resolví ordenando una copia con [...filteredTasks]. Otra
dificultad fue entender por qué TaskSummary debía recibir tasks y no
visibleTasks, y lo resolví probando cómo cambiaban los totales al filtrar.
