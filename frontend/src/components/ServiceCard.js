import { useNavigate } from 'react-router-dom';

const ICONS = { Doctor:'🏥', Electrician:'⚡', Plumber:'🔧', Tutor:'📚', Mechanic:'🔩', Salon:'💇', Grocery:'🛒', Pharmacy:'💊', Restaurant:'🍽️', Other:'📌' };
const COLORS = { Doctor:'#EFF6FF', Electrician:'#FEFCE8', Plumber:'#F0FDF4', Tutor:'#FFF7ED', Mechanic:'#F1F5F9', Salon:'#FDF4FF', Grocery:'#ECFDF5', Pharmacy:'#EFF6FF', Restaurant:'#FFF7ED', Other:'#F8FAFC' };

function MiniStars({ rating }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:'1px' }}>
      {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize:'12px', color: s <= Math.round(rating) ? '#F59E0B' : '#E2E8F0' }}>★</span>)}
      <span style={{ fontSize:'12px', color:'#64748B', marginLeft:'4px', fontWeight:500 }}>{Number(rating).toFixed(1)}</span>
    </span>
  );
}

export default function ServiceCard({ service }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/services/' + service._id)}
      className="card"
      style={{
        display: 'flex', gap: '14px', alignItems: 'flex-start',
        background: 'var(--surface)', borderRadius: 'var(--r-lg)',
        padding: '14px 16px', boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--surface-3)', cursor: 'pointer'
      }}
    >
      {/* Icon */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
        background: COLORS[service.category] || '#F8FAFC',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px'
      }}>{ICONS[service.category] || '📌'}</div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>{service.name}</h3>
            {service.isVerified && (
              <span style={{ fontSize: '0.68rem', background: 'var(--green-light)', color: 'var(--green)', padding: '2px 8px', borderRadius: 'var(--r-full)', fontWeight: 600, whiteSpace: 'nowrap' }}>✓ Verified</span>
            )}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}>📞 {service.phone}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent)', background: 'var(--accent-light)', padding: '2px 10px', borderRadius: 'var(--r-full)', fontWeight: 600 }}>{service.category}</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>📍 {service.address}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MiniStars rating={service.avgRating} />
          <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>({service.totalReviews} reviews)</span>
        </div>
      </div>

      {/* Arrow */}
      <div style={{ color: 'var(--ink-muted)', fontSize: '18px', flexShrink: 0, alignSelf: 'center' }}>›</div>
    </div>
  );
}