export async function TemplateSuggestionBackendHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Unsupported Media Type" }), { status: 415, headers: { "Content-Type": "application/json" } });
    }

    const requestBody = await req.json();
    const { jobTitle } = requestBody;

    if (typeof jobTitle !== "string" || jobTitle.trim() === "") {
      return new Response(JSON.stringify({ error: "Invalid input: jobTitle is required and must be a non-empty string." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Simulate AI processing for template suggestion
    const templates = generateTemplateSuggestions(jobTitle);

    return new Response(JSON.stringify({ templates }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error", details: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

function generateTemplateSuggestions(jobTitle: string): Array<{ id: number, title: string, description: string }> {
  // Mocked template suggestions based on jobTitle
  return [
    { id: 1, title: `${jobTitle} Professional Template`, description: "A modern and professional template tailored for ${jobTitle}." },
    { id: 2, title: `${jobTitle} Creative Template`, description: "A creative template with a unique design for ${jobTitle}." }
  ];
}

export const onRequest = TemplateSuggestionBackendHandler;
