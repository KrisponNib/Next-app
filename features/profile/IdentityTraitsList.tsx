"use client";

import { Pill } from "@/components/ui/Pill";
import { useNextState } from "@/lib/state/useNextState";

export function IdentityTraitsList() {
  const { state } = useNextState();

  return (
    <div className="flex flex-wrap gap-2">
      {state.profile.identityTraits.map((trait) => (
        <Pill key={trait}>{trait}</Pill>
      ))}
    </div>
  );
}
