using ArtGallery.Models;
using ArtGallery.Models.DTO;
using ArtGallery.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace ArtGallery.Controllers
{
    [Route("api/art")]
    [ApiController]
    public class ArtController : ControllerBase
    {
        //TO DO: Pulir metodos
        private readonly MongoDBService _mongoDBService;

        public ArtController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }
        // GET: RestaurantController
        [Route("get")]
        [HttpGet]
        public async Task<ActionResult> Get()
        {

            List<Paint> result = await _mongoDBService.GetPaints();
            
            
            return Ok(result);
        }

        [Route("getByName/{name}")]
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> GetPaintsByName(string name)
        {
            try
            {
                List<Paint> result = await _mongoDBService.GetPaintsByName(name);


                
                return Ok(result);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("getByDate")]
        [HttpPost]
        public async Task<ActionResult> GetPaintsByDate([FromBody] PaintByDate paint)
        {
            try
            {
                List<Paint> result = await _mongoDBService.GetPaintsByDate(paint.Date);
                List<PaintDTO> paints = new List<PaintDTO>();

                foreach (var p in result)
                {
                    PaintDTO paintDTO = new PaintDTO();
                    paintDTO.Name = p.Name;
                    paintDTO.Author = p.Author;
                    paintDTO.Date = p.Date;
                    paintDTO.Paints = p.Paints;
                    paints.Add(paintDTO);

                }
                return Ok(paints);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [Route("getByLetter")]
        [HttpPost]
        public async Task<ActionResult> GetPaintsByLetter([FromBody] PaintByLetter paint)
        {
            try
            {
                List<Paint> result = await _mongoDBService.GetPaintsByLetter(paint.Letter);
                List<PaintDTO> paints = new List<PaintDTO>();

                foreach (var p in result)
                {
                    PaintDTO paintDTO = new PaintDTO();
                    paintDTO.Name = p.Name;
                    paintDTO.Author = p.Author;
                    paintDTO.Date = p.Date;
                    paintDTO.Paints = p.Paints;
                    paints.Add(paintDTO);

                }
                return Ok(paints);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("getByAny/{paint}")]
        [HttpPost]
        public async Task<ActionResult> GetPaintsByAny(string paint)
        {
            try
            {

                List<Paint> result = await _mongoDBService.GetPaintsByAny(paint);
                List<PaintDTO> paints = new List<PaintDTO>();

                foreach (var p in result)
                {
                    PaintDTO paintDTO = new PaintDTO();
                    paintDTO.Name = p.Name;
                    paintDTO.Author = p.Author;
                    paintDTO.Date = p.Date;
                    paintDTO.Paints = p.Paints;
                    paints.Add(paintDTO);

                }
                return Ok(paints);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        //POST is non public
        [Authorize(Roles = "Admin")]
        [Route("post")]
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] PaintDTO paint)
        {
            try
            {
                var id = Guid.NewGuid().ToString();
                Paint result = new Paint();
                result.Author = paint.Author;
                result.Name = paint.Name;   
                result.Date = paint.Date;
                result.Paints = paint.Paints;
                Paint resultFinal = _mongoDBService.CreatePaint(result);

                GenericResponse resp = new GenericResponse();
                resp.code = 200;
                resp.message = "Paint created successfully!";
                return StatusCode(resp.code, resp);

            }
            catch
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "Admin")]
        [Route("delete")]
        [HttpPost]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
