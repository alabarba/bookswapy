import * as yup from 'yup';

import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
  BaseStorage
} from '@worldsibu/convector-core';

import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';

import { Participant } from './participant.model';
import { ClientIdentity } from 'fabric-shim';

@Controller('participant')
export class ParticipantController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async register(
    @Param(yup.string())
    username: string,
    @Param(yup.string())
    name: string,
    @Param(yup.string())
    surname: string,
    @Param(yup.string())
    email: string,
    @Param(yup.string())
    city: string,
    @Param(yup.string())
    region: string,
    @Param(yup.string())
    state: string,
    @Param(yup.string())
    role: string,
    @Param(yup.number())
    defaultEscrow: number  
    ) {
    // Retrieve to see if exists
    const existing = await Participant.getOne(username);

    if (!existing || !existing.username) {
      let participant = new Participant();
      participant.id = username;
      participant.username = username;
      participant.name = name;
      participant.balance=0;
      participant.email = email;
      participant.city = city;
      participant.region = region;
      participant.state = state;
      participant.role = role;
      participant.defaultEscrow = defaultEscrow;
      participant.msp = this.tx.identity.getMSPID();
      // Create a new identity
      participant.identities = [{
        fingerprint: this.sender,
        status: true
      }];
      console.log(JSON.stringify(participant));
      await participant.save();
    } else {
      throw new Error('Identity exists already, please call changeIdentity fn for updates');
    }
  }
  @Invokable()
  public async changeIdentity(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    newIdentity: string
  ) {
    // Check permissions
    let isAdmin = this.tx.identity.getAttributeValue('admin');
    console.log(this.tx.identity);
    console.log(isAdmin);
    let requesterMSP = this.tx.identity.getMSPID();

    // Retrieve to see if exists
    const existing = await Participant.getOne(id);
    console.log('Existing participant:');
    console.log(existing);
    if (!existing || !existing.id) {
      throw new Error('No identity exists with that ID');
    }

    console.log(`existing.msp=${existing.msp} requesterMSP=${requesterMSP}`);
    if (existing.msp != requesterMSP) {
      throw new Error('Unathorized. MSPs do not match');
    }

    console.log(`isAdmin=${isAdmin}`);
    if (!isAdmin) {
      throw new Error('Unathorized. Requester identity is not an admin');
    }

    // Disable previous identities!
    existing.identities = existing.identities.map(identity => {
      identity.status = false;
      return identity;
    });

    // Set the enrolling identity 
    existing.identities.push({
      fingerprint: newIdentity,
      status: true
    });
    await existing.save();
  }

  @Invokable()
  public async updateBalance(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    operation: string,
    @Param(yup.number())
    amount: number
  ) {
    // Check permissions
    let isAdmin = this.tx.identity.getAttributeValue('admin');
    console.log(this.tx.identity);
    console.log(isAdmin);
    let requesterMSP = this.tx.identity.getMSPID();

    // Retrieve to see if exists
    const existing = await Participant.getOne(id);
    console.log('Existing participant:');
    console.log(existing);
    if (!existing || !existing.id) {
      throw new Error('No identity exists with that ID');
    }

    console.log(`existing.msp=${existing.msp} requesterMSP=${requesterMSP}`);
    if (existing.msp != requesterMSP) {
      throw new Error('Unathorized. MSPs do not match');
    }

    console.log(`isAdmin=${isAdmin}`);
    if (!isAdmin) {
      throw new Error('Unathorized. Requester identity is not an admin');
    }

   if (operation=="add"){
     existing.balance=existing.balance + amount;
     existing.save();
   }
   if (operation=="pay"){
      if (existing.balance < amount){
        throw new Error('Unathorized. User has not enough funds to perform this operation');
      }
      else {existing.balance=existing.balance - amount;
      }
    existing.save();
  } 
  }


  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Participant.getOne(id);
    if (!existing || !existing.id) {
      throw new Error(`No identity exists with that ID ${id}`);
    }
    return existing;
  }
}
