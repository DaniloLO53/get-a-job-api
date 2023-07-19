import { SignUpDto } from './agreement.dto';
import { AgreementService } from './agreement.service';
export declare class AgreementController {
    private readonly agreementService;
    constructor(agreementService: AgreementService);
    createAgreement(signUpData: SignUpDto): Promise<void>;
    test(): string;
}
