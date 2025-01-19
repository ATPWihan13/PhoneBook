using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhoneBook.Server.Models;

namespace PhoneBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly PhoneBookContext _context;

        public ContactsController(PhoneBookContext context)
        {
            _context = context;
        }

        // GET: api/Contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            return await _context.Contacts.ToListAsync();
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        // GET: api/Contacts/Search
        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Contact>>> SearchContacts(string? name, string? phoneNumber)
        {
            // Query the Contacts table
            var query = _context.Contacts.AsQueryable();

            // Filter by name if provided
            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(c => EF.Functions.Like(c.Name, $"%{name}%"));
            }

            // Filter by phone number if provided
            if (!string.IsNullOrWhiteSpace(phoneNumber))
            {
                query = query.Where(c => EF.Functions.Like(c.PhoneNumber, $"%{phoneNumber}%"));
            }

            // Execute the query and get the results
            var results = await query.ToListAsync();

            // Return Ok with the results (even if empty)
            return Ok(results);
        }

        // PUT: api/Contacts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, Contact contact)
        {
            if (id != contact.ContactId)
            {
                return BadRequest();
            }

            // Set EmailAddress to null if not provided
            if (string.IsNullOrWhiteSpace(contact.EmailAddress))
            {
                contact.EmailAddress = null; // Allow email to be optional
            }

            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
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

        // POST: api/Contacts
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            // Set EmailAddress to null if not provided
            if (string.IsNullOrWhiteSpace(contact.EmailAddress))
            {
                contact.EmailAddress = null; // Allow email to be optional
            }

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContact", new { id = contact.ContactId }, contact);
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.ContactId == id);
        }
    }
}
