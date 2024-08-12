import { Person, columns } from "./columns";
import { DataTable } from "./data-table";

function getData(): Person[] {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      firstName: "React",
      lastName: "太郎",
      age: 25,
      category: "フロントエンド",
      skills: "React",
      status: "Done",
    },
    {
      id: "2",
      firstName: "Vue",
      lastName: "花子",
      age: 30,
      category: "フロントエンド",
      skills: "Vue",
      status: "In Progress",
    },
    {
      id: "3",
      firstName: "Node",
      lastName: "次郎",
      age: 35,
      category: "バックエンド",
      skills: "Node",
      status: "ToDo",
    },
    {
      id: "4",
      firstName: "Angular",
      lastName: "四郎",
      age: 28,
      category: "フロントエンド",
      skills: "Angular",
      status: "In Progress",
    },
    {
      id: "5",
      firstName: "AWS",
      lastName: "五郎",
      age: 32,
      category: "インフラ",
      skills: "AWS",
      status: "ToDo",
    },
    {
      id: "6",
      firstName: "Linux",
      lastName: "六郎",
      age: 40,
      category: "インフラ",
      skills: "Linux",
      status: "Done",
    },
    {
      id: "7",
      firstName: "Ruby",
      lastName: "七郎",
      age: 27,
      category: "フロントエンド",
      skills: "Ruby",
      status: "In Progress",
    },
    {
      id: "8",
      firstName: "スクラム",
      lastName: "八郎",
      age: 33,
      category: "その他",
      skills: "C#",
      status: "ToDo",
    },
    {
      id: "9",
      firstName: "PHP",
      lastName: "九郎",
      age: 29,
      category: "バックエンド",
      skills: "PHP",
      status: "Done",
    },
    {
      id: "10",
      firstName: "TypeScript",
      lastName: "十郎",
      age: 31,
      category: "フロントエンド",
      skills: "TypeScript",
      status: "In Progress",
    },
    {
      id: "11",
      firstName: "Go",
      lastName: "十一郎",
      age: 36,
      category: "バックエンド",
      skills: "Go",
      status: "ToDo",
    },
    {
      id: "12",
      firstName: "Rust",
      lastName: "十二郎",
      age: 34,
      category: "バックエンド",
      skills: "Rust",
      status: "Done",
    },
    {
      id: "13",
      firstName: "Swift",
      lastName: "十三郎",
      age: 26,
      category: "その他",
      skills: "Swift",
      status: "In Progress",
    },
    {
      id: "14",
      firstName: "Kotlin",
      lastName: "十四郎",
      age: 37,
      category: "バックエンド",
      skills: "その他",
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
