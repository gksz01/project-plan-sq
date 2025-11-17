import { useCallback } from "react";

export function useProjectInfo(setProjectInfo) {
  const handleProjectInfoChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setProjectInfo((prev) => ({ ...prev, [name]: value }));
    },
    [setProjectInfo]
  );

  return { handleProjectInfoChange };
}
