"use strict";
const fs = require("fs");
const path = require("path");
// const ChildProcess = require("child_process");
// const Parcel = require("parcel-bundler");

const gulp = require("gulp");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const dir = path.join(__dirname, "../../tmp");

const library = "./lib";

copyFolderRecursiveSync("./lib", dir);
copyFolderRecursiveSync("./js", dir);

const importAttr = {
  addclasses: `import '${library}/addClasses';\n`,
  combine: `import '${library}/combine';\n`,
  filter: `import '${library}/filter/filter';\n`,
  lazyload: `import '${library}/lazyLoad';\n`,
  nest: `import '${library}/nest';\n`,
  sort: `import '${library}/sort';\n`,
  loadmore: `import '${library}/loadmore/index';\n`,
  tabs: `import '${library}/tabs';\n`,
  anchor: `import '${library}/anchor';\n;`,
  slider: `import '${library}/slider';\n`,
  prevnext: `import '${library}/prevNext';\n`,
};

function randomString() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);
}

async function makeBuild(feature) {
  const name = "cms" + randomString();
  let req = []
    .concat(feature)
    .map((v) => v.toLowerCase())
    .map((val) => {
      return importAttr[val];
    })
    .join("");

  try {
    try {
      fs.openSync(`${dir}/${name}.js`, "w");
      fs.writeFileSync(`${dir}/${name}.js`, req);
    } catch (e) {
      fs.appendFileSync(`${dir}/${name}.js`, req);
    }
    fs.closeSync(`${dir}/${name}.js`);
  } catch (e) {}

  const opt = {
    outDir: dir, // The out directory to put the build files in, defaults to dist
    outFile: name + ".js", // The name of the outputFile
    minify: true, // Minify files, enabled if process.env.NODE_ENV === 'production'
    target: "browser",
    autoinstall: false,
    sourceMaps: false,
    cache: false,
  };

  /** Webpack bundle */
  gulp.task("webpack", function () {
    const config = {
      mode: "production",
      output: {
        filename: `${name}.js`,
      },
      resolve: {
        modules: [path.resolve(__dirname, "./node_modules"), "node_modules"],
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: "pre",
            use: ["source-map-loader"],
          },
        ],
      },
    };

    return gulp
      .src(`${dir}/${name}.js`)
      .pipe(webpackStream(config), webpack)
      .pipe(gulp.dest(dir + "/build/es5"));
  });

  try {
    return new Promise((resolve, reject) => {
      gulp.series("webpack", (done) => {
        done();
        fs.unlinkSync(`${dir}/${name}.js`);
        resolve(`${dir}/build/es5/${name}.js`);
        setTimeout(() => {
          fs.unlinkSync(`${dir}/build/es5/${name}.js`);
        }, 10 * 1000);
      })();
    });

    // await new Parcel(`${dir}/lib/${name}.ts`, opt).bundle();
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  importAttr,
  makeBuild,
};

function copyFileSync(source, target) {
  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
  var files = [];

  //check if folder needs to be created or integrated
  var targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}
