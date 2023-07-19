import { SignUpDto } from './customer.dto';
import { CustomerService } from './customer.service';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(signUpData: SignUpDto): Promise<import(".prisma/client").Customer>;
    test(): string;
}
