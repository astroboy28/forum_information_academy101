import { Link } from "react-router-dom";
import { JLPTBadge, StatusBadge } from "../components/Badges";

const students = [
  { id: 1, student_number: "2025001", call_name: "Oshadha", full_name: "PARANAMANA OSHADHA", age: 27, gender_display: "Male", nationality: "Sri Lanka", class_name: "2-B", jlpt_level: "N3", is_active: true },
];

export default function StudentListPage() {
  return (
    <div className="p-8 max-w-6xl">
      <h1 className="font-display font-bold text-2xl mb-6">Students</h1>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-paper)] text-left text-[var(--color-ink-soft)]">
              <th className="px-4 py-3 font-medium">Student #</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Age</th>
              <th className="px-4 py-3 font-medium">Nationality</th>
              <th className="px-4 py-3 font-medium">Class</th>
              <th className="px-4 py-3 font-medium">JLPT</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-paper)]">
                <td className="px-4 py-3 font-mono text-xs">{s.student_number}</td>
                <td className="px-4 py-3">
                  <Link to={`/students/${s.id}`} className="font-medium hover:text-[var(--color-indigo-600)]">{s.call_name}</Link>
                </td>
                <td className="px-4 py-3">{s.age}</td>
                <td className="px-4 py-3">{s.nationality}</td>
                <td className="px-4 py-3">{s.class_name}</td>
                <td className="px-4 py-3"><JLPTBadge level={s.jlpt_level} /></td>
                <td className="px-4 py-3"><StatusBadge active={s.is_active} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}