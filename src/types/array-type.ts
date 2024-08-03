/**
 * Much simpler alternative which you don't even need to have a separate type for:
 * `T[number]`
 */
export type ArrayType<T> = T extends readonly (infer U)[] ? U : never;
