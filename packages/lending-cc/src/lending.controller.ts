import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Lending } from './lending.model';
import { Participant } from 'participant-cc';

var bookStatusEnum = {
  AVAILABLE:"available",
  LENT: "lent",
  DISPUTE: "dispute",
  REQUESTED: "requested",
  DELETED: "deleted",
  WAITING_RESTITUTION_CONFIRMATION: "waiting restitution confirmation",
};
Object.freeze(bookStatusEnum)

@Controller('lending')
export class LendingController extends ConvectorController {

  @Invokable()
  public async createBook(
    @Param(yup.string())
    ownerId: string,
    @Param(yup.string())
    isbn: string,
    @Param(yup.string())
    title: string,
    @Param(yup.string())
    author: string,
    @Param(yup.string())
    publisher: string,
    @Param(yup.string())
    genre: string,
    @Param(yup.string())
    year: string,
  ) {
    let book = new Lending(isbn);
    book.id = isbn;
    book.status = bookStatusEnum.AVAILABLE;
    book.isbn=isbn;
    book.title = title;
    book.author = author;
    book.publisher = publisher;
    book.genre=genre;
    book.year = year;
    book.ownerId = ownerId;
    book.borrowerId=null;
    await book.save();
  }

  @Invokable()
  public async updateBook(
    @Param(yup.string())
    isbn: string,
    @Param(yup.string())
    title: string,
    @Param(yup.string())
    author: string,
    @Param(yup.string())
    publisher: string,
    @Param(yup.string())
    genre: string,
    @Param(yup.string())
    year: string,
  ) {
    let book = await Lending.getOne(isbn);
    console.log('Book:');
    console.log(book);
    if (!book || !book.isbn) {
      throw new Error(`Book with isbn ${isbn} does not exist`);
    }
    const owner = await Participant.getOne(book.ownerId);
    console.log('Owner:');
    console.log(owner);

    if (!owner || !owner.id || !owner.identities) {
      throw new Error('Referenced owner participant does not exist in the ledger');
    }

    if (book.status != bookStatusEnum.AVAILABLE){
      throw new Error(`The status of the book is ${book.status} so the book cannot be updated`); 
    }

    const ownerCurrentIdentity = owner.identities.filter(identity => identity.status === true)[0];
    if (ownerCurrentIdentity.fingerprint === this.sender) {
      console.log('Identity can update book');
      book.isbn=isbn;
      book.status = bookStatusEnum.LENT;
      book.title = title;
      book.author=author;
      book.publisher = publisher;
      book.genre=genre;
      book.year = year;
      await book.save();
    } else {
      throw new Error(`Identity ${this.sender} is not allowed to update book just ${owner.username} ${ownerCurrentIdentity.fingerprint} can`);
    }
  }

  @Invokable()
  public async deleteBook(
    @Param(yup.string())
    isbn: string,
  ) {
    let book = await Lending.getOne(isbn);
    console.log('Book:');
    console.log(book);
    if (!book || !book.isbn) {
      throw new Error(`Book with isbn ${isbn} does not exist`);
    }
    const owner = await Participant.getOne(book.ownerId);
    console.log('Owner:');
    console.log(owner);

    if (!owner || !owner.id || !owner.identities) {
      throw new Error('Referenced owner participant does not exist in the ledger');
    }

    if (book.status != bookStatusEnum.AVAILABLE){
      throw new Error(`The status of the book is ${book.status} so the book cannot be deleted`); 
    }

    const ownerCurrentIdentity = owner.identities.filter(identity => identity.status === true)[0];
    if (ownerCurrentIdentity.fingerprint === this.sender) {
      console.log('Identity can delete book');
      book.status = bookStatusEnum.DELETED;
      console.log('Book deleted');
    } else {
      throw new Error(`Identity ${this.sender} is not allowed to delete book just ${owner.username} ${ownerCurrentIdentity.fingerprint} can`);
    }
  }


  @Invokable()
  public async lendBook(
    @Param(yup.string())
    isbn: string,
    @Param(yup.string())
    borrowerId: string,
  ){
    let book = await Lending.getOne(isbn);
    
    if (!book || !book.isbn) {
      throw new Error(`Book with id ${isbn} does not exist`);
    }

    //book.ownerId should be equal to the username of the owner
    const owner = await Participant.getOne(book.ownerId);

    if (!owner || !owner.id || !owner.identities) {
      throw new Error('Referenced owner participant does not exist in the ledger');
    }
    
    if (book.status != bookStatusEnum.AVAILABLE){
      throw new Error(`The status of the book is ${book.status} so the book cannot be lent`); 
    }

    const ownerCurrentIdentity = owner.identities.filter(identity => identity.status === true)[0];
    if (ownerCurrentIdentity.fingerprint === this.sender) {
      book.borrowerId = borrowerId;
      book.status = bookStatusEnum.LENT;
      await book.save();
    } else {
      throw new Error(`Identity ${this.sender} is not allowed to transfer book just ${owner.username} ${ownerCurrentIdentity.fingerprint} can`);
    }
  }

  @Invokable()
  public async returnBook(
    @Param(yup.string())
    isbn: string,
  ){
    let book = await Lending.getOne(isbn);
    
    if (!book || !book.isbn) {
      throw new Error(`Book with id ${isbn} does not exist`);
    }

    //book.ownerId should be equal to the username of the owner
    const owner = await Participant.getOne(book.ownerId);

    if (!owner || !owner.id || !owner.identities) {
      throw new Error('Referenced owner participant does not exist in the ledger');
    }

    const borrower = await Participant.getOne(book.borrowerId);

    if (!borrower || !borrower.id || !borrower.identities) {
      throw new Error('Referenced borrower participant does not exist in the ledger');
    }

    const borrowerCurrentIdentity = borrower.identities.filter(identity => identity.status === true)[0];
    if (borrowerCurrentIdentity.fingerprint === this.sender) {
      book.borrowerId = null;
      book.status = bookStatusEnum.AVAILABLE;
      await book.save();
    } else {
      throw new Error(`Identity ${this.sender} is not allowed to return the book just ${borrower.username} ${borrowerCurrentIdentity.fingerprint} can`);
    }
  }


  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    return await Lending.getOne(id);
  }
}
