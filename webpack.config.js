const path = require("path");
module.exports = {
    mode: 'development',
    watch: true,
    entry: "./src/main.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.wgsl?$/,
                use: {
                    loader: "ts-shader-loader",
                }
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    }
}