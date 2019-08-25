import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import { ConvectorController } from '@worldsibu/convector-core';
import { Lending } from './lending.model';
export declare class LendingController extends ConvectorController<ChaincodeTx> {
    create(lending: Lending): Promise<void>;
}
