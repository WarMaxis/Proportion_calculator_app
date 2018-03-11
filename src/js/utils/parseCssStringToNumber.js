const parseCssStringToNumber = str => {
  const parsed = parseFloat(str);

  return global.isNaN(parsed) ? 0 : parsed;
};

export default parseCssStringToNumber;
