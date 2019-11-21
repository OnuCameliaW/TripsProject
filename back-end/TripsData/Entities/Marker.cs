using System;
namespace TripsController.Data
{
    public class Marker
    {
        public float Longitude { get; set; }

        public float Latitude { get; set; }

        public string Name { get; set; }

        public Guid Id { get; set; }
    }
}
