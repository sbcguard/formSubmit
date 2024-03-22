import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import del from 'rollup-plugin-delete';
import terser from '@rollup/plugin-terser';
import cleanup from 'rollup-plugin-cleanup';

export default {
  input: 'src/index.ts', // Entry point of your TypeScript code
  output: [
    {
      file: 'dist/cjs/min/formSubmit.min.js',
      format: 'cjs', // CommonJS format
      sourcemap: true,
      name: 'FormSubmit',
      plugins: [terser()], //minify code
    },
    {
      file: 'dist/esm/min/formSubmit.min.js',
      format: 'es', // ES module format
      sourcemap: true,
      name: 'FormSubmit',
      plugins: [terser()], //minify code
    },
    {
      name: 'formSubmit', // UMD name
      file: 'dist/umd/min/formSubmit.min.js',
      format: 'umd', // UMD format
      sourcemap: true,
      name: 'FormSubmit',
      plugins: [terser()], //minify code
    },
    {
      file: 'dist/cjs/formSubmit.js',
      format: 'cjs', // CommonJS format
      sourcemap: true,
      name: 'FormSubmit',
    },
    {
      file: 'dist/esm/formSubmit.js',
      format: 'es', // ES module format
      sourcemap: true,
      name: 'FormSubmit',
    },
    {
      name: 'formSubmit', // UMD name
      file: 'dist/umd/formSubmit.js',
      format: 'umd', // UMD format
      sourcemap: true,
      name: 'FormSubmit',
      globals: {
        // Specify global variable names for external modules
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  plugins: [
    typescript(), // Handle TypeScript files
    resolve(), // Resolve module imports
    commonjs(), // Convert CommonJS modules to ES modules
    postcss({
      modules: true, // Enable CSS Modules
      extract: true, // Extract CSS to a separate file
      minimize: true, // Minify CSS
      extensions: ['.css'], // Process CSS files
    }),
    // replace({
    //   preventAssignment: true, // Disable
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    // }),
    del({
      targets: ['dist/**/*.d.ts'], //excludes type definition files from production build
    }),
    cleanup({
      comments: 'none', // Remove all comments
      maxEmptyLines: 0,
      extensions: ['.js', '.ts', '.tsx'],
    }),
  ],
  external: [], // Specify external modules to exclude from the bundle
};
