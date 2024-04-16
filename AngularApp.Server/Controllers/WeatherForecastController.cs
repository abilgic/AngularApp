using AngularApp.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        ApplicationDbContext _context;
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> Get(int id)
        {
            var result = _context.Set<Job>().FirstOrDefault(p => p.Id == id);

            return result;
        }
        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<Job> Get()
        {
            return _context.Set<Job>().ToArray();
        }

        [HttpPut]
        public bool Put([FromBody] JobModel model)
        {
            Job job = new Job
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description
            };

            _context.Update(job);
            return _context.SaveChanges() > 0;
        }

        [HttpPost]
        public bool Post([FromBody] JobModel model)
        {
            Job job = new Job
            {
                Title = model.Title,
                Description = model.Description
            };

            _context.Add(job);
            return _context.SaveChanges() > 0;

        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var item = _context.Set<Job>().FirstOrDefault(p => p.Id == id);
            var result = _context.Remove(item);
            return _context.SaveChanges() > 0;
        }

        public class JobModel
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }

        }
    }
}
