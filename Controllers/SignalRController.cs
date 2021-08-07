using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using WebApplicationAngular.DataStorage;
using WebApplicationAngular.Model;

namespace WebApplicationAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignalRController : ControllerBase
    {
        private readonly IHubContext<SignalRHub> _hubContext;

        public SignalRController(IHubContext<SignalRHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public IActionResult Get()
        {
            new SignalRFeature(() => _hubContext.Clients.All.SendAsync("transferData", DataManager.GetData()));

            return Ok(new { Message = "Request Completed" });
        }
    }
}
