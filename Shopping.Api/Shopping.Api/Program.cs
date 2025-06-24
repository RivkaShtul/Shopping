using Shopping.Data;
using Shopping.Domain.Configuration;
using Shopping.Domain.Mappers;
using Shopping.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.RegisterData();
builder.RegisterServices();

builder.Services.AddAutoMapper(typeof(CategoriesMapperProfile));

// Add custom services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(p => p.AddPolicy("corsapp", policyBuilder =>
{
    var corsConfiguration = builder.Configuration.GetSection("Cors").Get<CorsConfiguration>();
    policyBuilder.WithOrigins(corsConfiguration.AllowedOrigins)
                 .WithMethods(corsConfiguration.AllowedMethods)
                 .WithHeaders(corsConfiguration.AllowedHeaders)
                 .AllowCredentials();
}));

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("corsapp");
app.UseRouting();
app.MapControllers();

app.Run();

