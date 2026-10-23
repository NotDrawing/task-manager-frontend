interface TaskPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function TaskPagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: TaskPaginationProps) {
  return (
    <nav className="pagination" aria-label="Paginación de tareas">
      <button type="button" onClick={onPrevious} disabled={currentPage <= 1}>
        Anterior
      </button>

      <p className="pagination__status" role="status">
        Página {currentPage} de {totalPages}
      </p>

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage >= totalPages}
      >
        Siguiente
      </button>
    </nav>
  );
}
