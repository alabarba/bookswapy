import { ConvectorController } from '@worldsibu/convector-core-controller';
import { Lending } from './lending.model';
export declare class LendingController extends ConvectorController {
    createBook(ownerId: string, isbn: string, title: string, author: string, publisher: string, genre: string, year: string): Promise<void>;
    update(isbn: string, title: string, author: string, publisher: string, genre: string, year: string): Promise<void>;
    transfer(isbn: string, borrowerId: string): Promise<void>;
    get(id: string): Promise<Lending>;
}
