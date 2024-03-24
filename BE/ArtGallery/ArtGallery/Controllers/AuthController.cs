using Amazon.Runtime.Internal;
using ArtGallery.Models;
using ArtGallery.Models.DTO;
using ArtGallery.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ArtGallery.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly string secretKey;
        private readonly MongoDBService _mongoDBService;

        public AuthController(IConfiguration config, MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
            secretKey = config.GetSection("jwtSettings").GetSection("secretKey").ToString();
        }

        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> SignUp([FromBody] LoginDTO payload)
        {
            try{

                string username = payload.Username;

                string password = payload.Password;

                string role = "User";

                string finalHash = BCrypt.Net.BCrypt.HashPassword(password);

                if (string.IsNullOrEmpty(finalHash))
                {
                    GenericResponse response = new GenericResponse();
                    response.code = 400;
                    response.message = "Password can not be empty";
                    return StatusCode(response.code, response.message);
                }

                Login user = new Login();
                user.Username = username;
                user.Password = finalHash;
                user.Role = role;

                var result1 = _mongoDBService.CreateUser(user);

                GenericResponse resp = new GenericResponse();
                resp.code = 200;
                resp.message = "User created successfully";
                return StatusCode(resp.code, resp.message);

            }
            catch (Exception ex) 
            {
                GenericResponse resp = new GenericResponse();
                resp.code = 400;
                resp.message = "A problem has occured";
                return StatusCode(resp.code, resp.message);
            }

        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO user)
        {
            string username = user.Username;

            string password = user.Password;

            Login result = await _mongoDBService.getUserAsync(username);

            string role = result.Role;

            string finalHash = BCrypt.Net.BCrypt.HashPassword(password);

            if (string.IsNullOrEmpty(finalHash))
            {
                return BadRequest();
            }

            

            if (BCrypt.Net.BCrypt.Verify(password, result.Password))
            {

                //envio el token para acceder a funciones
                var keyBytes = Encoding.ASCII.GetBytes(secretKey);

                var claims = new ClaimsIdentity();

                List<Claim> claimsUser = new List<Claim>();
                claimsUser.Add(new Claim(ClaimTypes.NameIdentifier, username));
                claimsUser.Add(new Claim(ClaimTypes.Role, role));   

                foreach(var claim in claimsUser)
                {
                    claims.AddClaim(claim);
                }
                

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    Expires = DateTime.UtcNow.AddHours(2),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();

                var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);

                string tokencreado = tokenHandler.WriteToken(tokenConfig);


                return StatusCode(StatusCodes.Status200OK, new { token = tokencreado });

            }
            else
            {
                return Unauthorized();
            }

        }



    
    }
}
