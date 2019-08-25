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
    book.isbn=isbn;
    book.name = title;
    book.isbn=author;
    book.name = publisher;
    book.isbn=genre;
    book.name = year;
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
      book.name = title;
      book.isbn=author;
      book.name = publisher;
      book.isbn=genre;
      book.name = year;
      await book.save();
    } else {
      throw new Error(`Identity ${this.sender} is not allowed to update book just ${owner.name} ${ownerCurrentIdentity.fingerprint} can`);
    }
  }

  @Invokable()
  public async transfer(
    @Param(yup.string())
    isbn: string,
    @Param(yup.string())
    borrowerId: string,
  ){
    let book = await Lending.getOne(isbn);
    
    if (!book || book.isbn) {
      throw new Error(`Book with id ${isbn} does not exist`);
    }
    const owner = await Participant.getOne(book.ownerId);

    if (!owner || !owner.id || !owner.identities) {
      throw new Error('Referenced owner participant does not exist in the ledger');
    }

    const ownerCurrentIdentity = owner.identities.filter(identity => identity.status === true)[0];
    if (ownerCurrentIdentity.fingerprint === this.sender) {
      book.borrowerId = borrowerId;
      await book.save();
    } else {
      throw new Error(`Identity ${this.sender} is not allowed to update book just ${owner.name} ${ownerCurrentIdentity.fingerprint} can`);
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