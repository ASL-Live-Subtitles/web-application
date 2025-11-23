export type PipelineRequest = {
    glosses: string[];
    letters: string[];
    context: string;
  };
  
  export type PipelineResponse = {
    sentence: string;
    sentiment: string;
  };
  
  const API_URL = "https://composite1-592550011076.us-central1.run.app/asl-pipeline";

  export async function RunPipe(
    payload: PipelineRequest
  ): Promise<PipelineResponse> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    }
  
    return res.json();
  }
  