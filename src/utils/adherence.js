export function calculateAdherence(answers) {
  if (!answers || answers.length === 0) return 0;

  const total = answers.length;
  const fullyCompliantCount = answers.filter(
    (a) => a.status === "atende"
  ).length;

  return Math.round((fullyCompliantCount / total) * 100);
}
