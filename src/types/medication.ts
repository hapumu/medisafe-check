export interface Medication {
  id: string;
  name: string;
  genericName?: string;
}

export interface Interaction {
  drug1: string;
  drug2: string;
  severity: "major" | "moderate" | "minor";
  description: string;
  mechanism: string;
  recommendation: string;
}
