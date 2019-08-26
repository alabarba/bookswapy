import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Lending extends ConvectorModel<Lending> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.lending';

  // Book (asset) definition 
  @Required()
  @Validate(yup.string())
  public isbn: string;
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
