const isPositiveInt = (val: string): boolean => {
  const re = new RegExp('^[1-9]\\d*$', 'i');
  return re.test(val);
};

const isNotNullNorUndefined = function (val: string) {
  return typeof val !== 'undefined' && val !== null;
};

export { isPositiveInt, isNotNullNorUndefined };
