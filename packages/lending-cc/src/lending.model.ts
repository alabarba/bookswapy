import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Book extends ConvectorModel<Book> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.lending';

  // Book (asset) definition 
  @Required()
  @Validate(yup.string())
  public isbn: string;
  @Validate(yup.string())
  public status: string;
  @Validate(yup.string())
  public title: string;
  @Validate(yup.string())
  public author: string;
  @Validate(yup.string())
  public publisher: string;
  @Validate(yup.string())
  public genre: string;
  @Validate(yup.string())
  public year: string;
  @Validate(yup.string())
  public ownerId: string;
  @Validate(yup.string().nullable())
  public borrowerId: string;
}
  
  export class Transaction extends ConvectorModel<Transaction> {
    @ReadOnly()
    @Required()
    public readonly type = 'io.worldsibu.lending';
  
    // Book (asset) definition 
    @Required()
    @Validate(yup.string())
    public id: string;
    @Validate(yup.number())
    public escrow: number;
    @Validate(yup.string())
    public arbitrator: string;
    @Validate(yup.date())
    public date: Date;
    @Validate(yup.string())
    public isbn: string;
    @Validate(yup.date())
    public deadline: Date;

}
