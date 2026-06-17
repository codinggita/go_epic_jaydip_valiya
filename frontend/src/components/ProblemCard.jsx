import { Link } from 'react-router-dom';
import DifficultyBadge from './DifficultyBadge';
import { ArrowRight, Code2, Hash } from 'lucide-react';
import './ProblemCard.css';

export default function ProblemCard({ problem }) {
  const truncate = (str, len) => {
    if (!str) return '';
    return str.length > len ? str.substring(0, len) + '...' : str;
  };

  return (
    <Link to={`/problems/${problem._id}`} className="problem-card glass-card">
      <div className="problem-card-header">
        <DifficultyBadge difficulty={problem.difficulty} />
        {problem.problem_number && (
          <span className="problem-number">#{problem.problem_number}</span>
        )}
      </div>

      <h3 className="problem-card-title">
        {truncate(problem.instruction, 120)}
      </h3>

      <div className="problem-card-meta">
        {problem.topic && (
          <span className="meta-tag">
            <Hash size={12} />
            {problem.topic}
          </span>
        )}
        {problem.source && (
          <span className="meta-tag">
            <Code2 size={12} />
            {problem.source}
          </span>
        )}
      </div>

      <div className="problem-card-footer">
        <span className="view-link">
          View Problem <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
