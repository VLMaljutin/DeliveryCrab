﻿using Microsoft.AspNetCore.Mvc;
using DeliveryCrab.Models;
namespace DeliveryCrab.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly ApplicationContext _context;

        public UserController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _context.Users.ToList();
        }
        [HttpGet]
        [Route("{id}")]
        public User Get(int id)
        {
            User? user = _context.Users.FirstOrDefault(x => x.Id == id);
            return user;
        }

        [HttpPost]
        [Route("PostUser")]
        public IActionResult Post(User user)
        {
            if (ModelState.IsValid)
            {
                if (_context.Users.Any(x => x.Login == user.Login))
                {
                    return BadRequest(user);
                }
                else
                {
                    _context.Users.Add(user);
                    _context.SaveChanges();
                    return Ok(user);
                }
            }
            return BadRequest(ModelState);
        }

        [HttpDelete]
        [Route("DeleteUser")]
        public IActionResult Delete(int id)
        {
            if (ModelState.IsValid)
            {
                User user = _context.Users.First(x => x.Id == id);
                if (user != null)
                {
                    _context.Users.Remove(user);
                    _context.SaveChanges();
                    return Ok(id);
                }
                return BadRequest(); // Честно хз, что отправлять, если пытаться удалить юзера, id которого нет, так что пока так
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        [Route("PutUser")]
        public IActionResult Put(User user)
        {
            if (ModelState.IsValid)
            {
                User old_user = _context.Users.First(x => x.Login == user.Login);
                old_user.Firstname = user.Firstname;
                old_user.Lastname = user.Lastname;
                old_user.Age = user.Age;
                old_user.Email = user.Email;
                old_user.Password = user.Password;

                _context.SaveChanges();
                return Ok(user);
            }
            return BadRequest(ModelState);
        }
    }
}
