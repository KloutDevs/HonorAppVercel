export interface Rank {
  id: string;
  name: string;
  position: number;
  cost: number;
  monthly_fee: number;
  earning_goal: number;
  global_earnings_pool: number;
  mission_ids: string[];
  content_ids: string[];
}