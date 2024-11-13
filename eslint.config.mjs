import neko from 'eslint-config-neko';

const conf = [
  ...neko.configs.recommended,
  { ignores: ['lib', 'es', 'node_modules', 'coverage' ] },
];

export default conf;
