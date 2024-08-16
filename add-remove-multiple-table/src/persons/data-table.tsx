import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { CSSProperties, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "../components/ui/dropdown-menu";
import { DraggableTableHeader } from "./data-table-column-header";
import { getCommonPinningStyles } from "../lib/getCommonPinningStyle";
import { FooterCell } from "./data-table-column-footer";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  defaultData: TData[];
}

const DragAlongCell = <TData,>({ cell }: { cell: Cell<TData, unknown> }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <TableCell style={style} ref={setNodeRef}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export function DataTable<TData, TValue>({
  columns,
  defaultData,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(() => [...defaultData]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((c) => c.id!)
  );

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    initialState: {
      columnPinning: {
        left: ["id"],
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      columnOrder,
    },
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      addRow: () => {
        setData((old) => [
          ...old,
          {
            id: Math.floor(Math.random() * 10000).toString(),
            firstName: "",
            lastName: "",
            age: 0,
            category: "その他",
            skills: "",
            status: "ToDo",
          } as TData,
        ]);
      },
      removeRow: (rowIndex: number) => {
        setData((old) => old.filter((_row, index) => index !== rowIndex));
      },
      removeSelectedRows: (selectedRows: number[]) => {
        setData((old) =>
          old.filter((_row, index) => !selectedRows.includes(index))
        );
      },
    },
  });

  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="space-y-4">
        <div className="flex items-center">
          <Input
            placeholder="Filter Skills..."
            value={
              (table.getColumn("skills")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("skills")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border max-w-[1000px] overflow-x-auto w-full">
          <Table className="min-w-[800px]">
            <TableHeader>
              <SortableContext
                items={columnOrder}
                strategy={horizontalListSortingStrategy}
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const { id, colSpan, column, getContext } = header;
                      const isPinned = column.getIsPinned();

                      return isPinned === "left" ? (
                        <TableHead
                          key={id}
                          colSpan={colSpan}
                          className="border-b border-solid border-gray-200 bg-white"
                          style={getCommonPinningStyles(column)}
                        >
                          {flexRender(column.columnDef.header, getContext())}
                        </TableHead>
                      ) : id === "remove" ? (
                        <TableHead
                          key={id}
                          colSpan={colSpan}
                          className="border-b border-solid border-gray-200 bg-white"
                        >
                          {flexRender(column.columnDef.header, getContext())}
                        </TableHead>
                      ) : (
                        <DraggableTableHeader
                          header={header}
                          className="border-b border-solid border-gray-200 bg-white"
                        />
                      );
                    })}
                  </TableRow>
                ))}
              </SortableContext>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const { id, column, getContext } = cell;
                      const isPinned = column.getIsPinned();
                      return isPinned === "left" ? (
                        <TableCell
                          key={id}
                          className="border-b border-solid border-border bg-white"
                          style={getCommonPinningStyles(column)}
                        >
                          {flexRender(column.columnDef.cell, getContext())}
                        </TableCell>
                      ) : (
                        <SortableContext
                          key={cell.id}
                          items={columnOrder}
                          strategy={horizontalListSortingStrategy}
                        >
                          <DragAlongCell key={cell.id} cell={cell} />
                        </SortableContext>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end">
          <FooterCell table={table} />
        </div>
        <div className="flex items-center justify-between px-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        </div>
      </div>
    </DndContext>
  );
}
