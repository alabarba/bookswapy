import * as yup from 'yup';
import {
  ConvectorModel,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core';


export class x509Identities extends ConvectorModel<x509Identities>{
  @ReadOnly()
  public readonly type = 'io.worldsibu.examples.x509identity';

  @Validate(yup.boolean())
  @Required()
  status: boolean;
  @Validate(yup.string())
  @Required()
  fingerprint: string;
}

export class Participant extends ConvectorModel<Participant> {
  @ReadOnly()
  public readonly type = 'io.worldsibu.examples.participant';

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public username: string;

  @ReadOnly()
  @Validate(yup.string())
  public msp: string;

  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;

  
  @Validate(yup.string())
  public name: string;

  @Validate(yup.string())
  public surname: string;

  @Validate(yup.number())
  public balance: number;

  @Validate(yup.string())
  public email: string;

  @Validate(yup.string())
  public city: string;

  @Validate(yup.string())
  public region: string;

  @Validate(yup.string())
  public state: string;
  
  @Validate(yup.string())
  public role: string;
  
  @Validate(yup.number())
  public defaultEscrow: number;
}