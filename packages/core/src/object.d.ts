export declare type Errors<T> = T extends Record<string, any> ? {
    [K in keyof T]?: Errors<T[K]>;
} : string;
export declare type Schema<T> = (data: unknown) => {
    errors: Errors<T>;
    data: undefined;
} | {
    errors: undefined;
    data: T;
};
declare type ObjectParam<T> = {
    [K in keyof T]: Schema<T[K]>;
};
export declare const object: <T extends Record<string, any>>(schema: ObjectParam<T>) => Schema<T>;
export {};
