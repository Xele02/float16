import loadPlugins from "rollup-load-plugins";

const $ = loadPlugins();

const banner =
`<%= pkg.name %> <%= pkg.version %> - https://github.com/petamoriken/float16
generated at <%= moment().format('YYYY-MM-DD HH:mm Z') %>

---<% _.forEach(dependencies, function (dependency) { %>
  <%= dependency.name %> <%= dependency.version %>
<% }) %>`;

export default {
    entry: "src/index.js",
    dest: "browser/float16.js",
    plugins: [
        $.nodeResolve({ browser: true }),
        $.babel({
            babelrc: false,
            presets: [["env", {
                targets: {
                    browsers: ["last 2 versions", "not ie >= 10", "not android >= 4.4.3", "Firefox ESR"]
                },
                modules: false,
                exclude: ["transform-regenerator"]
            }]]
        }),
        $.license({ banner })
    ],
    moduleName: "float16",
    format: "iife"
};