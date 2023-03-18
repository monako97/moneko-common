function classNames(...args: unknown[]) {
  let result = '';

  for (let i = 0, len = args.length; i < len; i++) {
    const cls = args[i];

    if (cls) {
      result += `${cls} `;
    }
  }
  return result.trim();
}

export default classNames;
