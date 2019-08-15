
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace myRegister_angular5.Models
{
  public class ProductContext : DbContext
  {
    public ProductContext(DbContextOptions<ProductContext> options)
    : base(options)
    { }

    public DbSet<Product> Product { get; set;}
    public DbSet<ProductType> ProductType { get; set;}
  }
}