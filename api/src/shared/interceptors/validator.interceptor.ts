import { Injectable, ExecutionContext, HttpException, HttpStatus, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Result } from '../result';
import { IContract } from '../icontract';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(
        public contract: IContract) {  }

    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);
        if (!valid) {
            throw new HttpException(new Result('Ops, algo saiu errado', false, null, this.contract.errors), HttpStatus.BAD_REQUEST);
        }
        return call$;
    }
}
