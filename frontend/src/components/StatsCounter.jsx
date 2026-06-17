import './StatsCounter.css';

export default function StatsCounter({ label, value, icon: Icon, color = 'cyan', subtext = '' }) {
  return (
    <div className={`stats-card glass-card border-${color}`}>
      <div className="stats-card-content">
        <div className="stats-card-info">
          <span className="stats-card-label">{label}</span>
          <h2 className="stats-card-value">{value}</h2>
          {subtext && <span className="stats-card-subtext">{subtext}</span>}
        </div>
        <div className={`stats-card-icon-wrapper icon-bg-${color}`}>
          <Icon size={24} className="stats-card-icon" />
        </div>
      </div>
      <div className={`stats-card-glow glow-${color}`} />
    </div>
  );
}
