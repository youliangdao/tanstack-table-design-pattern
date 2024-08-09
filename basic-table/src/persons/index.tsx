import { Person, columns } from "./columns";
import { DataTable } from "./data-table";

function getData(): Person[] {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      firstName: "React",
      lastName: "太郎",
      email: "taro@sample.com",
      age: 25,
      category: "フロントエンド",
      skills: "React",
      status: "Done",
    },
    {
      id: "2",
      firstName: "Vue",
      lastName: "花子",
      email: "hanako@sample.com",
      age: 30,
      category: "フロントエンド",
      skills: "Vue",
      status: "In Progress",
    },
    {
      id: "3",
      firstName: "Node",
      lastName: "次郎",
      email: "jiro@sample.com",
      age: 35,
      category: "バックエンド",
      skills: "Node",
      status: "ToDo",
    },
  ];
}

export default function PersonsPage() {
  const data = getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
