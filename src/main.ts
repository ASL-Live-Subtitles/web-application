import { RunPipe, PipelineRequest, getUser, login, logout } from "./api.js";

function parseList(text: string): string[] {
  return text
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v.length > 0);
}

document.addEventListener("DOMContentLoaded", () => {
  // ---------- AUTH UI ----------
  const token = new URLSearchParams(window.location.search).get("token");
  if (token) {
    localStorage.setItem("auth_token", token);
    window.history.replaceState({}, "", window.location.pathname);
  }
  const authStatus = document.getElementById("auth-status") as HTMLSpanElement;
  const loginLink = document.getElementById("login-link") as HTMLAnchorElement;
  const logoutLink = document.getElementById("logout-link") as HTMLAnchorElement;

  loginLink.onclick = (e) => {
    e.preventDefault();
    login();
  };

  logoutLink.onclick = (e) => {
    e.preventDefault();
    logout();
  };

  async function loadUser() {
    try {
      const data = await getUser();
      if (!data) {
        authStatus.textContent = "Not signed in";
        loginLink.style.display = "inline";
        logoutLink.style.display = "none";
        return;
      }

      const user = data.user;
      authStatus.textContent = `Signed in as ${user.name || user.email}`;
      loginLink.style.display = "none";
      logoutLink.style.display = "inline";
    } catch {
      authStatus.textContent = "Auth error";
    }
  }

  loadUser();

  // ---------- PIPELINE FORM ----------
  const form = document.getElementById("asl-form") as HTMLFormElement;
  const glossesInput = document.getElementById("glosses-input") as HTMLInputElement;
  const lettersInput = document.getElementById("letters-input") as HTMLInputElement;
  const contextInput = document.getElementById("context-input") as HTMLTextAreaElement;

  const errorDiv = document.getElementById("error") as HTMLDivElement;
  const resultDiv = document.getElementById("result") as HTMLDivElement;
  const sentenceSpan = document.getElementById("sentence") as HTMLSpanElement;
  const sentimentSpan = document.getElementById("sentiment") as HTMLSpanElement;

  const submitButton = document.getElementById("submit-button") as HTMLButtonElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorDiv.style.display = "none";
    resultDiv.style.display = "none";

    const payload: PipelineRequest = {
      glosses: parseList(glossesInput.value),
      letters: parseList(lettersInput.value),
      context: contextInput.value.trim(),
    };

    submitButton.disabled = true;
    submitButton.textContent = "Processing...";

    try {
      const data = await RunPipe(payload);

      sentenceSpan.textContent = data.sentence;
      sentimentSpan.textContent = data.sentiment.sentiment;

      resultDiv.style.display = "block";
    } catch (err: any) {
      errorDiv.textContent = err.message || "Unknown error";
      errorDiv.style.display = "block";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit";
    }
  });
});
