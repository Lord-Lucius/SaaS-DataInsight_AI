// components/Layout.jsx
import Sidebar from "./SideBar";
import Upload from "./FileUpload";

export default function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Upload />
      </main>
    </div>
  );
}