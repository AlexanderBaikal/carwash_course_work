export const normalizePhoneInput = (value, previousValue) => {
  // return nothing if no value
  if (!value) return value;

  // only allows 0-9 inputs
  const currentValue = '+7 ' + value.slice(3).replace(/[^\d]/g, '');
  const cvLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    // returns: "x", "xx", "xxx"
    if (cvLength < 7) return currentValue;

    // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
    if (cvLength < 10)
      return `+7 (${currentValue.slice(3, 6)}) ${currentValue.slice(6)}`;

    // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
    return `+7 (${currentValue.slice(3, 6)}) ${currentValue.slice(
      6,
      9,
    )}-${currentValue.slice(9, 13)}`;
  }
};
