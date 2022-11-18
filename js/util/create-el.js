export default function createEl({ tagName, attrs = null, content = "" }) {
  const el = document.createElement(tagName);
  if (attrs) attrs.forEach(({ key, value }) => el.setAttribute(key, value));
  if (typeof content === "string") el.append(document.createTextNode(content));
  else content.forEach((cont) => el.append(createEl(cont)));
  return el;
}
