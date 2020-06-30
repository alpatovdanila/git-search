export type Repository = {
  name: string;
  description?: string;
  forks: number;
  stars: number;
  author: {
    name: string;
    url: string;
  };
  license?: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  };
  language: string;
  url: string;
  id: number;
};
