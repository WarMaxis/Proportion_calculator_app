export default function debugInstance(inst, removeConstructor) {
  const names = [];
  const proto = Object.getPrototypeOf(inst);

  for (const name of Object.getOwnPropertyNames(proto)) {
    names.push(name);
  }
  if (removeConstructor) {
    const index = names.indexOf('constructor');

    if (index >= 0) {
      names.splice(index, 1);
    }
  }
  return names;
}
