export interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
}

export interface PlanResponse {
  plans: Plan[];
}
