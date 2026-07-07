export const maskCPF = (value) => {
  return value
    .replace(/\D/g, '') // remove all non digits
    .replace(/(\d{3})(\d)/, '$1.$2') // add dot after 3 digits
    .replace(/(\d{3})(\d)/, '$1.$2') // add dot after 6 digits
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') // add dash after 9 digits
    .replace(/(-\d{2})\d+?$/, '$1'); // prevent more than 11 digits
};

export const maskDate = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{4})\d+?$/, '$1');
};

export const maskCEP = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
};
