const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Uploads a CSV file to the backend.
 *
 * @param {File} file - The CSV file to upload.
 * @param {function} onProgress - Optional callback (0–100) for upload progress.
 * @returns {Promise<{ file_id: string, filename: string, rows: number, columns: number, preview: Array }>}
 */
export async function uploadFile(file, onProgress = null) {
  const formData = new FormData();
  formData.append("file", file);

  // Use XMLHttpRequest when we need upload progress, plain fetch otherwise.
  if (onProgress) {
    return uploadWithProgress(formData, onProgress);
  }

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return handleResponse(response);
}

/**
 * Retrieves a previously uploaded dataset by its file ID.
 *
 * @param {string} fileId
 * @returns {Promise<object>}
 */
export async function getDataset(fileId) {
  const response = await fetch(`${API_BASE_URL}/datasets/${fileId}`);
  return handleResponse(response);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Parses the response and throws a structured error on failure.
 */
async function handleResponse(response) {
  if (!response.ok) {
    let detail = `HTTP ${response.status}`;
    try {
      const body = await response.json();
      detail = body.detail || body.message || detail;
    } catch {
      // Non-JSON error body — keep the HTTP status string.
    }
    throw new ApiError(detail, response.status);
  }

  return response.json();
}

/**
 * XHR-based upload that fires the onProgress callback.
 */
function uploadWithProgress(formData, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    });

    xhr.addEventListener("load", async () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          reject(new ApiError("Invalid JSON response", xhr.status));
        }
      } else {
        let detail = `HTTP ${xhr.status}`;
        try {
          const body = JSON.parse(xhr.responseText);
          detail = body.detail || body.message || detail;
        } catch {
          // Keep default.
        }
        reject(new ApiError(detail, xhr.status));
      }
    });

    xhr.addEventListener("error", () =>
      reject(new ApiError("Network error — could not reach the server", 0))
    );
    xhr.addEventListener("abort", () =>
      reject(new ApiError("Upload cancelled", 0))
    );

    xhr.open("POST", `${API_BASE_URL}/upload`);
    xhr.send(formData);
  });
}

/**
 * Structured error class so callers can distinguish API errors from
 * generic JS errors and inspect the HTTP status code when needed.
 */
export class ApiError extends Error {
  /**
   * @param {string} message  Human-readable description.
   * @param {number} status   HTTP status code (0 = network failure).
   */
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}