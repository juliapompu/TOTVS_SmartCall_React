import React, { useState } from 'react';
import '../styles/JsonUploadDetail.css';

export default function JsonUploadDetail({ onClose, onUpload }) {
  const [fileName, setFileName] = useState('');
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        setJsonText(JSON.stringify(parsed, null, 2));
        setError(null);
        if (onUpload) onUpload(parsed);
      } catch (err) {
        setError('JSON inválido: ' + err.message);
        setJsonText('');
      }
    };
    reader.readAsText(file, 'utf-8');
  };

  return (
    <div className="company-detail-overlay" onClick={onClose}>
      <div className="company-detail-card" onClick={(e) => e.stopPropagation()}>
        <button className="company-detail-close" onClick={onClose} aria-label="Fechar">×</button>

        <div className="company-detail-header">
          <div>
            <h3>Upload JSON</h3>
            <p className="company-detail-subtitle">Selecione um arquivo .json para visualizar e carregar</p>
          </div>
        </div>

        <div className="company-detail-section">
          <input type="file" accept=".json,application/json" onChange={handleFile} />
          {fileName && <p style={{margin:'8px 0 0 0'}}>Arquivo: {fileName}</p>}
          {error && <p style={{color:'red'}}>{error}</p>}
        </div>

        {jsonText && (
          <div className="company-detail-section">
            <div className="company-detail-label">Preview</div>
            <pre style={{background:'#6594c3',padding:10,borderRadius:4,overflow:'auto',maxHeight:300}}>{jsonText}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
