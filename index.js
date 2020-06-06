const path = require("path");
const { readFile, writeFile } = require("fs");
const { camelize } = require("humps");
const { getOptions } = require("loader-utils");

const template = require("./lib/template");

function getConfig(loader) {
  const config = getOptions(loader) || {};

  return {
    suffix: () => "Styles",
    ...config,
  };
}

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function stripExtension(s) {
  return s.split(".")[0];
}

function validateName(s) {
  if (/^[a-zA-Z]/.test(s) === false) {
    return `I${s}`;
  }

  return s;
}

module.exports = function loader(webpackSource) {
  if (this.cacheable) {
    this.cacheable();
  }

  const callback = this.async();

  const end = (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null, webpackSource);
    }
  };

  const match = webpackSource.match(/exports\.locals.*=([^]*?);/);

  if (match) {
    const config = getConfig(this);

    const locals = [];

    match[1].split("\n").map((s) => {
      const keyMatch = s.match(/"(.*?)"/g);

      if (keyMatch) {
        locals.push({
          key: keyMatch[0].replace(/"/g, ""),
          value: keyMatch[1].replace(/"/g, ""),
        });
      }
    });

    if (locals.length) {
      const suffix = config.suffix(this.resource);
      const name = `${validateName(
        capitalizeFirstLetter(
          camelize(stripExtension(path.basename(this.resource)))
        )
      )}${suffix}`;

      const output = template(name, locals);
      const filename = `${this.resource}.d.ts`;

      readFile(filename, (err, data) => {
        if (err || data !== output) {
          writeFile(filename, output, end);
        } else {
          end();
        }
      });
    } else {
      end();
    }
  } else {
    end();
  }
};
