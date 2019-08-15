using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using myRegister_angular5.Models;

namespace myRegister_angular5.Controllers
{
  [Route("api/products/")]
  public class ProductController : Controller
  {

    private readonly ProductContext _context;

    public ProductController(ProductContext context)
    {
      _context = context;
    }

    [HttpGet]
    [Authorize("read:product")]
    public IEnumerable<Product> getProducts()
    {

      return _context.Product;
    }

    [HttpGet("{productId}")]
    [Authorize("read:product")]
    public async Task<IActionResult> getProduct([FromRoute] int productId)
    {

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var product = await _context.Product.SingleOrDefaultAsync(m => m.ProductId == productId);

      if (product == null)
      {
        return NotFound();
      }

      return Ok(product);

    }

    [HttpPut("{ProductId}")]
    [Authorize("write:product")]
    public async Task<IActionResult> PutProduct([FromRoute] int productId, [FromBody] Product product)
    {
      
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (productId != product.ProductId)
      {
          return BadRequest();
      }

      _context.Entry(product).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ProductExists(productId))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();

    }

    [HttpPost]
    [Authorize("write:product")]
    public async Task<IActionResult> PostProduct([FromBody] Product product)
    {
      if (!ModelState.IsValid)
      {
          return BadRequest(ModelState);
      }

      _context.Product.Add(product);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetProduct", new {id = product.ProductId }, product);
    }

    [HttpDelete("{ProductId}")]
    [Authorize("write:product")]
    public async Task<IActionResult> DeleteProduct([FromRoute] int productId)
    {
      if (!ModelState.IsValid)
      {
          return BadRequest(ModelState);
      }

      var product = await _context.Product.SingleOrDefaultAsync(m => m.ProductId == productId);
      if (product == null)
      {
        Console.WriteLine(productId);
          return NotFound();
      }

      _context.Product.Remove(product);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool ProductExists(int productId)
    {
      return _context.Product.Any(e => e.ProductId == productId);
    }
  }

}