const isPositiveInt = (val: string) => {
  const re = new RegExp('^[1-9]\\d*$', 'i');
  return re.test(val);
};

export default isPositiveInt;
