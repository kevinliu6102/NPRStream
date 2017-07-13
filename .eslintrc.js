module.exports = {
    "extends": "airbnb",
    "env": {
        "jest": true
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "class-methods-use-this": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "jsx-a11y/href-no-hash": "off"
    }
};