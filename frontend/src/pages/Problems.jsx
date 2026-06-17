import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ProblemCard from '../components/ProblemCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { Filter, RefreshCcw, BookOpen, AlertCircle, Shuffle, ChevronDown } from 'lucide-react';
import './Problems.css';

export default function Problems() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  // Parse search params
  const page = parseInt(searchParams.get('page') || '1', 10);
  const q = searchParams.get('q') || '';
  const difficulty = searchParams.get('difficulty') || '';
  const topic = searchParams.get('topic') || '';
  const sort = searchParams.get('sort') || '-createdAt';

  // Fetch topics list for the filter dropdown
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await api.get('/topics?limit=300');
        setTopicsList(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch topics list:', err);
      }
    };
    fetchTopics();
  }, []);

  const fetchProblems = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
        sort,
      };
      if (q) params.q = q;
      if (difficulty) params.difficulty = difficulty;
      if (topic) params.topic = topic;

      const res = await api.get('/problems', { params });
      setProblems(res.data.data || []);
      setTotal(res.data.total || 0);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch problems:', err);
    } finally {
      setLoading(false);
    }
  }, [page, q, difficulty, topic, sort]);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // reset page to 1 on filter update
    setSearchParams(newParams);
  };

  const handleSearch = (query) => {
    updateParam('q', query);
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  const handleRandomRedirect = async () => {
    try {
      const res = await api.get('/problems/random');
      if (res.data.success && res.data.data) {
        navigate(`/problems/${res.data.data._id}`);
      }
    } catch (err) {
      console.error('Error fetching random problem:', err);
    }
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="problems-page-container animate-fadeIn">
      {/* Page Header */}
      <div className="page-header problems-header">
        <div>
          <h1>Problems Explorer</h1>
          <p>Practice with {total.toLocaleString()} coding questions tailored for Go developers</p>
        </div>
        <button
          onClick={handleRandomRedirect}
          className="btn btn-primary btn-sm random-action-btn"
        >
          <Shuffle size={16} /> Random Problem
        </button>
      </div>

      {/* Control Panel: Search & Filter Toggles */}
      <div className="problems-control-panel glass-card">
        <div className="search-and-toggle-row">
          <SearchBar onSearch={handleSearch} initialValue={q} placeholder="Search instructions, output types, topics..." />
          <div className="control-buttons">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`btn btn-secondary ${filterOpen ? 'filter-active' : ''}`}
            >
              <Filter size={16} />
              <span>Filters</span>
              <ChevronDown size={14} className={`chevron-rotate ${filterOpen ? 'rotated' : ''}`} />
            </button>
            {(q || difficulty || topic) && (
              <button onClick={handleResetFilters} className="btn btn-ghost text-error">
                <RefreshCcw size={14} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Expandable filters box */}
        <div className={`expanded-filters-box ${filterOpen ? 'show' : ''}`}>
          <div className="filters-grid">
            <div className="input-group">
              <label htmlFor="difficulty-filter">Difficulty</label>
              <select
                id="difficulty-filter"
                className="input select-input"
                value={difficulty}
                onChange={(e) => updateParam('difficulty', e.target.value)}
              >
                <option value="">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="topic-filter">Topic</label>
              <select
                id="topic-filter"
                className="input select-input"
                value={topic}
                onChange={(e) => updateParam('topic', e.target.value)}
              >
                <option value="">All Topics</option>
                {topicsList.map((t) => (
                  <option key={t._id} value={t.name}>
                    {t.name} ({t.problemCount || 0})
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="sort-filter">Sort By</label>
              <select
                id="sort-filter"
                className="input select-input"
                value={sort}
                onChange={(e) => updateParam('sort', e.target.value)}
              >
                <option value="-createdAt">Newest First</option>
                <option value="createdAt">Oldest First</option>
                <option value="difficulty">Difficulty (Beginner → Hard)</option>
                <option value="-difficulty">Difficulty (Hard → Beginner)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main problems content */}
      {loading ? (
        <div className="problems-loading-skeleton">
          <div className="grid grid-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card problem-skeleton-card">
                <div className="skeleton skeleton-badge"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-meta"></div>
              </div>
            ))}
          </div>
        </div>
      ) : problems.length > 0 ? (
        <>
          <div className="grid grid-3 problems-grid stagger">
            {problems.map((prob) => (
              <ProblemCard key={prob._id} problem={prob} />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="empty-state glass-card">
          <AlertCircle size={48} className="text-secondary" />
          <h3>No problems found</h3>
          <p>Try modifying your search keywords or adjusting the filters.</p>
          <button onClick={handleResetFilters} className="btn btn-primary btn-sm mt-md">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
