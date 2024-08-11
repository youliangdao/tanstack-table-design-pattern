import { ColumnDef } from "@tanstack/react-table";

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
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: "性",
  },
  {
    accessorKey: "lastName",
    header: "名",
  },
  {
    accessorKey: "age",
    header: "年齢",
  },
  {
    accessorKey: "category",
    header: "カテゴリ",
  },
  {
    accessorKey: "skills",
    header: "スキル",
  },
  {
    accessorKey: "status",
    header: "ステータス",
  },
];
