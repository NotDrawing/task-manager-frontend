# Preguntas de cierre - EC2 F2 A7

## 1. ¿Qué diferencia existe entre una variable local y el estado de React?

Una variable local se crea de nuevo en cada ejecución de la función del
componente, por lo que pierde su valor entre renderizados, y cambiarla no
avisa a React que la interfaz debe actualizarse. El estado de React es
memoria que React conserva entre renderizados y, cuando se modifica con su
función actualizadora, React vuelve a renderizar el componente para reflejar
el nuevo valor.

## 2. ¿Qué valores devuelve useState?

Devuelve un arreglo de dos elementos: el valor actual del estado y una
función para solicitar el siguiente valor. Por ejemplo,
`const [tasks, setTasks] = useState<Task[]>(initialTasks)`, donde `tasks` es
el valor actual y `setTasks` la función que lo actualiza.

## 3. ¿Por qué useState se declara en el nivel superior del componente?

Porque React identifica cada Hook por el orden en que se llama en cada
renderizado. Si se declarara dentro de condiciones, ciclos o funciones
anidadas, el orden podría cambiar entre renderizados y React asociaría mal
los valores de estado. En el nivel superior el orden siempre es el mismo.

## 4. ¿Qué significa que un campo sea controlado?

Significa que el valor mostrado en el campo proviene del estado de React
(`value={title}`) y que cada cambio del usuario se envía al estado mediante
`onChange`. Así, React es la fuente de verdad del contenido del campo y no
el DOM.

## 5. ¿Por qué handleSubmit utiliza preventDefault?

Porque el comportamiento predeterminado de un formulario HTML es enviar la
petición y recargar la página, lo que reiniciaría el estado de la
aplicación. `preventDefault` cancela ese comportamiento para que React
procese el envío con JavaScript sin recargar.

## 6. ¿Cómo comunica TaskForm una nueva tarea a App?

App le pasa a TaskForm la función `handleAddTask` mediante la prop
`onAddTask`. Cuando el usuario envía el formulario, TaskForm llama a
`onAddTask(normalizedTitle)` con el título. TaskForm solo informa lo que
ocurrió y App decide cómo crear la tarea y actualizar el estado.

## 7. ¿Por qué App funciona como fuente de verdad?

Porque la colección `tasks` se almacena una sola vez, en App, y desde ahí se
envía por props a TaskSummary y TaskList. Al no haber copias del arreglo en
otros componentes, no hay que sincronizar datos duplicados y el resumen y la
lista siempre coinciden.

## 8. ¿Cómo se implementa Create sin utilizar push?

Se construye un objeto `newTask` y se crea un arreglo nuevo con spread:
`setTasks((currentTasks) => [newTask, ...currentTasks])`. De este modo no se
modifica el arreglo existente, sino que se entrega a React uno nuevo.

## 9. ¿Cómo permite map actualizar una sola tarea?

`map` recorre el arreglo y devuelve uno nuevo. Para cada tarea compara su
`id` con el buscado: si no coincide, devuelve la misma tarea sin cambios; si
coincide, devuelve una copia con los valores nuevos (`{...task, status,
updatedAt}`). Así solo cambia el objeto seleccionado.

## 10. ¿Cómo utiliza filter la operación Delete?

`filter` devuelve un arreglo nuevo con los elementos que cumplen una
condición. En Delete se conservan las tareas cuyo `id` es distinto al
seleccionado (`task.id !== id`), de modo que la tarea eliminada queda fuera
del nuevo arreglo sin modificar el original.

## 11. ¿Por qué se emplea una función actualizadora en setTasks?

Porque el siguiente estado depende del anterior. La función actualizadora
recibe el estado pendiente más reciente (`currentTasks`), lo que evita
trabajar con un valor desactualizado cuando se encolan varias
actualizaciones seguidas.

## 12. ¿Qué información conserva TaskItem como estado local?

Conserva solo estado temporal de la interfaz: `isEditing`, que indica si la
tarea está en modo edición, y `draftTitle`, el borrador del título mientras
se edita. La tarea en sí sigue en el estado de App.

## 13. ¿Por qué los cambios desaparecen al recargar la página?

Porque el estado de React vive en la memoria de la página. Al recargar, el
navegador vuelve a ejecutar la aplicación desde cero y `useState` se
inicializa otra vez con las tareas iniciales. Aún no se usa localStorage ni
una API REST que guarden los datos de forma persistente.

## 14. ¿Qué dificultad encontraste y cómo la resolviste?

Al principio confundí pasar la función como `onClick={handleClick}` con
ejecutarla como `onClick={handleClick()}`, lo que hacía que se ejecutara al
renderizar. Lo resolví pasando la función sin paréntesis, o usando una
función flecha cuando necesitaba enviar el `id`. También me costó entender
que debía crear arreglos nuevos con spread, map y filter en lugar de
modificar el estado con push.
