import { TableHead } from "../components/ui/table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Header, flexRender } from "@tanstack/react-table";
import { CSSProperties } from "react";
import { cn } from "../lib/utils";

export const DraggableTableHeader = <TData,>({
  header,
  className,
}: {
  header: Header<TData, unknown>;
  className: string;
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <TableHead
      colSpan={header.colSpan}
      ref={setNodeRef}
      style={style}
      className={cn(className, "cursor-pointer")}
    >
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      <button {...attributes} {...listeners}>
        🟰
      </button>
    </TableHead>
  );
};
