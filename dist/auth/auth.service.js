"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const axios_1 = require("axios");
const qs_1 = require("qs");
let AuthService = exports.AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signIn(signInData) {
        const { email, password: pass } = signInData;
        const userRegistered = await this.userService.getProfileByEmail(email);
        if (!userRegistered)
            throw new common_1.UnauthorizedException({ message: 'Invalid User' });
        const validatePassword = await bcrypt.compare(pass, userRegistered.password);
        if (!validatePassword)
            throw new common_1.UnauthorizedException({ message: 'Invalid User' });
        const { password, ...result } = userRegistered;
        const token = await this.jwtService.signAsync({ result });
        return { token };
    }
    async getGoogleUser({ id_token, access_token, }) {
        const response = await axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`,
            },
        });
        return response.data;
    }
    async getGoogleOAuthTokens({ code, }) {
        const URL = 'https://oauth2.googleapis.com/token';
        const values = {
            code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URL,
            grant_type: 'authorization_code',
        };
        try {
            const response = await axios_1.default.post(URL, qs_1.default.stringify(values), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            return response.data;
        }
        catch (error) {
            console.log(error, 'oauth');
            throw new Error(error.message);
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map