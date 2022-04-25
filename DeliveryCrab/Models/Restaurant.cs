﻿namespace DeliveryCrab.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public User Owner { get; set; }

        public List<Product> Products { get; set; }

        public Restaurant(User owner)
        {
            Owner = owner;
        }
    }
}
