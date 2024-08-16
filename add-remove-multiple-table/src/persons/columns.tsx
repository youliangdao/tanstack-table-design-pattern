import { Button } from "../components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { EditableCell } from "./data-table-editable-cell";
import { RemoveRowCell } from "./data-table-remove-row";

export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  category: "バックエンド" | "フロントエンド" | "インフラ" | "その他";
  skills: string;
  status: "ToDo" | "In Progress" | "Done";
};

export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: EditableCell,
  },
  {
    accessorKey: "firstName",
    id: "firstName",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          性
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: EditableCell,
  },
  {
    accessorKey: "lastName",
    id: "lastName",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          名
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: EditableCell,
  },
  {
    accessorKey: "age",
    id: "age",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          年齢
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: EditableCell,
  },
  {
    accessorKey: "category",
    id: "category",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          カテゴリー
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: EditableCell,
  },
  {
    accessorKey: "skills",
    id: "skills",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          スキル
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: EditableCell,
  },
  {
    accessorKey: "status",
    id: "status",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ステータス
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: EditableCell,
  },
  {
    id: "remove",
    cell: RemoveRowCell,
  },
];
