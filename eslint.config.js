import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import tailwind from "eslint-plugin-tailwindcss";

export default [

  pluginJs.configs.recommended,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.strict,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...tailwind.configs["flat/recommended"],

  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser
    },

    rules: {
      // General rules
      semi: ["error", "always"], // Code should use semicolons
      quotes: ["error", "double"], // Code should use double quotes
      "no-console": "warn", // Code should not use console.log
      "no-unused-vars": "error", // Code should not have unused variables
      "no-var": "error", // Code should not use var but let or const
      "prefer-const": "error", // Code should use const when possible
      "no-template-curly-in-string": "error", // Disallow template literals
      "no-unused-expressions": "error", // Disallow unused expressions
      "no-undef": "off", // Allowing undefined variables
      "no-unreachable": "error", // Disallow unreachable code after return, throw, continue, and break statements
      "no-unreachable-loop": "error", // Disallow loops with a body that allows only one iteration
      "no-unmodified-loop-condition": "error", // Disallow unmodified loop conditions
      "no-await-in-loop": "error", // Disallow await inside of loops. Use Promise.all instead
      "no-duplicate-imports": "error", // Disallow duplicate module imports
      "no-inner-declarations": "error", // Disallow variable or function declarations in nested blocks
      "no-self-compare": "error", // Disallow comparisons where both sides are exactly the same
      "no-useless-return": "error", // Disallow redundant return statements
      "no-useless-concat": "error", // Disallow unnecessary concatenation of literals or template literals
      "no-useless-assignment": "error", // Disallow variable assignments where the variable is not used
      camelcase: "error", // Enforce camelcase naming convention
      "capitalized-comments": "error", // Enforce capitalization of the first letter of a comment
      complexity: ["warn", 10], // Suggestions for refactoring code with high complexity
      curly: ["error", "multi"], // Enforce curly braces for control flow statements
      "default-case": "error", // Require default cases in switch statements
      "dot-notation": "error", // Enforce dot notation whenever possible
      "default-case-last": "error", // Enforce default clauses in switch statements to be last
      "default-param-last": "error", // Enforce default parameters to be last
      "eqeqeq": "error", // Require the use of === and !==
      "func-style": ["error", "expression"], // Enforce use of function declarations or expressions
      "max-lines": ["warn", 100], // Warn when a file exceeds 100 lines
      "no-eval": "error", // Disallow the use of eval()
      "yoda": "error", // Enforce consistent order of arguments in comparisons


      // React rules
      "react/jsx-uses-react": "off", // Disable the rule that requires React to be in scope
      "react/react-in-jsx-scope": "off", // Disable the rule that requires React to be in scope for JSX
      "react/jsx-max-props-per-line": ["error", { "maximum": 1 }], // Enforce one prop per line if there are multiple props
      "react/jsx-closing-bracket-location": ["error", "line-aligned"], // Enforce closing bracket location
      "react/function-component-definition": [
        "error",
        {
          "namedComponents": "arrow-function", // Enforce arrow function for named components
          "unnamedComponents": "arrow-function" // Enforce arrow function for unnamed components
        }
      ],
      "arrow-body-style": ["error", "as-needed"], // Enforce concise arrow function bodies

      // TypeScript rules
      "@typescript-eslint/consistent-type-definitions": ["error", "type"], // Enforce consistent type definitions
    }
  },
];