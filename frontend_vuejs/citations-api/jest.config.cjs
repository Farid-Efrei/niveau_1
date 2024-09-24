module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};

// module.exports = {
//   testEnvironment: "jsdom",
//   transform: {
//     "^.+\\.vue$": "@vue/vue3-jest", // transformer les fichiers .vue en vue-jest
//     "^.+\\.m?js$": "babel-jest", // transformer les .js en babel-jest
//   },
//   moduleFileExtensions: [
//     "vue",
//     "js",
//     "json",
//     "jsx",
//     "ts",
//     "tsx",
//     "node",
//     "mjs",
//   ],
//   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|mjs)$",
//   testEnvironment: "jsdom",
//   transformIgnorePatterns: ["/node_modules/(?!@vue/test-utils)"],
//   // extensionsToTreatAsEsm: [".js", ".mjs"],
// };
