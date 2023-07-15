import { SignUpDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(signUpData: SignUpDto): Promise<import(".prisma/client").User>;
    test(): string;
}