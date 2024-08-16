import { Column } from "@tanstack/react-table";
import { CSSProperties } from "react";

export const getCommonPinningStyles = <TData>(
  column: Column<TData>
): CSSProperties => {
  const isLastPinnedColumn = column?.getPinnedIndex() === 0;

  return {
    boxShadow: isLastPinnedColumn ? "-4px 0 4px -4px gray inset" : undefined,
    left: `${column.getStart("left")}px`,
    width: column.getSize(),
    opacity: 1,
    position: "sticky",
    zIndex: 1,
  };
};
