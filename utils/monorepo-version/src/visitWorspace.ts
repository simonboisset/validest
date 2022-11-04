import * as fs from 'fs';
import * as path from 'path';
import prettier from 'prettier';
export default function visitWorspace(dir: string, version: string): string[] {
  const files = fs.readdirSync(dir);
  for (let filename of files) {
    const file = path.resolve(dir, filename);
    const stat = fs.lstatSync(file);

    if (stat.isDirectory()) {
      updatePackage(file, version);
    }
  }
  return files;
}

const updatePackage = (dir: string, version: string) => {
  const file = path.join(dir, 'package.json');
  let packages = JSON.parse(fs.readFileSync(file) as any);
  packages.version = version;
  for (const dependency in packages.dependencies) {
    if (dependency.includes('validest')) {
      packages.dependencies[dependency] = version;
    }
  }

  fs.writeFileSync(
    file,
    prettier.format(JSON.stringify(packages), { parser: 'json', singleQuote: true, tabWidth: 2, printWidth: 120 })
  );
};
