export const toSlug = (value: any): string =>
  String(value)
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

export const fromSlug = (value: string): string => `${value.charAt(0).toUpperCase()}${value.substr(1).toLowerCase()}`.replace('-', ' ');
