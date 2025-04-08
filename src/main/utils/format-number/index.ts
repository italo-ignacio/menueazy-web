export const formatNumber = (value: number): string => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1).replace('.', ',')} bi`;

  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace('.', ',')} mi`;

  if (value >= 1_000) return `${(value / 1_000).toFixed(0)} mil`;

  return value.toString();
};
