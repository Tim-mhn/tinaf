export type PrimitiveType = string | number | boolean;

export const isPrimitive = <T>(t: PrimitiveType | T): t is PrimitiveType =>
  typeof t === 'string' || typeof t === 'boolean' || typeof t === 'number';
