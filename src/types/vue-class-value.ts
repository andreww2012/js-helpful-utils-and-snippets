type ClassDictionaryValue = ClassValue[] | string | number | null | boolean | undefined;
export type ClassValue = ClassDictionaryValue | Record<string, ClassDictionaryValue>;
