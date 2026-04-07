const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-links">
        <div className="active-link"><i className="icon-home"></i> Dashboard</div>
        <div><i className="icon-book"></i> Courses</div>
        <div><i className="icon-chart"></i> Progress</div>
      </div>
      <div className="sidebar-footer">
        {/* Help Center atau Mode Gelap/Terang */}
      </div>
    </aside>
  );
}

export default Sidebar;