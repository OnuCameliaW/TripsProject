using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Trips.Data;
using Trips.Data.Interfaces;
using Trips.Data.Repositories;
using Trips.Domain.Interfaces;
using Trips.Domain.Services;

namespace Trips.Api
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });

            services.AddControllers();
            ConfigureDbServices(services);

            services.AddScoped<IMarkerService, MarkerService>();
            services.AddScoped<IMarkerRepository, MarkerRepository>();
        }

        private void ConfigureDbServices(IServiceCollection services)
        {
            services.AddDbContext<TripsDbContext>(op => op.UseNpgsql(Configuration.GetConnectionString("MyWebApiConection")));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();



            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI(v1)");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
