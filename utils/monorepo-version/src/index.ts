import getConfig from './getConfig';
import visitWorspace from './visitWorspace';

export const version = async () => {
  const { version, workspaces } = getConfig();
  for (const workspace of workspaces) {
    visitWorspace(workspace, '0.4.5');
  }
};
