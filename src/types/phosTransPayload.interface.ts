export interface IPhosTransactionPayload {
  terminalIdentifier: string; // "16P12022",
  merchantIdentifier: string; // "1602011247",
  userIdentifier: string; // a@a.a,
  transaction: {
    transactionType: string; // "sale",
    transactionId: string; //"123",
    approvedAmount: number; //"1.23",
    approvalNumber: number; // "078206",
    approvalTime: string; //"2021-11-30 09:27:55",
    responseCode: string; // "00",
    batchNumber: number; // 0,
    transactionNumber: string; // 'fd1cdab34e813acfeca0a86924b2dc6f'
    cardNumber: string; // '516895XXXXXX5807';
    cardType: string; // 'Visa';
    status: '1' | '0' | '-1'; // successful | pending | declined
    metadata: {
      minutes?: number; //236;
      uid?: string; // 'user_1234';
    };
  };
}
