module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jquery":true
    },
    "extends": "airbnb-base",
    "rules": {
      "no-console": 0,
      "init-declarations": 0,
      "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
      "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": 0,
        "quotes": 0,
      "no-inline-comments": 0,
    },
  "globals": {
    "moment": true,
    "require":true,
    "htmlTemplates":true
  },

};