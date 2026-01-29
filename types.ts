
export interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface RecommendationResponse {
  tools: {
    name: string;
    description: string;
    url: string;
    category: string;
  }[];
}
