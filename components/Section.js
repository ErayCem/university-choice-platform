export default function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      {children}
    </div>
  );
}
