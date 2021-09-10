using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ProductShop.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstProjectReact.Controllers
{
    public class ProductController : Controller
    {
        public EFAppContext _context { get; set; }
        public ProductController(EFAppContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> GetAll()
        {
            return await Task.Run(() => {

            var coll = _context.products.Include(x => x.Images).Select(x => new {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                Images = x.Images.Select(y => y.Name).ToList()
            }).ToList();

                return Ok(JsonConvert
                    .SerializeObject(coll));
            });
        }
    }
}
