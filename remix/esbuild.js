const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
esbuild
  .build({
    entryPoints: ['./src/index.ts', './src/react/index.ts', './src/node/index.ts'],
    outdir: '.',
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: 'node',
    format: 'cjs',
    target: 'node14',
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
