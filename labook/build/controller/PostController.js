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
Object.defineProperty(exports, "__esModule", { value: true });
class PostController {
    constructor(postBusiness) {
        this.postBusiness = postBusiness;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { photo, description, type } = req.body;
            const input = {
                photo,
                description,
                type
            };
            const token = req.headers.authorization;
            try {
                const id = yield this.postBusiness.create(input, token);
                res.status(201).send({ message: "Post criado com sucesso", id });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro na criação do Post");
            }
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const queryResult = yield this.postBusiness.get(id);
            const post = {
                id: queryResult.id,
                photo: queryResult.photo,
                description: queryResult.description,
                type: queryResult.type,
                createdAt: queryResult.createdAt,
                authorId: queryResult.authorId
            };
            try {
                res.status(200).send({ post });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro ao Localizar o Post");
            }
        });
    }
}
exports.default = PostController;
//# sourceMappingURL=PostController.js.map