"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../model/Post"));
class PostBusiness {
    constructor(postData, idGenerator, hashManager, authenticator) {
        this.postData = postData;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
        this.create = (input, token) => __awaiter(this, void 0, void 0, function* () {
            const { photo, description, type } = input;
            if (!photo || !description || !type) {
                throw new Error("Campos inválidos");
            }
            const tokenData = this.authenticator.getTokenData(token);
            const author_id = tokenData.id;
            const id = this.idGenerator.generateId();
            const post = new Post_1.default(id, photo, description, type, author_id);
            yield this.postData.insert(post);
            return id;
        });
        this.get = (id) => __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postData.findById(id);
            if (!post) {
                throw new Error("Erro ao encontrar o post");
            }
            return post;
        });
    }
}
exports.default = PostBusiness;
//# sourceMappingURL=PostBusiness.js.map