export type Errors<T> = T extends Record<string, any> ? { [K in keyof T]?: Errors<T[K]> } : string;
export type Schema<T> = (data: unknown) => { error: Errors<T>; data: undefined } | { error: undefined; data: T };
