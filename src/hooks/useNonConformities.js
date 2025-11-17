import { useMemo } from "react";
import { generateCommunication } from "../utils/communication";

export function useNonConformities(nonConformities, projectInfo, checklistItems) {
  const communicationText = useMemo(
    () =>
      generateCommunication(nonConformities, projectInfo, checklistItems),
    [nonConformities, projectInfo, checklistItems]
  );

  return { communicationText };
}
