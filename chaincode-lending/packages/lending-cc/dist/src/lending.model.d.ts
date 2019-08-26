import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class Lending extends ConvectorModel<Lending> {
    readonly type: string;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    genre: string;
    year: string;
    ownerId: string;
    borrowerId: string;
}
