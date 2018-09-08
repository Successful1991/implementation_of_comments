module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jquery":true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
      "no-console": 0,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": 0,
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
    },
  "globals": {
    "moment": true
  },

};