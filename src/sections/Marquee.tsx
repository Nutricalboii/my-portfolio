const TAGS = [
  'Full-Stack', 'Systems Builder', 'Android BSP', 'Open Source',
  'Linux Native', 'Zero Knowledge', 'Hackathon Winner', 'Production Shipped',
  'React / Next.js', 'WebCrypto', 'GTK4', 'Custom OS',
  'FastAPI', 'AES-256-GCM', 'Kernel Work', 'D-Bus', 'ChromaDB', 'Soong Build',
];

function Tag({ text }: { text: string }) {
  return (
    <span className="marquee-item">
      {text}
      <span>✦</span>
    </span>
  );
}

export function Marquee() {
  const doubled = [...TAGS, ...TAGS];
  return (
    <div className="marquee-strip">
      <div className="marquee-inner">
        {doubled.map((t, i) => (
          <Tag key={i} text={t} />
        ))}
      </div>
    </div>
  );
}
