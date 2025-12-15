export type PipelineRequest = {
  glosses: string[];
  letters: string[];
  context: string;
};

export type PipelineResponse = {
  sentence: string;
  sentiment: { sentiment: string };
};

const API_BASE = "https://composite1-592550011076.us-central1.run.app";

function authHeader(): Record<string, string> {
  const token = localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ---------------- PIPELINE ----------------
export async function RunPipe(
  payload: PipelineRequest
): Promise<PipelineResponse> {
  const res = await fetch(`${API_BASE}/asl-pipeline`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }

  return res.json();
}

// ---------------- AUTH ----------------
export async function getUser() {
  const res = await fetch(`${API_BASE}/users`, {
    headers: authHeader(),
  });

  if (!res.ok) return null;
  return res.json();
}

export function login() {
  window.location.href = `${API_BASE}/login`;
}

export function logout() {
  localStorage.removeItem("auth_token");
  window.location.reload();
}
