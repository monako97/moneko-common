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
