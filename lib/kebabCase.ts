export const kebabCase = (string: string) => {
  return string.toLowerCase().replace(/\s+/g, "-");
};
