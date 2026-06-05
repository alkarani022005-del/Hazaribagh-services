import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getServices } from '../api/services';
import ServiceCard from '../components/ServiceCard';
import CategoryFilter from '../components/CategoryFilter';

export default function Listings() {
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [inputVal, setInputVal] = useState(searchParams.get('search') || '');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => { fetchServices(); }, [category, search, page]);

  const fetchServices = async () => {
    try {
      setLoading(true); setError('');
      const data = await getServices({ search, category, page });
      setServices(data.services); setTotalPages(data.pages); setTotal(data.total);
    } catch (err) { setError('Could not load services. Please check your connection.'); }
    finally { setLoading(false); }
  };

  return (
    <main style={{ maxWidth:'860px', margin:'0 auto', padding:'1.5rem' }}>

      {/* Page header */}
      <div style={{ marginBottom:'1.25rem' }}>
        <h1 style={{ fontSize:'1.4rem', fontWeight:800, color:'var(--ink)', letterSpacing:'-0.3px' }}>
          Local Services <span style={{ color:'var(--accent)' }}>in Hazaribagh</span>
        </h1>
        <p style={{ fontSize:'0.82rem', color:'var(--ink-muted)', marginTop:'3px' }}>
          Find and connect with trusted service providers near you
        </p>
      </div>

      {/* Search bar */}
      <form onSubmit={e => { e.preventDefault(); setSearch(inputVal); setPage(1); }}
        style={{ display:'flex', gap:'8px', marginBottom:'1rem' }}>
        <div style={{ flex:1, display:'flex', alignItems:'center', gap:'8px', background:'var(--surface)', border:'1.5px solid var(--surface-3)', borderRadius:'var(--r-lg)', padding:'0 14px' }}>
          <span style={{ color:'var(--ink-muted)', fontSize:'14px' }}>🔍</span>
          <input
            style={{ flex:1, border:'none', outline:'none', padding:'10px 0', fontSize:'0.875rem', color:'var(--ink)', background:'transparent' }}
            placeholder="Search by name or description..."
            value={inputVal} onChange={e => setInputVal(e.target.value)}
          />
          {inputVal && <button type="button" onClick={() => { setInputVal(''); setSearch(''); setPage(1); }}
            style={{ background:'none', border:'none', color:'var(--ink-muted)', fontSize:'16px', padding:'0 2px', lineHeight:1 }}>✕</button>}
        </div>
        <button type="submit" style={{ padding:'10px 20px', borderRadius:'var(--r-lg)', border:'none', background:'var(--accent)', color:'#fff', fontWeight:600, fontSize:'0.875rem', boxShadow:'var(--shadow-accent)' }}>
          Search
        </button>
      </form>

      {/* Filters */}
      <div style={{ background:'var(--surface)', borderRadius:'var(--r-lg)', padding:'1rem', border:'1px solid var(--surface-3)', marginBottom:'1rem' }}>
        <CategoryFilter selected={category} onChange={cat => { setCategory(cat); setPage(1); }} />
      </div>

      {/* Results count */}
      {!loading && !error && (
        <p style={{ fontSize:'0.8rem', color:'var(--ink-muted)', marginBottom:'0.75rem' }}>
          {total === 0 ? 'No results' : `Showing ${total} service${total !== 1 ? 's' : ''}`}
          {category !== 'All' ? ` · ${category}` : ''}
          {search ? ` · "${search}"` : ''}
        </p>
      )}

      {/* Skeleton loading */}
      {loading && (
        <div style={{ display:'grid', gap:'10px' }}>
          {[1,2,3,4].map(i => (
            <div key={i} className="skeleton" style={{ height:'88px' }} />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ padding:'1rem 1.25rem', background:'var(--red-light)', color:'var(--red)', borderRadius:'var(--r-lg)', border:'1px solid #FECACA', display:'flex', alignItems:'center', gap:'10px' }}>
          <span style={{ fontSize:'20px' }}>⚠️</span>
          <div>
            <p style={{ fontWeight:600, fontSize:'0.875rem' }}>Something went wrong</p>
            <p style={{ fontSize:'0.8rem', marginTop:'2px', opacity:0.8 }}>{error}</p>
          </div>
          <button onClick={fetchServices} style={{ marginLeft:'auto', padding:'6px 14px', borderRadius:'var(--r-md)', border:'1.5px solid var(--red)', background:'transparent', color:'var(--red)', fontSize:'0.8rem', fontWeight:600 }}>Retry</button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && services.length === 0 && (
        <div style={{ textAlign:'center', padding:'3rem 1rem', background:'var(--surface)', borderRadius:'var(--r-xl)', border:'1px solid var(--surface-3)' }}>
          <div style={{ fontSize:'3rem', marginBottom:'0.75rem' }}>🔍</div>
          <h3 style={{ fontSize:'1rem', fontWeight:700, color:'var(--ink)', marginBottom:'6px' }}>No services found</h3>
          <p style={{ fontSize:'0.82rem', color:'var(--ink-muted)' }}>Try a different keyword or browse all categories</p>
          <button onClick={() => { setSearch(''); setInputVal(''); setCategory('All'); setPage(1); }}
            style={{ marginTop:'1rem', padding:'8px 20px', borderRadius:'var(--r-md)', border:'none', background:'var(--accent)', color:'#fff', fontWeight:600, fontSize:'0.85rem' }}>
            Clear Filters
          </button>
        </div>
      )}

      {/* Service list */}
      {!loading && !error && services.length > 0 && (
        <div style={{ display:'grid', gap:'8px' }}>
          {services.map((s, i) => (
            <div key={s._id} className="fade-up" style={{ animationDelay: i * 0.04 + 's' }}>
              <ServiceCard service={s} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !loading && (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginTop:'1.5rem' }}>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={{
            padding:'8px 16px', borderRadius:'var(--r-md)', border:'1.5px solid var(--surface-3)',
            background:'var(--surface)', color: page === 1 ? 'var(--ink-muted)' : 'var(--ink)',
            fontWeight:500, fontSize:'0.85rem', opacity: page === 1 ? 0.5 : 1
          }}>← Previous</button>
          <span style={{ padding:'8px 16px', background:'var(--accent-light)', color:'var(--accent)', borderRadius:'var(--r-md)', fontWeight:600, fontSize:'0.85rem' }}>
            Page {page} of {totalPages}
          </span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} style={{
            padding:'8px 16px', borderRadius:'var(--r-md)', border:'1.5px solid var(--surface-3)',
            background:'var(--surface)', color: page === totalPages ? 'var(--ink-muted)' : 'var(--ink)',
            fontWeight:500, fontSize:'0.85rem', opacity: page === totalPages ? 0.5 : 1
          }}>Next →</button>
        </div>
      )}
    </main>
  );
}