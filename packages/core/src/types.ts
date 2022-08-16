export type Errors<T> = T extends Record<string, any> ? { [K in keyof T]?: Errors<T[K]> } : string;
export type Schema<T> = (data: unknown) => { errors: Errors<T>; data: undefined } | { errors: undefined; data: T };
