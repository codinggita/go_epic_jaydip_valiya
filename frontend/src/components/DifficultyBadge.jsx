import './DifficultyBadge.css';

const difficultyOrder = ['beginner', 'easy', 'medium', 'intermediate', 'advanced', 'hard'];

export default function DifficultyBadge({ difficulty }) {
  if (!difficulty) return <span className="badge badge-unknown">Unknown</span>;

  return (
    <span className={`badge badge-${difficulty.toLowerCase()}`}>
      <span className="badge-dot" />
      {difficulty}
    </span>
  );
}
