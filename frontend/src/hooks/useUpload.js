import { useState, useCallback } from "react";
import { uploadFile, ApiError } from "../services/api";

/**
 * useUpload — manages the full lifecycle of a CSV upload.
 *
 * Returns:
 *   upload(file)    → triggers the upload
 *   reset()         → clears all state back to idle
 *   status          → "idle" | "uploading" | "success" | "error"
 *   progress        → 0-100 (only meaningful during "uploading")
 *   fileData        → server response once upload succeeds
 *   error           → human-readable error string (or null)
 */
export function useUpload() {
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState(null);

  const upload = useCallback(async (file) => {
    // Reset before starting
    setStatus("uploading");
    setProgress(0);
    setFileData(null);
    setError(null);

    try {
      const data = await uploadFile(file, (pct) => setProgress(pct));
      setFileData(data);
      setStatus("success");
    } catch (err) {
      const message = buildErrorMessage(err);
      setError(message);
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setProgress(0);
    setFileData(null);
    setError(null);
  }, []);

  return { upload, reset, status, progress, fileData, error };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildErrorMessage(err) {
  if (!(err instanceof ApiError)) {
    return err?.message || "An unexpected error occurred.";
  }

  if (err.isNetworkError) {
    return "Cannot reach the server. Make sure the backend is running.";
  }
  if (err.isFileTooLarge) {
    return "File is too large. Please upload a file under the size limit.";
  }
  if (err.isValidation) {
    return err.message || "Invalid file. Please check the format and try again.";
  }

  return err.message || "Upload failed. Please try again.";
}