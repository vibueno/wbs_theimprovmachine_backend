# The Improv Machine - Backend - Technical Details

This project have been created using:

- [Atom](https://atom.io)
- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org)
- [Jest](https://jestjs.io)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)

in the following environment:

- [Fedora](https://getfedora.org)
- [Atom](https://atom.io)

The following steps have been performed in order to set-up the project:

1. Create project folder
2. Set-up node project:

```bash
npm init
```

3. Add prettier config to package.json:

```json
"prettier": {
  "trailingComma": "none",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "arrowParens": "avoid"
}
```

4. Install dependencies:

```bash
npm i nodemon
npm i dotenv
npm i express
npm i body-parser
npm i cors
```

5. Install TypeScript

```bash
npm install typescript --save-dev
```

6. Install TypeScript compiler

```bash
npx tsc
```

7. Add tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es6",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "outDir": "build"
  },
  "include": ["src"]
}
```

8. Install needed types:

```bash
npm i --save-dev @types/express
npm i --save-dev @types/cors
...
```

9. Add .gitignore and make sure you ignore the build directory

10. Create ESLint config using:

```bash
npx eslint --init
```

You should then have a file called .eslintrc.json in the root folder of your project. The content of this file can be copied to package.json inside the property _eslintConfig_

11. Add following rule to _eslintConfig_:

```json
"rules": {
  "semi": [
    2,
    "always"
  ]
}
```

12. Install ts-node

```bash
npm install ts-node-dev
```

13. Add startsdev script in package.json:

````json
"startsdev": "tsnd ./src/index.ts"
```

14. Now you should be able to run the project:

```bash
npm run startsdev
````

If any changes happen, the project will get compiled and re-run automatically.
