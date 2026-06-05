const CATS = [
  { id:'All', icon:'🔍', label:'All' },
  { id:'Doctor', icon:'🏥', label:'Doctor' },
  { id:'Electrician', icon:'⚡', label:'Electrician' },
  { id:'Plumber', icon:'🔧', label:'Plumber' },
  { id:'Tutor', icon:'📚', label:'Tutor' },
  { id:'Mechanic', icon:'🔩', label:'Mechanic' },
  { id:'Salon', icon:'💇', label:'Salon' },
  { id:'Grocery', icon:'🛒', label:'Grocery' },
  { id:'Pharmacy', icon:'💊', label:'Pharmacy' },
  { id:'Restaurant', icon:'🍽️', label:'Restaurant' },
  { id:'Other', icon:'📌', label:'Other' },
];

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', padding: '4px 0' }}>
      {CATS.map(c => {
        const active = selected === c.id;
        return (
          <button key={c.id} onClick={() => onChange(c.id)} style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '6px 14px', borderRadius: 'var(--r-full)',
            border: active ? '1.5px solid var(--accent)' : '1.5px solid var(--surface-3)',
            background: active ? 'var(--accent)' : 'var(--surface)',
            color: active ? '#fff' : 'var(--ink-soft)',
            fontSize: '0.8rem', fontWeight: active ? 600 : 400,
            transition: 'all 0.15s ease',
            boxShadow: active ? '0 2px 12px rgba(37,99,235,0.2)' : 'var(--shadow-xs)'
          }}>
            <span style={{ fontSize: '12px' }}>{c.icon}</span>
            {c.label}
          </button>
        );
      })}
    </div>
  );
}