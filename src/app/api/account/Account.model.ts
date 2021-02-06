import AddressSchema from "src/app/common/model/schema/Address.schema";
import { arrayProp, prop } from "@typegoose/typegoose";
import { AccountDOT } from "./Account.interface";
import ModelFactory from "src/app/common/model/Model.factory";

export class AccountSchema
  implements AccountDOT {
  @arrayProp({ required: true, default: [] })
  public alertIDs: string[];
  @arrayProp({ required: true, default: [] })
  public fingerprints: string[];
  @prop({ required: true, default: true })
  public active: boolean;
  @prop({ required: true })
  public firstName: string;
  @prop({ required: true })
  public lastName: string;
  @prop({ required: true })
  public emailAddress: string;
  @prop({ required: true })
  public address: AddressSchema;
  @prop({ required: true })
  public phone: string;
  @prop({required: true, default: null})
  public paymentsID: string;
  @prop({required: true, default: new Date(1/1/1970)})
  public lastOrderDate: Date;
  @arrayProp({required: true, default: []})
  public subscriptionIDs: string[];
  @arrayProp({required: true, default: []})
  public pReviewIDs: string[]

}

export class Account extends ModelFactory(AccountSchema) {}

export default Account;
