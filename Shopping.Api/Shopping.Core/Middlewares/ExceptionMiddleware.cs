using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net;


namespace Shopping.Core.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILoggerFactory _loggerFactory;

        public ExceptionMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
        {
            _next = next;
            _loggerFactory = loggerFactory;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                if (string.IsNullOrEmpty(context.TraceIdentifier))
                {
                    context.TraceIdentifier = Guid.NewGuid().ToString();
                }

                var logger = _loggerFactory.CreateLogger<ExceptionMiddleware>();
                logger.LogCritical(ex.Message, new[] {ex});

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";
            }
        }
    }
}
