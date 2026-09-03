export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="glass" style={{ padding: 24, ...style }}>
      {children}
    </div>
  );
}
