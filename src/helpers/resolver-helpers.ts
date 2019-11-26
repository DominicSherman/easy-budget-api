export const getPropertyFromArgsOrRoot = (root: any, args: any, key: string): any | undefined =>
    args[key] || root[key];
