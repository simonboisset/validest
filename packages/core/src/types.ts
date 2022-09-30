export type TsvError<T> = T extends Record<string, any> ? { [K in keyof T]?: TsvError<T[K]> } : string;
export type Schema<T> = (data: unknown) => { error: TsvError<T>; data: undefined } | { error: undefined; data: T };
export type InferSchema<T> = T extends Schema<infer S> ? S : never;
