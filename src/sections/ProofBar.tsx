export function ProofBar() {
  return (
    <div className="proof-bar">
      <div className="proof-grid">
        <div className="proof-item">
          <div className="proof-num">6<span>+</span></div>
          <div className="proof-label">Shipped Projects</div>
        </div>
        <div className="proof-item">
          <div className="proof-num">900<span>+</span></div>
          <div className="proof-label">Community Members Led</div>
        </div>
        <div className="proof-item">
          <div className="proof-num">1</div>
          <div className="proof-label">Hackathon Win</div>
        </div>
        <div className="proof-item" style={{ borderRight: 'none' }}>
          <div className="proof-num">2</div>
          <div className="proof-label">Internships & Leadership Roles</div>
        </div>
      </div>
    </div>
  );
}
