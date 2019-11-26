export const getPropertyFromArgsOrRoot = (root: any, args: any, key: string): any | undefined =>
    args && args[key] || root && root[key];
