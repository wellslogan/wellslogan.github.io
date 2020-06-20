export const toNumberOrDefault = (
  val?: string | number,
): number | undefined => {
  if (typeof val === 'number' || val === undefined) {
    return val;
  }

  const parsed = parseFloat(val);
  if (isNaN(parsed) || !isFinite(parsed)) {
    return undefined;
  }

  return parsed;
};
