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
      {/* Floating particles for ambient effect */}
      <div className="floating-particle"></div>
      <div className="floating-particle"></div>
      <div className="floating-particle"></div>
      
      <div className="app-header">
        <h1 className="app-title">YAML ↔ ENV</h1>
        <p className="app-subtitle">Convert between YAML and environment variables with ease</p>
      </div>
      
      <div className="converter-container">
        <div className="converter-section">
          <h2 className="section-header">YAML</h2>
          <div className="glass-card">
            <textarea
              className="glass-textarea"
              value={yamlValue}
              onChange={e => setYamlValue(e.target.value)}
              placeholder="Paste your YAML configuration here..."
            />
            <button className="convert-button" onClick={handleYamlToEnv}>
              Convert to ENV →
            </button>
          </div>
        </div>
        
        <div className="converter-section">
          <h2 className="section-header">Environment Variables</h2>
          <div className="glass-card">
            <textarea
              className="glass-textarea"
              value={envValue}
              onChange={e => setEnvValue(e.target.value)}
              placeholder="Paste your .env file here..."
            />
            <button className="convert-button" onClick={handleEnvToYaml}>
              ← Convert to YAML
            </button>
          </div>
        </div>
      </div>
      
      <footer className="app-footer">
        <small>Made with ❤️ for seamless YAML ↔ ENV conversion</small>
      </footer>
    </div>
  );
};

export default App;
