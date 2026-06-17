import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import StatsCounter from '../components/StatsCounter';
import ProblemCard from '../components/ProblemCard';
import TopicCard from '../components/TopicCard';
import { BookOpen, HelpCircle, Code, Award, Flame, RefreshCw, Layers } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [randomProblem, setRandomProblem] = useState(null);
  const [popularTopics, setPopularTopics] = useState([]);
  const [recentProblems, setRecentProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshingRandom, setRefreshingRandom] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, randomRes, popularRes, recentRes] = await Promise.all([
        api.get('/stats/problems'),
        api.get('/problems/random'),
        api.get('/topics/popular?limit=6'),
        api.get('/problems/recent?limit=5'),
      ]);

      setStats(statsRes.data.data);
      setRandomProblem(randomRes.data.data);
      setPopularTopics(popularRes.data.data || []);
      setRecentProblems(recentRes.data.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefreshRandom = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setRefreshingRandom(true);
      const res = await api.get('/problems/random');
      setRandomProblem(res.data.data);
    } catch (err) {
      console.error('Error refreshing random problem:', err);
    } finally {
      setRefreshingRandom(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading dashboard metrics...</p>
      </div>
    );
  }

  // Calculate stats values
  const totalProblems = stats?.total || 0;
  const difficulties = stats?.byDifficulty || [];
  
  const getDiffCount = (difficulty) => {
    const d = difficulties.find(item => item._id?.toLowerCase() === difficulty.toLowerCase());
    return d ? d.count : 0;
  };

  const difficultyList = [
    { name: 'Beginner', count: getDiffCount('beginner'), color: 'green', cssVar: '--diff-beginner' },
    { name: 'Easy', count: getDiffCount('easy'), color: 'green', cssVar: '--diff-easy' },
    { name: 'Medium', count: getDiffCount('medium'), color: 'yellow', cssVar: '--diff-medium' },
    { name: 'Intermediate', count: getDiffCount('intermediate'), color: 'purple', cssVar: '--diff-intermediate' },
    { name: 'Advanced', count: getDiffCount('advanced'), color: 'red', cssVar: '--diff-advanced' },
    { name: 'Hard', count: getDiffCount('hard'), color: 'red', cssVar: '--diff-hard' },
  ];

  return (
    <div className="dashboard-container animate-fadeIn">
      {/* Hero Header */}
      <div className="dashboard-hero">
        <div className="hero-text-content">
          <h1>Master Go Programming</h1>
          <p>
            Solve {totalProblems.toLocaleString()} coding challenges, trace packages, 
            and elevate your Go-Epic skills.
          </p>
          <div className="hero-cta-buttons">
            <Link to="/problems" className="btn btn-primary btn-lg">
              Solve Challenges <Code size={18} />
            </Link>
            <Link to="/topics" className="btn btn-secondary btn-lg">
              Explore Topics <Layers size={18} />
            </Link>
          </div>
        </div>
        <div className="hero-backdrop-glow" />
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-4 stats-grid">
        <StatsCounter
          label="Total Problems"
          value={totalProblems}
          icon={HelpCircle}
          color="cyan"
          subtext="Across all difficulty categories"
        />
        <StatsCounter
          label="Beginner & Easy"
          value={getDiffCount('beginner') + getDiffCount('easy')}
          icon={BookOpen}
          color="green"
          subtext="Perfect for starting out"
        />
        <StatsCounter
          label="Medium & Intermediate"
          value={getDiffCount('medium') + getDiffCount('intermediate')}
          icon={Award}
          color="yellow"
          subtext="Build solid foundation"
        />
        <StatsCounter
          label="Advanced & Hard"
          value={getDiffCount('advanced') + getDiffCount('hard')}
          icon={Flame}
          color="red"
          subtext="Expert-level optimization"
        />
      </div>

      {/* Middle Grid: Difficulty & Random Challenge */}
      <div className="dashboard-row grid-2-1">
        {/* Difficulty Distribution Chart */}
        <div className="difficulty-stats-card glass-card">
          <div className="card-header-with-action">
            <h3>Difficulty Distribution</h3>
          </div>
          <div className="difficulty-distribution-bars">
            {difficultyList.map((diff) => {
              const pct = totalProblems > 0 ? (diff.count / totalProblems) * 100 : 0;
              return (
                <div className="diff-bar-item" key={diff.name}>
                  <div className="diff-bar-label">
                    <span>{diff.name}</span>
                    <span className="diff-bar-pct">
                      {diff.count.toLocaleString()} ({pct.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="diff-bar-track">
                    <div
                      className={`diff-bar-fill fill-${diff.color}`}
                      style={{
                        width: `${pct}%`,
                        backgroundColor: `var(${diff.cssVar})`,
                        boxShadow: `0 0 10px var(${diff.cssVar})`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Problem of the Day / Random */}
        <div className="random-problem-card glass-card">
          <div className="card-header-with-action">
            <h3>Random Challenge</h3>
            <button
              onClick={handleRefreshRandom}
              disabled={refreshingRandom}
              className="btn btn-sm btn-secondary btn-icon-only"
              title="Get another random problem"
            >
              <RefreshCw size={14} className={refreshingRandom ? 'spin' : ''} />
            </button>
          </div>
          {randomProblem ? (
            <div className="random-problem-body">
              <ProblemCard problem={randomProblem} />
            </div>
          ) : (
            <div className="empty-state">
              <p>No random challenge available</p>
            </div>
          )}
        </div>
      </div>

      {/* Popular Topics Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Popular Topics</h2>
          <Link to="/topics" className="view-all-link">
            View all topics →
          </Link>
        </div>
        <div className="grid grid-3">
          {popularTopics.map((topic) => (
            <TopicCard key={topic._id} topic={topic} />
          ))}
        </div>
      </div>

      {/* Recent Problems Section */}
      <div className="dashboard-section recent-problems-section">
        <div className="section-header">
          <h2>Recently Added</h2>
          <Link to="/problems" className="view-all-link">
            Browse all →
          </Link>
        </div>
        <div className="recent-problems-list">
          {recentProblems.map((prob) => (
            <Link
              to={`/problems/${prob._id}`}
              key={prob._id}
              className="recent-problem-row glass-card"
            >
              <div className="recent-problem-left">
                <span className={`recent-diff-dot diff-bg-${prob.difficulty?.toLowerCase()}`} />
                <span className="recent-problem-id">#{prob.problem_number || '0'}</span>
                <p className="recent-problem-instruction">{prob.instruction}</p>
              </div>
              <div className="recent-problem-right">
                <span className="badge badge-topic">{prob.topic}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
