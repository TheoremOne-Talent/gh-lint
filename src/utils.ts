export function sumArray(array: number[]) {
  return array.reduce((a, b) => a + b, 0);
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
