
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace myRegister_angular5.Models
{
  public class Product
  {
    [Key]
    public int ProductId {get; set;}
    public string Name {get; set;}
    [ForeignKey("ProductType")]
    public int ProductTypeId {get; set;}
    [Column(TypeName="DateTime")]
    public DateTime StartDate {get; set;}
    [Column(TypeName="DateTime")]
    public DateTime EndDate {get; set;}
  }
}