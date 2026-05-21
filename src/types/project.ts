export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  client: string;
  type: string;
  tagline: string;
  coverImage?: {
    _type: "image";
    asset: { _ref: string; _type: string };
  };
  tags: string[];
  accentColor: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  // Case study fields
  overview?: string;
  challenge?: string;
  solution?: string;
  results?: Array<{ metric: string; label: string }>;
  images?: Array<{ _type: "image"; asset: { _ref: string; _type: string } }>;
}
