# Preguntas de cierre - EC2 F1 A5

## 1. ¿Qué problema resuelve React al construir una interfaz?

Permite dividir una interfaz compleja en piezas pequeñas y reutilizables
(componentes), en lugar de manejar un solo documento HTML enorme.

## 2. ¿Qué es un componente?

Una función que devuelve la representación de una parte de la interfaz.

## 3. ¿Por qué los componentes comienzan con mayúscula?

Para que React los distinga de las etiquetas HTML normales (<div> vs <TaskForm />).

## 4. ¿Qué diferencia existe entre HTML y TSX?

TSX es una sintaxis parecida a HTML dentro de TypeScript. Usa className y
htmlFor, exige cerrar todas las etiquetas y permite insertar expresiones con llaves.

## 5. ¿Para qué se utiliza className?

Para asignar clases CSS a un elemento, porque class es una palabra reservada
de JavaScript.

## 6. ¿Qué son las propiedades o props?

Datos que un componente padre envía a un componente hijo, como title y status
en TaskItem.

## 7. ¿Cómo ayuda TypeScript a validar las propiedades?

Con interfaces y tipos define qué props existen y de qué tipo son; si se envía
un valor incorrecto, marca error antes de ejecutar la aplicación.

## 8. ¿Cuál es la responsabilidad de App.tsx?

Coordinar la estructura general: importar los componentes y ordenarlos.

## 9. ¿Por qué la interfaz se dividió en varios componentes?

Para separar responsabilidades, facilitar el mantenimiento y reutilizar código.

## 10. ¿Por qué los botones todavía están deshabilitados?

Porque aún no se usan estado ni eventos; eso se verá en actividades posteriores.

## 11. ¿Qué componente consideras más reutilizable y por qué?

TaskItem, porque representa tareas distintas con la misma estructura solo
cambiando las props title y status.

## 12. ¿Qué dificultad encontraste y cómo la resolviste?

(Escribe aquí tu experiencia real.)
