export async function ExportBackendHandler(req: Request): Promise<Response> {
  try {
    const { pathname } = new URL(req.url);

    if (pathname !== "/export") {
      return new Response(JSON.stringify({ error: "Not Found" }), { status: 404, headers: { "Content-Type": "application/json" } });
    }

    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
    }

    const contentType = req.headers.get("Content-Type");
    if (!contentType || contentType !== "application/json") {
      return new Response(JSON.stringify({ error: "Unsupported Media Type" }), { status: 415, headers: { "Content-Type": "application/json" } });
    }

    const body = await req.json();
    const { format, resumeData } = body;

    if (!format || !resumeData) {
      return new Response(JSON.stringify({ error: "Bad Request: Missing format or resumeData" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    if (!["pdf", "word"].includes(format.toLowerCase())) {
      return new Response(JSON.stringify({ error: "Bad Request: Unsupported export format" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const exportedData = await exportResume(format.toLowerCase(), resumeData);

    return new Response(JSON.stringify({ success: true, data: exportedData }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

async function exportResume(format: string, resumeData: any): Promise<string> {
  // Placeholder function for exporting resume data
  // Implement actual logic for converting resumeData to the specified format
  return `Exported resume in ${format} format.`;
}

export const onRequest = ExportBackendHandler;
