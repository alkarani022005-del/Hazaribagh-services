import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById, getReviews, submitReview } from '../api/services';

const ICONS = { Doctor:'🏥', Electrician:'⚡', Plumber:'🔧', Tutor:'📚', Mechanic:'🔩', Salon:'💇', Grocery:'🛒', Pharmacy:'💊', Restaurant:'🍽️', Other:'📌' };
const COLORS = { Doctor:'#EFF6FF', Electrician:'#FEFCE8', Plumber:'#F0FDF4', Tutor:'#FFF7ED', Mechanic:'#F1F5F9', Salon:'#FDF4FF', Grocery:'#ECFDF5', Pharmacy:'#EFF6FF', Restaurant:'#FFF7ED', Other:'#F8FAFC' };

function Stars({ rating, size=15 }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:'2px' }}>
      {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize:size, color: s<=Math.round(rating) ? '#F59E0B':'#E2E8F0' }}>★</span>)}
      <span style={{ fontSize:size-2, color:'#64748B', marginLeft:'4px', fontWeight:600 }}>{Number(rating).toFixed(1)}</span>
    </span>
  );
}

function StarPicker({ value, onChange }) {
  const [hov, setHov] = useState(0);
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'4px', margin:'8px 0' }}>
      <span style={{ fontSize:'0.82rem', color:'var(--ink-soft)', marginRight:'4px' }}>Your rating:</span>
      {[1,2,3,4,5].map(n => (
        <span key={n} onClick={() => onChange(n)} onMouseEnter={() => setHov(n)} onMouseLeave={() => setHov(0)}
          style={{ fontSize:'1.6rem', cursor:'pointer', color: n<=(hov||value) ? '#F59E0B':'#E2E8F0', transition:'color 0.1s', lineHeight:1 }}>★</span>
      ))}
    </div>
  );
}

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name:'', rating:5, comment:'' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    (async () => {
      try { setService(await getServiceById(id)); } catch(e) {}
      try { const r = await getReviews(id); setReviews(Array.isArray(r) ? r : []); } catch(e) { setReviews([]); }
      setLoading(false);
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    try {
      setSubmitting(true);
      const r = await submitReview({ ...form, service: id });
      setReviews([r, ...reviews]);
      setForm({ name:'', rating:5, comment:'' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch(e) {} finally { setSubmitting(false); }
  };

  if (loading) return (
    <div style={{ maxWidth:'860px', margin:'0 auto', padding:'1.5rem' }}>
      {[180,100,300,200].map((h,i) => <div key={i} className="skeleton" style={{ height:h, marginBottom:'10px' }} />)}
    </div>
  );

  if (!service) return (
    <div style={{ maxWidth:'860px', margin:'2rem auto', padding:'2rem', textAlign:'center' }}>
      <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>😕</div>
      <h2 style={{ marginBottom:'0.5rem' }}>Service not found</h2>
      <p style={{ color:'var(--ink-muted)', fontSize:'0.875rem', marginBottom:'1.5rem' }}>This listing may have been removed or the link is incorrect.</p>
      <button onClick={() => navigate('/listings')} style={{ padding:'10px 24px', borderRadius:'var(--r-md)', border:'none', background:'var(--accent)', color:'#fff', fontWeight:600 }}>← Browse All Services</button>
    </div>
  );

  const [lng, lat] = service.location.coordinates;

  return (
    <main style={{ maxWidth:'860px', margin:'0 auto', padding:'1.5rem' }}>

      {/* Breadcrumb */}
      <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'0.78rem', color:'var(--ink-muted)', marginBottom:'1rem' }}>
        <button onClick={() => navigate('/')} style={{ background:'none', border:'none', color:'var(--accent)', cursor:'pointer', padding:0, fontSize:'0.78rem' }}>Home</button>
        <span>›</span>
        <button onClick={() => navigate('/listings')} style={{ background:'none', border:'none', color:'var(--accent)', cursor:'pointer', padding:0, fontSize:'0.78rem' }}>Services</button>
        <span>›</span>
        <span style={{ color:'var(--ink-soft)' }}>{service.name}</span>
      </nav>

      {/* Main info card */}
      <div style={{ background:'var(--surface)', borderRadius:'var(--r-xl)', padding:'1.5rem', boxShadow:'var(--shadow-md)', border:'1px solid var(--surface-3)', marginBottom:'1rem' }}>
        <div style={{ display:'flex', gap:'1rem', alignItems:'flex-start', flexWrap:'wrap' }}>
          <div style={{ width:'68px', height:'68px', borderRadius:'18px', background:COLORS[service.category]||'#F8FAFC', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', flexShrink:0 }}>
            {ICONS[service.category]||'📌'}
          </div>
          <div style={{ flex:1, minWidth:'200px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap', marginBottom:'6px' }}>
              <h1 style={{ fontSize:'1.3rem', fontWeight:800, color:'var(--ink)', margin:0 }}>{service.name}</h1>
              {service.isVerified && <span style={{ fontSize:'0.68rem', background:'var(--green-light)', color:'var(--green)', padding:'3px 10px', borderRadius:'var(--r-full)', fontWeight:600 }}>✓ Verified</span>}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px', flexWrap:'wrap' }}>
              <span style={{ fontSize:'0.72rem', color:'var(--accent)', background:'var(--accent-light)', padding:'3px 12px', borderRadius:'var(--r-full)', fontWeight:600 }}>{service.category}</span>
              <span style={{ fontSize:'0.82rem', color:'var(--ink-muted)' }}>📍 {service.address}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Stars rating={service.avgRating} size={15} />
              <span style={{ fontSize:'0.78rem', color:'var(--ink-muted)' }}>({service.totalReviews} reviews)</span>
            </div>
          </div>

          {/* Contact box */}
          <div style={{ background:'linear-gradient(135deg,#EFF6FF,#DBEAFE)', borderRadius:'var(--r-lg)', padding:'1rem 1.25rem', textAlign:'center', minWidth:'150px', border:'1px solid #BFDBFE' }}>
            <p style={{ fontSize:'0.68rem', fontWeight:700, color:'var(--accent)', textTransform:'uppercase', letterSpacing:'0.5px', margin:'0 0 8px' }}>Call Now</p>
            <a href={'tel:' + service.phone} style={{ display:'block', fontWeight:800, fontSize:'1rem', color:'var(--ink)', marginBottom:'4px' }}>📞 {service.phone}</a>
            <p style={{ fontSize:'0.68rem', color:'var(--ink-muted)' }}>Tap to call directly</p>
          </div>
        </div>

        {service.description && (
          <p style={{ marginTop:'1.25rem', paddingTop:'1.25rem', borderTop:'1px solid var(--surface-3)', color:'var(--ink-soft)', fontSize:'0.875rem', lineHeight:1.7 }}>
            {service.description}
          </p>
        )}
      </div>

      {/* Map */}
      <div style={{ background:'var(--surface)', borderRadius:'var(--r-xl)', overflow:'hidden', boxShadow:'var(--shadow-sm)', border:'1px solid var(--surface-3)', marginBottom:'1rem' }}>
        <div style={{ padding:'1rem 1.25rem', borderBottom:'1px solid var(--surface-3)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <span>🗺️</span>
            <h2 style={{ fontSize:'0.9rem', fontWeight:700, color:'var(--ink)', margin:0 }}>Location on Map</h2>
          </div>
          <a href={`https://www.google.com/maps?q=${lat},${lng}`} target="_blank" rel="noreferrer"
            style={{ fontSize:'0.78rem', color:'var(--accent)', fontWeight:600 }}>Open in Google Maps →</a>
        </div>
        <iframe title="Service location map" src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
          width="100%" height="280" style={{ border:'none', display:'block' }} loading="lazy" />
      </div>

      {/* Reviews section */}
      <div style={{ background:'var(--surface)', borderRadius:'var(--r-xl)', boxShadow:'var(--shadow-sm)', border:'1px solid var(--surface-3)', overflow:'hidden' }}>

        {/* Header */}
        <div style={{ padding:'1rem 1.25rem', borderBottom:'1px solid var(--surface-3)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <span>⭐</span>
            <h2 style={{ fontSize:'0.9rem', fontWeight:700, color:'var(--ink)', margin:0 }}>Reviews & Ratings</h2>
          </div>
          {reviews.length > 0 && (
            <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <Stars rating={service.avgRating} size={14} />
              <span style={{ fontSize:'0.78rem', color:'var(--ink-muted)' }}>· {reviews.length} reviews</span>
            </div>
          )}
        </div>

        {/* Write review form */}
        <div style={{ padding:'1.25rem', background:'var(--surface-2)', borderBottom:'1px solid var(--surface-3)' }}>
          <h3 style={{ fontSize:'0.875rem', fontWeight:700, color:'var(--ink)', margin:'0 0 1rem' }}>Write a Review</h3>
          <form onSubmit={handleSubmit}>
            <input style={{ width:'100%', padding:'10px 14px', borderRadius:'var(--r-md)', border:'1.5px solid var(--surface-3)', fontSize:'0.875rem', color:'var(--ink)', background:'var(--surface)', marginBottom:'10px', boxSizing:'border-box' }}
              placeholder="Your name *" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required />
            <StarPicker value={form.rating} onChange={n => setForm({...form,rating:n})} />
            <textarea style={{ width:'100%', padding:'10px 14px', borderRadius:'var(--r-md)', border:'1.5px solid var(--surface-3)', fontSize:'0.875rem', color:'var(--ink)', background:'var(--surface)', marginTop:'8px', marginBottom:'12px', boxSizing:'border-box', resize:'vertical', lineHeight:1.6 }}
              placeholder="Share your experience (optional)" value={form.comment}
              onChange={e => setForm({...form,comment:e.target.value})} rows={3} />
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <button type="submit" disabled={submitting} style={{ padding:'10px 24px', borderRadius:'var(--r-md)', border:'none', background:'var(--accent)', color:'#fff', fontWeight:600, fontSize:'0.875rem', boxShadow:'var(--shadow-accent)', opacity:submitting?0.7:1 }}>
                {submitting ? 'Posting...' : 'Post Review'}
              </button>
              {submitted && <span style={{ color:'var(--green)', fontSize:'0.875rem', fontWeight:500 }}>✓ Review posted!</span>}
            </div>
          </form>
        </div>

        {/* Review list */}
        <div>
          {reviews.length === 0 && (
            <div style={{ textAlign:'center', padding:'2.5rem 1rem', color:'var(--ink-muted)' }}>
              <div style={{ fontSize:'2.5rem', marginBottom:'8px' }}>💬</div>
              <p style={{ fontWeight:600, color:'var(--ink-soft)', fontSize:'0.9rem' }}>No reviews yet</p>
              <p style={{ fontSize:'0.78rem', marginTop:'3px' }}>Be the first to review this service</p>
            </div>
          )}
          {reviews.map((r, i) => (
            <div key={r._id} style={{ padding:'1.1rem 1.25rem', borderBottom: i < reviews.length-1 ? '1px solid var(--surface-3)' : 'none' }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'10px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                  <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'var(--accent-light)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'0.9rem', color:'var(--accent)', flexShrink:0 }}>
                    {r.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontWeight:600, fontSize:'0.875rem', color:'var(--ink)', margin:0 }}>{r.name}</p>
                    <Stars rating={r.rating} size={13} />
                  </div>
                </div>
                <span style={{ fontSize:'0.72rem', color:'var(--ink-muted)', whiteSpace:'nowrap' }}>
                  {new Date(r.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                </span>
              </div>
              {r.comment && <p style={{ color:'var(--ink-soft)', fontSize:'0.875rem', lineHeight:1.7, margin:'10px 0 0 46px' }}>{r.comment}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Back button */}
      <div style={{ marginTop:'1.5rem', textAlign:'center' }}>
        <button onClick={() => navigate('/listings')} style={{ padding:'10px 24px', borderRadius:'var(--r-md)', border:'1.5px solid var(--surface-3)', background:'var(--surface)', color:'var(--ink-soft)', fontWeight:500, fontSize:'0.875rem' }}>
          ← Back to All Services
        </button>
      </div>
    </main>
  );
}