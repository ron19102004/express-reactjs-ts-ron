"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("../models/user.model");
const database_config_1 = require("../configurations/database.config");
class UserRepository {
    constructor() {
        //@ts-ignore
        this.getRepository = () => {
            return this.repository;
        };
        this.dataSource = database_config_1.DatabaseConfig.dataSource;
        this.repository = this.dataSource.getRepository(user_model_1.UserModel).extend({
            pagination: (skip, take) => {
                return this.repository.find({
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        avatar: true,
                    },
                    take: take,
                    skip: skip,
                });
            },
        });
    }
}
exports.UserRepository = UserRepository;
