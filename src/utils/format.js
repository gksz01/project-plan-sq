export function formatStatusLabel(status) {
  switch (status) {
    case "aberta":
      return "Aberta";
    case "em-andamento":
      return "Em andamento";
    case "resolvida":
      return "Resolvida";
    default:
      return status;
  }
}
