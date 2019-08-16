module.exports = {
    entry: ["@babel/polyfill", "./src/app/index.js"],
    output:{
        path:__dirname + "/src/public",
        filename:"bundle.js"
    },
    module:{
        rules:[
            {
                use:"babel-loader",
                test: /\.js$/,
                exclude:/node_modules/
            },
            {
                use: ["style-loader", "css-loader"],
                test: /\.css$/
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "file-loader",
            }
        ]
    }
}