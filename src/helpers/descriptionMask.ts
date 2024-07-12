export function formatDescription(description: string): string {
  const regex = "(.*)( - (\\d+)/(\\d+))$";
  const matches = description.match(regex);
  if (matches) {
    return matches[1];
  }
  return description;
}
