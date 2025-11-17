import { useMemo } from "react";
import { calculateAdherence } from "../utils/adherence";

export function useChecklist(answers) {
  const adherence = useMemo(
    () => calculateAdherence(answers),
    [answers]
  );

  return { adherence };
}
