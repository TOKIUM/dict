// 秒間n回のリクエスト制限をかけて順番に処理を行う
export async function rateLimitedSequentially<T, U>(
  array: T[],
  limitPerSecond: number,
  callback: (element: T, index: number, array: T[]) => Promise<U>,
): Promise<U[]> {
  const result: U[] = [];
  const promises: Promise<U>[] = [];
  const baseInterval = 1000 / limitPerSecond;

  for (let i = 0; i < array.length; i += 1) {
    const interval = baseInterval * i;
    const promise = new Promise<U>((resolve) => {
      setTimeout(() => {
        callback(array[i], i, array).then((value) => {
          result[i] = value;
          resolve(value);
        });
      }, interval);
    });
    promises.push(promise);
  }

  await Promise.all(promises);
  return result;
}
