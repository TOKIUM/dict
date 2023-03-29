// 秒間n回のリクエスト制限をかけて順番に処理を行う
export async function rateLimitedSequentially<T, U>(
  array: T[],
  limitPerSecond: number,
  callback: (element: T, index: number, array: T[]) => Promise<U>,
): Promise<U[]> {
  const result: U[] = [];
  const interval = 1000 / limitPerSecond;

  for (let i = 0; i < array.length; i += 1) {
    await new Promise((resolve) => setTimeout(resolve, interval));
    result[i] = await callback(array[i], i, array);
  }
  return result;
}
