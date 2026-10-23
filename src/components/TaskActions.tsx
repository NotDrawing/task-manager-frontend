interface TaskActionsProps {
  completedCount: number;
  onClearCompleted: () => void;
}

export function TaskActions({
  completedCount,
  onClearCompleted,
}: TaskActionsProps) {
  return (
    <section className="task-actions" aria-label="Acciones generales de tareas">
      <p className="helper-text">
        {completedCount === 1
          ? "1 tarea completada"
          : `${completedCount} tareas completadas`}
      </p>

      <button
        type="button"
        className="button-danger"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Eliminar completadas
      </button>
    </section>
  );
}
