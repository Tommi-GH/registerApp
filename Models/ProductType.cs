using System.ComponentModel.DataAnnotations;

public class ProductType
{
  [Key]
  public int ProductTypeId {get; set;}
  public string Name {get; set;}

}