export default function Badge({ label, type }) {
  return <span className={`badge ${type}`}>{label}</span>;
}
