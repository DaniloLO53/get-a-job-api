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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("../customer/customer.service");
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService, customerService, jwtService) {
        this.authService = authService;
        this.customerService = customerService;
        this.jwtService = jwtService;
    }
    async signIn(body, userType) {
        return await this.authService.signIn(body, userType);
    }
    async googleOauthHandler(query) {
        const code = query.code;
        try {
            const { id_token, access_token } = await this.authService.getGoogleOAuthTokens({ code });
            const googleUser = await this.authService.getGoogleUser({
                id_token,
                access_token,
            });
            const dbUser = await this.customerService.createProfileByOauth({
                email: googleUser.email,
            });
            const token = await this.jwtService.signAsync({ dbUser });
            return { token };
        }
        catch (error) {
            throw new common_1.UnauthorizedException({ 'error: ': error });
        }
    }
};
__decorate([
    (0, common_1.Post)('/:user/sign-in'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignInDto, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('/customer/oauth/google'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleOauthHandler", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        customer_service_1.CustomerService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map