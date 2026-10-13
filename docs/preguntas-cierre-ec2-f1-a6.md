# Preguntas de cierre - EC2 F1 A6

## 1. ¿Qué función cumple la interfaz Task?

Define el contrato de datos que debe tener una tarea en la aplicación. En `src/models/task.interface.ts` especifica los campos `id`, `title`, `status`, `createdAt` y `updatedAt` con sus tipos, de modo que cualquier objeto que se trate como `Task` sea consistente en todo el proyecto y TypeScript pueda validarlo.

## 2. ¿Qué diferencia existe entre Task y TaskStatus?

`TaskStatus` es un tipo de unión que representa los valores posibles del estado de una tarea (`'pending' | 'completed'`), mientras que `Task` es una interfaz que describe la estructura completa de una tarea e incluye una propiedad `status` de tipo `TaskStatus`. Es decir, `TaskStatus` es un dato simple y `Task` es el objeto que lo contiene junto con los demás campos.

## 3. ¿Qué significa declarar un arreglo como Task[]?

Significa que la variable es una colección (arreglo) cuyos elementos deben ser del tipo `Task`. Por ejemplo, en `src/data/tasks.ts` la constante `tasks: Task[]` contiene varias tareas y TypeScript verifica que cada elemento cumpla con la interfaz `Task`.

## 4. ¿Qué hace el método map?

Recorre un arreglo y devuelve un **nuevo** arreglo de la misma longitud, aplicando una función de transformación a cada elemento. No modifica el arreglo original; sirve para transformar datos (por ejemplo, convertir objetos en elementos JSX).

## 5. ¿Qué resultado produce map dentro de TaskList?

Produce un arreglo de componentes `<TaskItem />`, uno por cada tarea de la colección. En `TaskList.tsx:34-36` se recorre `tasks` y se genera un `TaskItem` por cada tarea, arreglo que React renderiza dentro del contenedor `task-list`.

## 6. ¿Para qué utiliza React la propiedad key?

Para identificar de forma única cada elemento de una lista. La `key` permite a React saber qué elementos cambiaron, se agregaron o se eliminaron entre renderizados, optimizando las actualizaciones del DOM y evitando errores de reconciliación.

## 7. ¿Por qué se utiliza task.id y no el índice?

Porque `task.id` es un identificador estable y único de cada tarea, mientras que el índice del arreglo puede cambiar cuando se agregan, eliminan o reordenan elementos. Usar el `id` evita que React reutilice o confunda componentes y mantiene el estado correcto de cada tarea.

## 8. ¿Cómo se envía una tarea de TaskList a TaskItem?

Mediante props. `TaskList` renderiza `<TaskItem key={task.id} task={task} />`, pasando la tarea actual en la prop `task`. Dentro de `TaskItem.tsx:15` se recibe con `{ task }: TaskItemProps` y se desestructuran sus campos para mostrarlos.

## 9. ¿Cómo se comunican App, TaskSummary y TaskList?

`App` es el componente contenedor y es dueño de la colección de tareas (importada desde `src/data/tasks.ts`). Comunica los datos a sus hijos mediante props: `<TaskSummary tasks={tasks} />` y `<TaskList tasks={tasks} />`. Así el mismo arreglo se comparte y cada componente lo procesa (el resumen calcula totales y la lista renderiza los ítems).

## 10. ¿Qué es el renderizado condicional?

Es la técnica de mostrar u ocultar contenido según una condición usando operadores como el ternario. En `TaskList.tsx:23-38` se usa `tasks.length === 0 ? ... : ...` para mostrar un estado vacío cuando no hay tareas o la lista cuando sí las hay.

## 11. ¿Por qué el resumen se calcula a partir de la colección?

Porque la colección `tasks` es la única fuente de verdad. Calcular el total, pendientes y completadas a partir de ella garantiza que el resumen siempre esté sincronizado con los datos mostrados, sin duplicar o desincronizar la información. En `TaskSummary.tsx:8-10` se usa `filter` y `length` sobre `tasks`.

## 12. ¿Qué dificultad encontraste durante la refactorización y cómo la resolviste?

La principal dificultad fue separar la aplicación en componentes y lograr que compartieran la misma colección de tareas sin duplicar la información. Se resolvió dejando `App` como contenedor dueño de los datos y pasándolos por props a `TaskSummary` y `TaskList`, además de tipar cada componente con sus propias interfaces de props (`TaskSummaryProps`, `TaskListProps`, `TaskItemProps`) para mantener la consistencia y evitar errores al reutilizar los datos.
