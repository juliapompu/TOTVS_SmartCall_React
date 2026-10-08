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
    <div className="upload-detail-overlay" onClick={onClose}>
      <div className="upload-detail-card" onClick={(e) => e.stopPropagation()}>
        <button className="upload-detail-close" onClick={onClose} aria-label="Fechar">×</button>

        <div className="upload-detail-content">
          <label className="upload-detail-button">
            <span>Cole sua transcrição aqui</span>
            <input type="file" accept=".json,application/json" onChange={handleFile} />
          </label>
          {fileName && <p className="upload-detail-file-name">Arquivo: {fileName}</p>}
          {error && <p className="upload-detail-error">{error}</p>}
        </div>

        {jsonText && (
          <div className="upload-detail-preview">
            <div className="upload-detail-label">Preview</div>
            <pre>{jsonText}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
