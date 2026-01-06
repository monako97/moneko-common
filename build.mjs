import { convert } from '@moneko/convert';
import { ESLint } from '@moneko/eslint';

console.log('Lint runing...');
console.time('Lint');
const eslint = new ESLint({
  fix: true,
});

try {
  const [results, formatter] = await Promise.all([
    eslint.lintFiles('src'),
    eslint.loadFormatter('stylish'),
  ]);

  const resultText = await formatter.format(results);

  process.stdout.write(resultText);
  await ESLint.outputFixes(results);

  console.timeEnd('Lint');
} catch (err) {
  throw err;
}

const common = {
  jsc: {
    parser: {
      syntax: 'typescript',
      decorators: true,
      dynamicImport: true,
      isolatedModules: true,
    },
    target: 'esnext',
    loose: true,
    minify: {
      mangle: true,
      compress: true,
      format: {
        comments: 'some',
      },
    },
    experimental: {
      emitIsolatedDts: true,
    },
  },
  minify: true,
};

await Promise.all([
  convert({
    outDir: 'esm',
    inputDir: 'src',
    ignore: [/__tests__/],
    options: {
      ...common,
      module: {
        type: 'es6',
      },
    },
  }),
  convert({
    outDir: 'cjs',
    inputDir: 'src',
    ignore: [/__tests__/],
    options: {
      ...common,
      module: {
        type: 'commonjs',
      },
    },
  }),
]).then((childs) => {
  childs.forEach((result) => {
    result.failed.map((msg) => process.stdout.write(msg));
  });
});
