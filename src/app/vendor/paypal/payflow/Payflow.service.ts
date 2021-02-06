import { Injectable } from "@nestjs/common";
import { TransactionType } from "src/app/api/billing/transaction/Transaction.interface";
import Transaction from "src/app/api/billing/transaction/Transaction.model";
import {
  PayflowCorePayment,
  PayflowCredientals,
  PayflowTransactionType
} from "./Payflow.interface";

@Injectable()
export class PayflowService {
  k;
  private credientals: PayflowCredientals | null;
  constructor() {
    this.init();
    this.credientals = null;
  }
  private async init() {
    this.credientals = await this.config.get<PayflowCredientals>(
      "paypal/payflow"
    );
  }
  public validateCredientals() {
    if (!this.credientals) throw new Error("Invalid Credientals");
  }
  public async pay(payment: PayflowCorePayment) {
    await this.verify(payment);
  }
  public async verify(payment: PayflowCorePayment) {}
  private getTransactionType(transaction: Transaction) {
    switch (transaction.data().type as TransactionType) {
      case "sale":
        return PayflowTransactionType.SALE;
      case "rebate":
        return PayflowTransactionType.REFUND;
      case "refund":
        return PayflowTransactionType.REFUND;
      default:
        throw new Error("Invalid transaction type.");
    }
  }
  private getTransactionData(
    transaction: Transaction
  ): Omit<PayflowCorePayment, "ACCT" | "TENDER" | "EXPDATE"> {
    return {
      TRXTYPE: this.getTransactionType(transaction),
      AMT: transaction.data().amountPayed
    };
  }
  private formatExpDate(month: number, year: number): number {
    return Number(month + "" + year);
  }
}

export default PayflowService;
