﻿using System.ComponentModel.DataAnnotations.Schema;

namespace DeliveryCrab.Models
{
    
    public class Order
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }

        public string Addres { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set; }

        [ForeignKey("ProductId")]
        public int ProductId { get; set; }

        public int Count { get; set; }

    }
}