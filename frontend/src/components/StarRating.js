export default function StarRating({ rating, size = 15 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ fontSize: size, color: s <= Math.round(rating) ? 'var(--gold)' : 'var(--surface-3)', lineHeight: 1 }}>★</span>
      ))}
      <span style={{ fontSize: size - 2, color: 'var(--ink-soft)', marginLeft: '3px', fontWeight: 500 }}>{Number(rating).toFixed(1)}</span>
    </span>
  );
}