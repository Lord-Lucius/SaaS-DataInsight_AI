export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Datasets</h2>

      <button className="new-btn">+ New dataset</button>

      <ul className="dataset-list">
        <li>sales.csv</li>
        <li>users.csv</li>
      </ul>
    </aside>
  );
}