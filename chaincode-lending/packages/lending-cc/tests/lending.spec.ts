// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Lending, LendingController } from '../src';

describe('Lending', () => {
  let adapter: MockControllerAdapter;
  let lendingCtrl: ConvectorControllerClient<LendingController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    lendingCtrl = ClientFactory(LendingController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'LendingController',
        name: join(__dirname, '..')
      }
    ]);
  });
  
  it('should create a default model', async () => {
    const modelSample = new Lending({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await lendingCtrl.create(modelSample);
  
    const justSavedModel = await adapter.getById<Lending>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});