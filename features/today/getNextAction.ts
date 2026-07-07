import { NextState } from "@/lib/types";
import { runRecommendationEngine } from "@/features/today/recommendation-engine";

export type {
  NextActionRecommendation,
  NextActionRecommendationType,
} from "@/features/today/recommendation-engine";

export function getNextAction(state: NextState) {
  return runRecommendationEngine(state);
}
