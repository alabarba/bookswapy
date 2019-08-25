import { ConvectorController } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import { Participant } from './participant.model';
export declare class ParticipantController extends ConvectorController<ChaincodeTx> {
    register(id: string, username: string): Promise<void>;
    changeIdentity(id: string, newIdentity: string): Promise<void>;
    get(id: string): Promise<Participant>;
}
