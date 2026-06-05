import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';

const POPULAR = ['Doctor', 'Electrician', 'Tutor', 'Plumber', 'Mechanic'];
const STATS = [{ n:'10+', l:'Services' }, { n:'9', l:'Categories' }, { n:'Free', l:'Always' }, { n:'Hazaribagh', l:'Jharkhand' }];

export default function Home() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '1.5rem' }}>

      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(140deg, #1E3A8A 0%, #2563EB 60%, #3B82F6 100%)',
        borderRadius: 'var(--r-xl)', padding: '2.5rem 2rem 2.5rem',
        color: '#fff', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{ position:'absolute', top:'-50px', right:'-50px', width:'180px', height:'180px', borderRadius:'50%', background:'rgba(255,255,255,0.07)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-30px', left:'30%', width:'120px', height:'120px', borderRadius:'50%', background:'rgba(255,255,255,0.05)', pointerEvents:'none' }} />

        <div style={{ position:'relative', maxWidth:'520px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'rgba(255,255,255,0.15)', borderRadius:'var(--r-full)', padding:'4px 12px', fontSize:'0.75rem', fontWeight:500, marginBottom:'1rem' }}>
            📍 Hazaribagh, Jharkhand
          </div>
          <h1 style={{ fontSize:'clamp(1.6rem, 4vw, 2.2rem)', fontWeight:800, lineHeight:1.2, marginBottom:'0.6rem' }}>
            Find Trusted Local<br />Services Near You
          </h1>
          <p style={{ fontSize:'0.9rem', opacity:0.85, marginBottom:'1.5rem', lineHeight:1.6 }}>
            Doctors, electricians, tutors, mechanics — verified and reviewed by locals
          </p>

          {/* Search bar */}
          <form onSubmit={e => { e.preventDefault(); navigate('/listings' + (search ? '?search=' + encodeURIComponent(search) : '')); }}
            style={{ display:'flex', gap:'8px', maxWidth:'460px' }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', background:'#fff', borderRadius:'var(--r-md)', padding:'0 14px' }}>
              <span style={{ color:'#94A3B8', marginRight:'8px', fontSize:'14px' }}>🔍</span>
              <input
                style={{ flex:1, border:'none', outline:'none', padding:'11px 0', fontSize:'0.9rem', color:'var(--ink)', background:'transparent' }}
                placeholder="Search for a service..."
                value={search} onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button type="submit" style={{
              padding:'11px 20px', borderRadius:'var(--r-md)', border:'none',
              background:'var(--gold)', color:'#fff', fontWeight:700, fontSize:'0.875rem',
              whiteSpace:'nowrap', boxShadow:'0 4px 12px rgba(245,158,11,0.4)'
            }}>Search</button>
          </form>

          {/* Quick links */}
          <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginTop:'1rem' }}>
            {POPULAR.map(cat => (
              <button key={cat} onClick={() => navigate('/listings?category=' + cat)} style={{
                padding:'4px 12px', borderRadius:'var(--r-full)', border:'1px solid rgba(255,255,255,0.3)',
                background:'rgba(255,255,255,0.1)', color:'#fff', fontSize:'0.78rem', fontWeight:500
              }}>{cat}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'10px', marginBottom:'1.5rem' }}>
        {STATS.map(s => (
          <div key={s.l} style={{ background:'var(--surface)', borderRadius:'var(--r-lg)', padding:'1rem', textAlign:'center', boxShadow:'var(--shadow-sm)', border:'1px solid var(--surface-3)' }}>
            <div style={{ fontFamily:'Syne,sans-serif', fontSize:'1.3rem', fontWeight:800, color:'var(--accent)' }}>{s.n}</div>
            <div style={{ fontSize:'0.72rem', color:'var(--ink-muted)', fontWeight:500, marginTop:'2px' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Category section */}
      <section style={{ background:'var(--surface)', borderRadius:'var(--r-xl)', padding:'1.5rem', boxShadow:'var(--shadow-sm)', border:'1px solid var(--surface-3)', marginBottom:'1.5rem' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem' }}>
          <div>
            <h2 style={{ fontSize:'1rem', fontWeight:700, color:'var(--ink)', margin:0 }}>Browse by Category</h2>
            <p style={{ fontSize:'0.78rem', color:'var(--ink-muted)', marginTop:'2px' }}>Tap a category to see all providers</p>
          </div>
          <button onClick={() => navigate('/listings')} style={{ padding:'7px 16px', borderRadius:'var(--r-md)', border:'1.5px solid var(--accent)', background:'transparent', color:'var(--accent)', fontSize:'0.8rem', fontWeight:600 }}>
            View All
          </button>
        </div>
        <CategoryFilter selected="All" onChange={cat => navigate('/listings' + (cat !== 'All' ? '?category=' + cat : ''))} />
      </section>

      {/* How it works */}
      <section style={{ background:'var(--surface)', borderRadius:'var(--r-xl)', padding:'1.5rem', boxShadow:'var(--shadow-sm)', border:'1px solid var(--surface-3)', marginBottom:'1.5rem' }}>
        <h2 style={{ fontSize:'1rem', fontWeight:700, color:'var(--ink)', marginBottom:'1.2rem' }}>How It Works</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem' }}>
          {[
            { icon:'🔍', step:'1', title:'Search', desc:'Search by name or category' },
            { icon:'⭐', step:'2', title:'Compare', desc:'Read ratings and reviews' },
            { icon:'📞', step:'3', title:'Contact', desc:'Call directly for free' },
          ].map(item => (
            <div key={item.step} style={{ textAlign:'center', padding:'1rem 0.5rem' }}>
              <div style={{ width:'48px', height:'48px', borderRadius:'14px', background:'var(--accent-light)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', margin:'0 auto 10px' }}>{item.icon}</div>
              <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'0.9rem', color:'var(--ink)', marginBottom:'4px' }}>{item.title}</div>
              <div style={{ fontSize:'0.78rem', color:'var(--ink-muted)', lineHeight:1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign:'center', padding:'1rem 0', borderTop:'1px solid var(--surface-3)' }}>
        <p style={{ fontSize:'0.78rem', color:'var(--ink-muted)' }}>
          © 2025 HazaribaghServices · Made with ❤️ for Hazaribagh, Jharkhand
        </p>
      </footer>
    </main>
  );
}