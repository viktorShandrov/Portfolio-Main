export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  thumbnail: string;
  images?: string[]; // Списък с директни линкове към снимки. Първата снимка images[0] е главна!
  client: string;
  year: string;
  role: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  gallery?: {
    title: string;
    description: string;
    image?: string;
  }[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  popular?: boolean;
  features: string[];
  deliveryTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}
