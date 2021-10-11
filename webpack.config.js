
const path = require("path");
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports={
    mode:"development",

    entry:path.join("front","main.js"),

    output:{
        path:path.resolve(path.join(__dirname,"public","javascript")),
        filename:"main.js"
    },

    module:{
        
    },

    plugins:[

    ]
}