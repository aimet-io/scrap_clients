export const wait = (seconds: number = 1) =>
  new Promise((res) => setTimeout(() => res(seconds), seconds * 1000));
