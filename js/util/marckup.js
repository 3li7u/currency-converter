import createEl from "./create-el.js";
import { getCurrencies } from "./data.js";

export const createSpinner = () => {
  return createEl({
    tagName: "div",
    attrs: [{ key: "class", value: "spinner-bg" }],
    content: [
      {
        tagName: "div",
        attrs: [{ key: "class", value: "spinner spinner-loading-tail-bg" }],
      },
    ],
  });
};

export const createTable = (data) => {
  return createEl({
    tagName: "table",
    content: [
      {
        tagName: "tr",
        content: [
          {
            tagName: "th",
            content: "Currency",
          },
          { tagName: "th", content: "Rate" },
        ],
      },
      ...data.map((item) => ({
        tagName: "tr",
        content: [
          {
            tagName: "td",
            content: [
              { tagName: "span", content: item.description },
              {
                tagName: "span",
                attrs: [{ key: "class", value: "cur-code" }],
                content: `(${item.code})`,
              },
            ],
          },
          {
            tagName: "td",
            content: item.rate.toFixed(2).toString(),
          },
        ],
      })),
    ],
  });
};

export const createCurrencies = async (name) => {
  const cur = await getCurrencies();
  return createEl({
    tagName: "select",
    attrs: [{ key: "name", value: name }],
    content: cur.map((item) =>
      item.code === "USD"
        ? {
            tagName: "option",
            attrs: [
              { key: "value", value: item.code },
              { key: "selected", value: "true" },
            ],
            content: item.description,
          }
        : {
            tagName: "option",
            attrs: [{ key: "value", value: item.code }],
            content: item.description,
          }
    ),
  });
};
