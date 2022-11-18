import fetchData, { getCurrenciesData } from "./util/data.js";
import {
  createCurrencies,
  createSpinner,
  createTable,
} from "./util/marckup.js";

// render bases currencies
const baseEl = document.querySelector(".bases form");
baseEl.append(await createCurrencies("bases-currencies"));

// render currencies-one
const curOneEl = document.querySelector(".form-group.one");
curOneEl.append(await createCurrencies("currencies-one"));

// render currencies-two
const curTwoEl = document.querySelector(".form-group.two");
curTwoEl.append(await createCurrencies("currencies-two"));

// lesten to bases currencies changes
baseEl.addEventListener("change", (event) =>
  getExchangeRates(event.target.value)
);

// lesten to converter changes
const curConverterEL = document.querySelector(".converter form");
curConverterEL["amount-one"].addEventListener("change", (event) =>
  convertHandler(event.target)
);
curConverterEL["amount-two"].addEventListener("change", (event) =>
  convertHandler(event.target)
);
curConverterEL["currencies-one"].addEventListener("change", () =>
  convertHandler(curConverterEL["amount-one"])
);
curConverterEL["currencies-two"].addEventListener("change", () =>
  convertHandler(curConverterEL["amount-two"])
);

// handle base changes
const getExchangeRates = async (base = "USD") => {
  document.querySelector(".rates").append(createSpinner());
  const data = await fetchData(
    `https://api.exchangerate.host/latest?base=${base}`
  );
  if (data.success) {
    showData(await getCurrenciesData(data.rates));
    document.querySelector(".spinner-bg").remove();
  }
};

// render rates
const showData = (currencies) => {
  const tableEl = document.querySelector(".rates .table");
  tableEl.innerHTML = "";
  tableEl.append(createTable(currencies));
};

// handle converting
const convertHandler = async (target) => {
  document.querySelector(".converter form").append(createSpinner());
  const query =
    target.name === "amount-one"
      ? `from=${curConverterEL["currencies-one"].value}&to=${curConverterEL["currencies-two"].value}`
      : `from=${curConverterEL["currencies-two"].value}&to=${curConverterEL["currencies-one"].value}`;
  const data = await fetchData(
    `https://api.exchangerate.host/convert?${query}&amount=${target.value}`
  );
  if (data.success) {
    target.name === "amount-one"
      ? (curConverterEL["amount-two"].value = parseInt(data.result))
      : (curConverterEL["amount-one"].value = parseInt(data.result));
    document.querySelector(".spinner-bg").remove();
  }
};

// get defaults rates (USD)
window.onload = async () => await getExchangeRates("USD");
