export type Repository = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
  updated_at: string;
  language: string | null;
};