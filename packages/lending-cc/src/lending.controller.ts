import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Lending } from './lending.model';
import { Participant } from 'participant-cc';

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
  public async update(
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

    const ownerCurrentIdentity = owner.identities.filter(identity => identity.status === true)[0];
    if (ownerCurrentIdentity.fingerprint === this.sender) {
      console.log('Identity can update book');
      book.isbn=isbn;
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
  public async transferBook(
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

    const ownerCurrentIdentity = owner.identities.filter(identity => identity.status === true)[0];
    if (ownerCurrentIdentity.fingerprint === this.sender) {
      book.borrowerId = borrowerId;
      await book.save();
    } else {
      throw new Error(`Identity ${this.sender} is not allowed to update book just ${owner.username} ${ownerCurrentIdentity.fingerprint} can`);
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

    if (!borrower || !owner.borrowerId || !borrower.identities) {
      throw new Error('Referenced owner participant does not exist in the ledger');
    }

    const borrowerCurrentIdentity = borrower.identities.filter(identity => identity.status === true)[0];
    if (borrowerCurrentIdentity.fingerprint === this.sender) {
      book.borrowerId = null;
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
