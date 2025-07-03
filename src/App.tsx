import React, { useState } from 'react';
import './App.css';
import yaml from 'js-yaml';

function envToYaml(env: string): string {
  const lines = env.split(/\r?\n/).filter(Boolean);
  const envArr = lines.map(line => {
    const idx = line.indexOf('=');
    if (idx === -1) return null;
    const name = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    return { name, value };
  }).filter(Boolean);
  return yaml.dump({ env: envArr });
}

function yamlToEnv(yamlStr: string): string {
  try {
    const doc = yaml.load(yamlStr) as any;
    if (!doc || !Array.isArray(doc.env)) return '';
    return doc.env.map((item: any) => `${item.name}=${item.value}`).join('\n');
  } catch {
    return '';
  }
}

const App: React.FC = () => {
  const [yamlValue, setYamlValue] = useState('');
  const [envValue, setEnvValue] = useState('');

  const handleYamlToEnv = () => {
    setEnvValue(yamlToEnv(yamlValue));
  };

  const handleEnvToYaml = () => {
    setYamlValue(envToYaml(envValue));
  };

  return (
    <div className="App">
      <h1>YAML &lt;-&gt; ENV Converter</h1>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start', marginTop: 32 }}>
        <div>
          <h2>YAML</h2>
          <textarea
            value={yamlValue}
            onChange={e => setYamlValue(e.target.value)}
            rows={20}
            cols={40}
            placeholder="Paste YAML here..."
            style={{ fontFamily: 'monospace', fontSize: 14 }}
          />
          <div>
            <button onClick={handleYamlToEnv} style={{ marginTop: 8 }}>YAML → ENV</button>
          </div>
        </div>
        <div>
          <h2>ENV</h2>
          <textarea
            value={envValue}
            onChange={e => setEnvValue(e.target.value)}
            rows={20}
            cols={40}
            placeholder="Paste .env here..."
            style={{ fontFamily: 'monospace', fontSize: 14 }}
          />
          <div>
            <button onClick={handleEnvToYaml} style={{ marginTop: 8 }}>ENV → YAML</button>
          </div>
        </div>
      </div>
      <footer style={{ marginTop: 40, color: '#aaa' }}>
        <small>Made for YAML &lt;-&gt; ENV conversion</small>
      </footer>
    </div>
  );
};

export default App;
