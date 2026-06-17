import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import DifficultyBadge from '../components/DifficultyBadge';
import CodeBlock from '../components/CodeBlock';
import { ChevronLeft, ExternalLink, Tag, Code2, Cpu, FileText, FileCode, CheckSquare, ArrowRight, Shuffle } from 'lucide-react';
import './ProblemDetail.css';

export default function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get(`/problems/${id}`);
        setProblem(res.data.data);
      } catch (err) {
        console.error('Error fetching problem details:', err);
        setError('Problem not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  const handleNextRandom = async () => {
    try {
      const res = await api.get('/problems/random');
      if (res.data.success && res.data.data) {
        navigate(`/problems/${res.data.data._id}`);
      }
    } catch (err) {
      console.error('Failed to get random problem:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading problem description...</p>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="problem-error-container glass-card animate-fadeIn">
        <h2>Error Loading Problem</h2>
        <p>{error || 'We could not find the problem you are looking for.'}</p>
        <Link to="/problems" className="btn btn-primary mt-md">
          <ChevronLeft size={16} /> Back to Explorer
        </Link>
      </div>
    );
  }

  // Format complexity score to integer if it's a float
  const complexity = problem.complexity_score 
    ? Math.round(problem.complexity_score) 
    : null;

  return (
    <div className="problem-detail-container animate-fadeIn">
      {/* Navigation Top bar */}
      <div className="problem-detail-nav">
        <Link to="/problems" className="back-link">
          <ChevronLeft size={16} /> Back to Problems
        </Link>
        <button onClick={handleNextRandom} className="btn btn-secondary btn-sm next-challenge-btn">
          Next Random <Shuffle size={14} />
        </button>
      </div>

      <div className="problem-detail-grid">
        {/* Left Side: Description & Instruction */}
        <div className="problem-left-panel">
          <div className="problem-main-card glass-card">
            <div className="problem-detail-header">
              <div className="problem-header-badges">
                <DifficultyBadge difficulty={problem.difficulty} />
                {problem.problem_number && (
                  <span className="problem-number">LeetCode #{problem.problem_number}</span>
                )}
                {problem.content_type && (
                  <span className="badge badge-content-type">
                    <FileText size={12} />
                    {problem.content_type.replace('_', ' ')}
                  </span>
                )}
              </div>
              <h2 className="problem-detail-title">
                {problem.problem_number ? `Problem #${problem.problem_number}` : 'Coding Challenge'}
              </h2>
            </div>

            <div className="problem-instruction-section">
              <h3>Instruction</h3>
              <p className="instruction-text">{problem.instruction}</p>
            </div>
          </div>

          {/* Go Code Solution block */}
          <div className="problem-solution-section">
            <div className="section-title-row">
              <h3>
                <FileCode size={18} className="text-accent" />
                Go Implementation
              </h3>
            </div>
            <CodeBlock 
              code={problem.output} 
              language="go" 
              filename={problem.source_file || (problem.function ? `${problem.function}.go` : 'main.go')} 
            />
          </div>
        </div>

        {/* Right Side: Metadata / Sidecard */}
        <div className="problem-right-panel">
          <div className="problem-metadata-card glass-card">
            <h3>Metadata & Attributes</h3>
            
            <div className="metadata-list">
              <div className="metadata-item">
                <Tag size={16} className="meta-icon" />
                <div className="meta-info">
                  <span className="meta-label">Topic</span>
                  <span className="meta-value text-accent">{problem.topic}</span>
                </div>
              </div>

              {problem.source && (
                <div className="metadata-item">
                  <Code2 size={16} className="meta-icon" />
                  <div className="meta-info">
                    <span className="meta-label">Source</span>
                    <span className="meta-value">{problem.source}</span>
                  </div>
                </div>
              )}

              {complexity && (
                <div className="metadata-item">
                  <Cpu size={16} className="meta-icon" />
                  <div className="meta-info">
                    <span className="meta-label">Complexity Score</span>
                    <div className="complexity-meter-wrapper">
                      <span className="meta-value">{complexity} / 10</span>
                      <div className="complexity-meter-track">
                        <div 
                          className="complexity-meter-fill" 
                          style={{ width: `${complexity * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {problem.package && (
                <div className="metadata-item">
                  <FileCode size={16} className="meta-icon" />
                  <div className="meta-info">
                    <span className="meta-label">Go Package</span>
                    <span className="meta-value font-mono">{problem.package}</span>
                  </div>
                </div>
              )}

              {problem.function && (
                <div className="metadata-item">
                  <CheckSquare size={16} className="meta-icon" />
                  <div className="meta-info">
                    <span className="meta-label">Target Function</span>
                    <span className="meta-value font-mono">{problem.function}</span>
                  </div>
                </div>
              )}

              {problem.dataset_source && (
                <div className="metadata-item">
                  <FileText size={16} className="meta-icon" />
                  <div className="meta-info">
                    <span className="meta-label">Dataset Group</span>
                    <span className="meta-value text-secondary">
                      {problem.dataset_source.replace(/-/g, ' ')}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {problem.url && (
              <a 
                href={problem.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary btn-sm reference-btn"
              >
                External Reference <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
