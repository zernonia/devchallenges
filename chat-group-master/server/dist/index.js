"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = __importDefault(require("http"));
var mongoose_1 = __importDefault(require("mongoose"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv = __importStar(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var index_1 = require("./routes/index");
var index_2 = require("./socket/index");
var app = express_1.default();
dotenv.config();
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
app.use(cors_1.default({
    origin: 'http://localhost:8080',
    credentials: true,
}));
mongoose_1.default.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, function (err) {
    if (err)
        console.log('Error connecting to DB');
    else
        console.log('Connected to DB');
});
var server = http_1.default.createServer(app);
var io = socket_io_1.default(server);
var nspChannel = io.of('/channel');
nspChannel.on('connection', index_2.onConnect);
app.use('/users', index_1.userRouter);
app.use('/channels', index_1.channelRouter);
server.listen(3000, function () {
    console.log("Server is listening on port 3000");
});
