"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostBusiness_1 = __importDefault(require("./business/PostBusiness"));
const UserBusiness_1 = __importDefault(require("./business/UserBusiness"));
const app_1 = require("./controller/app");
const PostController_1 = __importDefault(require("./controller/PostController"));
const UserController_1 = __importDefault(require("./controller/UserController"));
const PostData_1 = __importDefault(require("./data/PostData"));
const UserData_1 = __importDefault(require("./data/UserData"));
const Authenticator_1 = require("./services/Authenticator");
const HashManager_1 = require("./services/HashManager");
const IdGenerator_1 = require("./services/IdGenerator");
const userBusiness = new UserBusiness_1.default(new UserData_1.default(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new Authenticator_1.Authenticator());
const userController = new UserController_1.default(userBusiness);
app_1.app.post("/user/signup", userController.signup);
app_1.app.post("/user/login", userController.login);
const postBusiness = new PostBusiness_1.default(new PostData_1.default(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new Authenticator_1.Authenticator());
const postController = new PostController_1.default(postBusiness);
app_1.app.post("/post/create", postController.create);
app_1.app.get("/post/:id", postController.get);
//# sourceMappingURL=index.js.map