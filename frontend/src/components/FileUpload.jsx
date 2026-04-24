import { useRef } from "react";
import { useUpload } from "../hooks/useUpload";

/**
 * FileUpload
 *
 * Drag-and-drop / click-to-select upload component.
 * Calls the backend /upload endpoint and surfaces results via onSuccess.
 *
 * Props:
 *   onSuccess(fileData) — called with the server response after a successful upload
 */
export default function FileUpload({ onSuccess }) {
  const inputRef = useRef(null);
  const { upload, reset, status, progress, fileData, error } = useUpload();

  // ── handlers ─────────────────────────────────────────────────────────────

  function handleFileChosen(file) {
    if (!file) return;
     const isCsv =
      file.name.toLowerCase().endsWith(".csv") ||
      file.type === "text/csv" ||
      file.type === "application/vnd.ms-excel";

    if (!isCsv) {
       console.error("Solo CSV");
      return;
    }
  upload(file);
  }

  function handleInputChange(e) {
    handleFileChosen(e.target.files?.[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFileChosen(e.dataTransfer.files?.[0]);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  // Notify parent on success (once per upload)
  if (status === "success" && fileData && onSuccess) {
    setTimeout(() => onSuccess(fileData), 0);
  }

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div className="upload-wrapper">
      {/* Drop zone */}
      {status !== "success" && (
        <div
          className={`drop-zone ${status === "uploading" ? "drop-zone--uploading" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          aria-label="Upload CSV file"
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={handleInputChange}
            style={{ display: "none" }}
          />

          {status === "uploading" ? (
            <UploadingState progress={progress} />
          ) : (
            <IdleState />
          )}
        </div>
      )}

      {/* Error banner */}
      {status === "error" && (
        <div className="upload-error" role="alert">
          <span>⚠️ {error}</span>
          <button className="btn-retry" onClick={reset}>
            Try again
          </button>
        </div>
      )}

      {/* Success state */}
      {status === "success" && fileData && (
        <SuccessState fileData={fileData} onReset={reset} />
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function IdleState() {
  return (
    <>
      <div className="drop-icon">📂</div>
      <p className="drop-primary">Drop your CSV file here</p>
      <p className="drop-secondary">or click to browse</p>
    </>
  );
}

function UploadingState({ progress }) {
  return (
    <>
      <div className="drop-icon upload-spin">⏳</div>
      <p className="drop-primary">Uploading… {progress}%</p>
      <div className="progress-bar">
        <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
      </div>
    </>
  );
}

function SuccessState({ fileData, onReset }) {
  return (
    <div className="upload-success">
      <p className="success-title">✅ File uploaded successfully</p>
      <ul className="success-meta">
        <li><strong>File:</strong> {fileData.filename}</li>
        {fileData.rows != null && <li><strong>Rows:</strong> {fileData.rows}</li>}
        {fileData.columns != null && <li><strong>Columns:</strong> {fileData.columns}</li>}
        {fileData.file_id && <li><strong>ID:</strong> <code>{fileData.file_id}</code></li>}
      </ul>
      <button className="btn-reset" onClick={onReset}>
        Upload another file
      </button>
    </div>
  );
}