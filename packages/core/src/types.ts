export type ValidestError<T> = T extends Record<string, any> ? { [K in keyof T]?: ValidestError<T[K]> } : string;
export type Schema<T> = (data: unknown) => { error: ValidestError<T>; data: undefined } | { error: undefined; data: T };
export type InferSchema<T> = T extends Schema<infer S> ? S : never;
