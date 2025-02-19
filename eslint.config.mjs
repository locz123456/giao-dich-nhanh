module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "off",  // Cho phép dùng console.log
    "indent": ["error", 2],  // Thụt lề 2 spaces
    "quotes": ["error", "double"],  // Dùng dấu nháy kép
    "semi": ["error", "never"],  // Bắt buộc dấu chấm phẩy
  },
};