import * as fs from 'fs';

export default function getConfig() {
  const packages = JSON.parse(fs.readFileSync('package.json') as any);

  return {
    version: packages.version as string,
    workspaces: packages.workspaces.map((workspace: string) => workspace.slice(0, -2)) as string[],
  };
}
