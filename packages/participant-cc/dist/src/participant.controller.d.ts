import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import { ConvectorController } from '@worldsibu/convector-core';
import { Participant } from './participant.model';
export declare class ParticipantController extends ConvectorController<ChaincodeTx> {
    create(participant: Participant): Promise<void>;
}
