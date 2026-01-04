import { replaceInFile } from 'replace-in-file';

const options = {
  files: 'src/**/*.jsx',
  from: [
    /^export interface .*\{[\s\S]*?\n\}/gm,
    /^interface .*\{[\s\S]*?\n\}/gm,
    /^type [A-Za-z]+ = .*;$/gm,
    /, type [A-Za-z]+/g,
  ],
  to: ['', '', '', ''],
};

try {
  const results = await replaceInFile(options);
  console.log('Replacement results:', results);
} catch (error) {
  console.error('Error occurred:', error);
}
