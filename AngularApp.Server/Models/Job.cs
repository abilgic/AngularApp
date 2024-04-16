using System.ComponentModel.DataAnnotations;

namespace AngularApp.Server.Models
{
    public class Job
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }

}
