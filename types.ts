
export interface Teacher {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface PricingTier {
  name: string;
  price: string;
  reservation: string;
  features: string[];
  recommended?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WeeklyContent {
  week: number;
  title: string;
  description: string;
}
