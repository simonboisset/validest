const getNextVersion = (version: string, mode: string) => {
  const [M, m, p] = version.split('.').map(Number);
  switch (mode) {
    case 'major':
      return `${M + 1}.${m}.${p}`;
    case 'minor':
      return `${M}.${m + 1}.${p}`;
    case 'patch':
      return `${M}.${m}.${p + 1}`;
    default:
      return undefined;
  }
};

export default getNextVersion;
