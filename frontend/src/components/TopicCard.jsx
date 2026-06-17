import { Link } from 'react-router-dom';
import { Hash, ChevronRight } from 'lucide-react';
import './TopicCard.css';

export default function TopicCard({ topic }) {
  return (
    <Link
      to={`/problems?topic=${encodeURIComponent(topic.name)}`}
      className="topic-card glass-card"
    >
      <div className="topic-card-icon">
        <Hash size={20} />
      </div>
      <div className="topic-card-body">
        <h4 className="topic-card-name">{topic.name}</h4>
        {topic.description && (
          <p className="topic-card-desc">{topic.description}</p>
        )}
        <div className="topic-card-footer">
          <span className="topic-count">
            {topic.problemCount || 0} problems
          </span>
          <ChevronRight size={16} className="topic-arrow" />
        </div>
      </div>
    </Link>
  );
}
