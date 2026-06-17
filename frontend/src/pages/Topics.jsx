import { useEffect, useState } from 'react';
import api from '../api/axios';
import TopicCard from '../components/TopicCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { Hash, AlertCircle } from 'lucide-react';
import './Topics.css';

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 15,
        sort: 'problemCount', // default sort by number of problems
      };
      if (search) params.search = search;

      const res = await api.get('/topics', { params });
      setTopics(res.data.data || []);
      setTotal(res.data.total || 0);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch topics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [page, search]);

  const handleSearch = (query) => {
    setSearch(query);
    setPage(1); // Reset page to 1
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="topics-page-container animate-fadeIn">
      {/* Header */}
      <div className="page-header topics-header">
        <h1>Topics & Packages</h1>
        <p>Explore coding problems grouped by Go language packages, structures, and algorithms</p>
      </div>

      {/* Search Bar */}
      <div className="topics-search-wrapper glass-card">
        <SearchBar
          onSearch={handleSearch}
          initialValue={search}
          placeholder="Filter topics (e.g., slices, channels, context...)"
        />
      </div>

      {/* Main Grid */}
      {loading ? (
        <div className="topics-loading-skeleton">
          <div className="grid grid-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card topic-skeleton-card">
                <div className="skeleton skeleton-icon"></div>
                <div className="topic-skeleton-body">
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-desc"></div>
                  <div className="skeleton skeleton-footer"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : topics.length > 0 ? (
        <>
          <div className="grid grid-3 topics-grid stagger">
            {topics.map((topic) => (
              <TopicCard key={topic._id} topic={topic} />
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
          <h3>No topics found</h3>
          <p>We couldn't find any topics matching your query.</p>
        </div>
      )}
    </div>
  );
}
