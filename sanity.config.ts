import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectSchema } from "./schemaTypes/project";

export default defineConfig({
  name: "stackform",
  title: "Stackform CMS",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mock-project-id",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: [projectSchema] },
});
