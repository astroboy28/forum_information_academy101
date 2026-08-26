import { useState } from "react";
import { Link } from "react-router-dom";
import StudentCard from "./StudentCard";

const students = [
  { id: 1, name: "Oshadha", studentNumber: "202520", nationality: "Sri Lanka" },
  { id: 2, name: "Kenji", studentNumber: "202521", nationality: "Japan" },
  { id: 3, name: "Maria", studentNumber: "202522", nationality: "Philippines" },
];

function StudentList() {
  const [search, setSearch] = useState("");

  const [nationality, setNationality] = useState("All");

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())&&
    (nationality === "All" || s.nationality === nationality)
  );

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..."
      />
      <select value={nationality} onChange={(e) => setNationality(e.target.value)}>
        <option value="All">All nationalities</option>
        {[...new Set(students.map((s) => s.nationality))].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      {filtered.map((s) => (
        <Link key={s.id} to={`/students/${s.id}`}>
          <StudentCard
            name={s.name}
            studentNumber={s.studentNumber}
            nationality={s.nationality}
          />
        </Link>
      ))}
    </div>
  );
}

export default StudentList;

