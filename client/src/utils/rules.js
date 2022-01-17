export const notNullLengthRule = val => val.length > 0;

export const phoneRule = val => val.length === 17; // temp fix

export const codeRule = val => {
  const pattern = /^[0-9]{4}$/;
  return pattern.test(val.trim());
};

export const gosNumberRule = val => {
  const pattern = /^[a-zA-Zа-яА-Я]{1}[0-9]{3}[a-zA-Zа-яА-Я]{2}$/;
  return pattern.test(val.trim());
};
