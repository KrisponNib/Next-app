import { NextState, Profile } from "@/lib/types";

export function updateProfile(state: NextState, profile: Profile): NextState {
  return { ...state, profile };
}
