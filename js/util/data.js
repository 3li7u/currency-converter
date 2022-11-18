export default async function fetchData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) return data;
    else throw new Error("Failed to fetch");
  } catch (error) {
    return error.message;
  }
}

const fetchCurrencies = async () => {
  const data = await fetchData("https://api.exchangerate.host/symbols");
  if (data.success) {
    return data.symbols;
  }
};

export const getCurrencies = async () => {
  const curr = await fetchCurrencies();
  const currencies = [];
  for (const cur in curr) {
    currencies.push(curr[cur]);
  }
  return currencies;
};

export const getCurrenciesData = async (rates) => {
  const currencies = await getCurrencies();
  return currencies
    .filter(({ code }) => rates[code])
    .map(({ description, code }) => ({ description, code, rate: rates[code] }));
};
