# css-modules-types-generator-loader

### Installation

```bash
npm i --save-dev css-modules-types-generator-loader
// or
yarn add -D css-modules-types-generator-loader
```

### Usage

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/, // work with everything
        use: [
          isProd ? MiniCss.loader : "style-loader",
          "css-modules-types-generator-loader", // goes here
          {
            loader: "css-loader",
            options: {
              importLoaders: 1, // for sass
              module: {
                localIdentName: "[name:hash:something]"
              }
            }
          },
          "sass-loader" // if you want
        ].filter(x => x)
      }
    ]
  }
};
```
