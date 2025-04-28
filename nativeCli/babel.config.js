module.exports = {
  presets: ['module:@react-native/babel-preset'],

  plugins: [//if you already have other plugin just paste this lines below
  ["module-resolver", {
    extensions: [
      ".ios.js",
      ".android.js",
      ".ios.jsx",
      ".android.jsx",
      ".js",
      ".jsx",
      ".json",
      ".ts",
      ".tsx",
      ".d.ts"
    ],

    root: ["."],

    alias: {
      "@src": "./src"
    },

    plugins: [//if you already have other plugin just paste this lines below
    ["module-resolver", {
      extensions: [
        ".ios.js",
        ".android.js",
        ".ios.jsx",
        ".android.jsx",
        ".js",
        ".jsx",
        ".json",
        ".ts",
        ".tsx",
        ".d.ts"
      ],

      root: ["."],

      alias: {
        "@src": "./src"
      }
    }]]
  }], //if you already have other plugin just paste this lines below
  ["module-resolver", {
    extensions: [
      ".ios.js",
      ".android.js",
      ".ios.jsx",
      ".android.jsx",
      ".js",
      ".jsx",
      ".json",
      ".ts",
      ".tsx",
      ".d.ts"
    ],

    root: ["."],

    alias: {
      "@src": "./src"
    },

    plugins: [//if you already have other plugin just paste this lines below
    ["module-resolver", {
      extensions: [
        ".ios.js",
        ".android.js",
        ".ios.jsx",
        ".android.jsx",
        ".js",
        ".jsx",
        ".json",
        ".ts",
        ".tsx",
        ".d.ts"
      ],

      root: ["."],

      alias: {
        "@src": "./src"
      }
    }]]
  }]]
}