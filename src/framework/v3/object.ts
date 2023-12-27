type Keys<T extends object> = (keyof T)[];
type Values<T extends object> = T[keyof T][];

type Entries<T extends object> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Keys<T>;
}

export function objectValues<T extends object>(obj: T) {
  return Object.values(obj) as Values<T>;
}

export function objectEntries<T extends object>(obj: T) {
  return Object.entries(obj) as Entries<T>;
}
