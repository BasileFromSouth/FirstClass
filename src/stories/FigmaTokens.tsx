import {
  DISPLAY_COLOR,
  FIGMA_FILE_URL,
  PRIMITIVES_COLOR,
} from './figma-tokens.data';

const shell: React.CSSProperties = {
  fontFamily: 'var(--font-geist-sans, system-ui, sans-serif)',
  maxWidth: 960,
  padding: '1.5rem',
  color: '#171717',
};

const h2: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 600,
  marginTop: '2rem',
  marginBottom: '0.75rem',
  borderBottom: '1px solid #e5e5e5',
  paddingBottom: '0.35rem',
};

const sub: React.CSSProperties = {
  fontSize: '0.875rem',
  color: '#737373',
  marginBottom: '1rem',
};

const tableWrap: React.CSSProperties = { overflowX: 'auto' };

const table: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.8125rem',
};

const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.5rem 0.75rem',
  borderBottom: '2px solid #e5e5e5',
  fontWeight: 600,
};

const td: React.CSSProperties = {
  padding: '0.5rem 0.75rem',
  borderBottom: '1px solid #f0f0f0',
  verticalAlign: 'middle',
};

const swatch = (hex: string): React.CSSProperties => ({
  width: 40,
  height: 28,
  borderRadius: 6,
  background: hex,
  border: '1px solid rgba(0,0,0,0.08)',
  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)',
});

export function FigmaTokensReference() {
  return (
    <div style={shell}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
        Tokens Figma — Stoodio
      </h1>
      <p style={sub}>
        Collections locales du fichier :{' '}
        <strong>Primitives / Color</strong> (mode Base) et{' '}
        <strong>Display</strong> (modes Light / Dark, alias vers les primitives).
      </p>
      <p style={{ ...sub, marginTop: -8 }}>
        <a href={FIGMA_FILE_URL} target="_blank" rel="noreferrer">
          Ouvrir le fichier Figma
        </a>
      </p>

      <h2 style={h2}>Primitives / Color</h2>
      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Token</th>
              <th style={th}>Base</th>
              <th style={th}>Aperçu</th>
            </tr>
          </thead>
          <tbody>
            {PRIMITIVES_COLOR.map((p) => (
              <tr key={p.name}>
                <td style={td}>
                  <code style={{ fontSize: '0.8125rem' }}>{p.name}</code>
                </td>
                <td style={td}>
                  <code>{p.hex}</code>
                </td>
                <td style={td}>
                  <div style={swatch(p.hex)} title={p.hex} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2}>Display</h2>
      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Token</th>
              <th style={th}>Light →</th>
              <th style={th}>Light</th>
              <th style={th}>Dark →</th>
              <th style={th}>Dark</th>
              <th style={th}>Aperçu</th>
            </tr>
          </thead>
          <tbody>
            {DISPLAY_COLOR.map((d) => (
              <tr key={d.name}>
                <td style={td}>
                  <code style={{ fontSize: '0.8125rem' }}>{d.name}</code>
                </td>
                <td style={{ ...td, color: '#737373' }}>
                  <code>{d.aliases.Light}</code>
                </td>
                <td style={td}>
                  <code>{d.resolved.Light}</code>
                </td>
                <td style={{ ...td, color: '#737373' }}>
                  <code>{d.aliases.Dark}</code>
                </td>
                <td style={td}>
                  <code>{d.resolved.Dark}</code>
                </td>
                <td style={td}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <div style={swatch(d.resolved.Light)} title={`Light ${d.resolved.Light}`} />
                    <div style={swatch(d.resolved.Dark)} title={`Dark ${d.resolved.Dark}`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
