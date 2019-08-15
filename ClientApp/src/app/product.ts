export class Product
{
  constructor (
  public productId : number,
  public name : string,
  public productTypeId : number,
  public startDate : Date,
  public endDate : Date,
  ) {}
}