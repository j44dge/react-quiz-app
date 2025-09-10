using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.DBModels;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriesController(AppDbContext context)
    {
        _context = context;
    }

    // ✅ CREATE: POST api/categories
    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] Category category)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetCategoryById),
            new { id = category.Id },
            category
        );
    }

    // ✅ READ ALL: GET api/categories
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        return await _context.Categories.ToListAsync();
    }

    // ✅ READ ONE: GET api/categories/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategoryById(int id)
    {
        var category = await _context.Categories.FindAsync(id);

        if (category == null)
            return NotFound();

        return Ok(category);
    }

    // ✅ UPDATE: PUT api/categories/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] Category category)
    {
        if (id != category.Id)
            return BadRequest("ID mismatch.");

        if (!await _context.Categories.AnyAsync(c => c.Id == id))
            return NotFound();

        _context.Entry(category).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // ✅ DELETE: DELETE api/categories/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);

        if (category == null)
            return NotFound();

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
