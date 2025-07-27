// Auto-generated index.ts for Pages Functions routing
import { TemplateSuggestionBackendHandler } from './TemplateSuggestionBackend';
import { ContentOptimizationBackendHandler } from './ContentOptimizationBackend';
import { ExportBackendHandler } from './ExportBackend';
import { UserAccountSystemBackendHandler } from './UserAccountSystemBackend';
import { TemplateLibraryBackendHandler } from './TemplateLibraryBackend';

export async function onRequest({ request }) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/api/TemplateSuggestionBackend") return TemplateSuggestionBackendHandler(request);
  if (path === "/api/ContentOptimizationBackend") return ContentOptimizationBackendHandler(request);
  if (path === "/api/ExportBackend") return ExportBackendHandler(request);
  if (path === "/api/UserAccountSystemBackend") return UserAccountSystemBackendHandler(request);
  if (path === "/api/TemplateLibraryBackend") return TemplateLibraryBackendHandler(request);

  return new Response("Not found", { status: 404 });
}
