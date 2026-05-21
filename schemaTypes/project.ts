import { defineType, defineField } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Project name" }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
    }),
    defineField({ name: "client", type: "string", title: "Client / brand name" }),
    defineField({
      name: "type",
      type: "string",
      title: "Project type",
      options: {
        list: [
          "SaaS Landing",
          "Agency Site",
          "Local Business",
          "E-commerce",
          "Funnel",
          "Other",
        ],
      },
    }),
    defineField({
      name: "tagline",
      type: "string",
      title: "One-line description",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Cover image (1600×900)",
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tech tags",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "accentColor",
      type: "string",
      title: "Accent color (hex)",
    }),
    defineField({
      name: "liveUrl",
      type: "url",
      title: "Live URL (optional)",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Show on homepage",
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Display order",
    }),
    // Case study fields
    defineField({
      name: "overview",
      type: "text",
      title: "Project overview",
    }),
    defineField({ name: "challenge", type: "text", title: "The challenge" }),
    defineField({ name: "solution", type: "text", title: "What we built" }),
    defineField({
      name: "results",
      type: "array",
      title: "Key results",
      of: [
        {
          type: "object",
          fields: [
            { name: "metric", type: "string", title: "Metric (e.g. +340% ROAS)" },
            { name: "label", type: "string", title: "Label (e.g. Return on ad spend)" },
          ],
        },
      ],
    }),
    defineField({
      name: "images",
      type: "array",
      title: "Project screenshots",
      of: [{ type: "image" }],
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
