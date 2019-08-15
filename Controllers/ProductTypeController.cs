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
  [Route("api/productTypes/")]
  [Authorize("read:product")]
  public class ProductTypeController : Controller
  {

    private readonly ProductContext _context;

    public ProductTypeController(ProductContext context)
    {
      _context = context;
    }

    [HttpGet]
    public IEnumerable<ProductType> getProductTypes()
    {

      return _context.ProductType;
    }

    [HttpGet("{ProductTypeId}")]
    [Authorize("read:product")]
    public async Task<IActionResult> getProductType([FromRoute] int productTypeId)
    {

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var productType = await _context.ProductType.SingleOrDefaultAsync(m => m.ProductTypeId == productTypeId);

      if (productType == null)
      {
        return NotFound();
      }

      return Ok(productType);

    }
    

    [HttpPut("{ProductTypeId}")]
    [Authorize("write:product")]
    public async Task<IActionResult> PutProductType([FromRoute] int productTypeId, [FromBody] ProductType productType)
    {
      
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (productTypeId != productType.ProductTypeId)
      {
          return BadRequest();
      }

      _context.Entry(productType).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ProductTypeExists(productTypeId))
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
    public async Task<IActionResult> PostProductType([FromBody] ProductType productType)
    {
      if (!ModelState.IsValid)
      {
          return BadRequest(ModelState);
      }

      _context.ProductType.Add(productType);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetProductType", new {id = productType.ProductTypeId }, productType);
    }

    [HttpDelete("{ProductTypeId}")]
    [Authorize("write:product")]
    public async Task<IActionResult> DeleteProductType([FromRoute] int productTypeId)
    {
      if (!ModelState.IsValid)
      {
          return BadRequest(ModelState);
      }

      var productType = await _context.ProductType.SingleOrDefaultAsync(m => m.ProductTypeId == productTypeId);
      if (productType == null)
      {
          return NotFound();
      }

      _context.ProductType.Remove(productType);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool ProductTypeExists(int productTypeId)
    {
      return _context.ProductType.Any(e => e.ProductTypeId == productTypeId);
    }
  }

}