import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate('/listings?search=' + encodeURIComponent(search.trim()));
      setSearch('');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: scrolled ? 'rgba(255,255,255,0.97)' : '#ffffff',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #EBEBF0',
      boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.08)' : 'none',
      transition: 'box-shadow 0.2s ease'
    }}>
      <div style={{
        maxWidth: '960px', margin: '0 auto',
        padding: '0 1.25rem', height: '60px',
        display: 'flex', alignItems: 'center', gap: '1rem'
      }}>

        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:'8px', textDecoration:'none', flexShrink:0 }}>
          <div style={{ width:'34px', height:'34px', borderRadius:'10px', background:'#2563EB', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', boxShadow:'0 2px 8px rgba(37,99,235,0.3)' }}>
            📍
          </div>
          <div className="hide-mobile">
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'0.92rem', color:'#0F0F1A', lineHeight:1.1 }}>
              Hazaribagh<span style={{ color:'#2563EB' }}>Services</span>
            </div>
            <div style={{ fontSize:'0.62rem', color:'#9090A8' }}>Jharkhand, India • 2025</div>
          </div>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} style={{ flex:1, maxWidth:'420px', margin:'0 auto' }}>
          <div style={{
            display:'flex', alignItems:'center', gap:'6px',
            background:'#F5F5FA', border:'1.5px solid #EBEBF0',
            borderRadius:'99px', padding:'0 14px',
            transition:'border 0.15s ease'
          }}
          onFocus={e => e.currentTarget.style.border = '1.5px solid #2563EB'}
          onBlur={e => e.currentTarget.style.border = '1.5px solid #EBEBF0'}>
            <span style={{ fontSize:'13px', color:'#9090A8' }}>🔍</span>
            <input
              style={{ flex:1, border:'none', background:'transparent', outline:'none', padding:'9px 0', fontSize:'0.85rem', color:'#0F0F1A' }}
              placeholder="Search doctors, electricians..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button type="submit" style={{ background:'#2563EB', color:'#fff', border:'none', borderRadius:'99px', padding:'3px 10px', fontSize:'0.72rem', fontWeight:600, cursor:'pointer' }}>
                Go
              </button>
            )}
          </div>
        </form>

        {/* Nav links */}
        <nav style={{ display:'flex', alignItems:'center', gap:'2px', flexShrink:0 }} className="hide-mobile">
          <Link to="/" style={{
            padding:'6px 12px', borderRadius:'8px', fontSize:'0.82rem', fontWeight:500,
            color: isActive('/') ? '#2563EB' : '#3D3D52',
            background: isActive('/') ? '#EFF6FF' : 'transparent',
            transition:'all 0.15s', textDecoration:'none'
          }}>🏠 Home</Link>

          <Link to="/listings" style={{
            padding:'6px 12px', borderRadius:'8px', fontSize:'0.82rem', fontWeight:500,
            color: isActive('/listings') ? '#2563EB' : '#3D3D52',
            background: isActive('/listings') ? '#EFF6FF' : 'transparent',
            transition:'all 0.15s', textDecoration:'none'
          }}>📋 Browse</Link>

          <a href="tel:9431156201" style={{
            padding:'6px 12px', borderRadius:'8px', fontSize:'0.82rem', fontWeight:600,
            color:'#fff', background:'#2563EB', textDecoration:'none',
            display:'flex', alignItems:'center', gap:'4px',
            boxShadow:'0 2px 8px rgba(37,99,235,0.25)'
          }}>📞 Call Now</a>
        </nav>

        {/* Mobile menu */}
        <div style={{ display:'none' }} className="show-mobile">
          <Link to="/listings" style={{ padding:'7px 14px', borderRadius:'8px', background:'#2563EB', color:'#fff', fontSize:'0.82rem', fontWeight:600, textDecoration:'none' }}>
            Browse
          </Link>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div style={{
        display:'none',
        position:'fixed', bottom:0, left:0, right:0, zIndex:300,
        background:'#fff', borderTop:'1px solid #EBEBF0',
        padding:'8px 0 12px'
      }} className="mobile-nav">
        {[['/', '🏠', 'Home'], ['/listings', '📋', 'Services']].map(([path, icon, label]) => (
          <Link key={path} to={path} style={{
            display:'flex', flexDirection:'column', alignItems:'center', gap:'2px',
            padding:'4px 24px', color: isActive(path) ? '#2563EB' : '#9090A8',
            textDecoration:'none', fontSize:'0.68rem', fontWeight: isActive(path) ? 600 : 400
          }}>
            <span style={{ fontSize:'20px' }}>{icon}</span>
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}