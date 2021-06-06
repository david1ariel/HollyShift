using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace CtrlShift
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(setup => setup.AddPolicy("EntireWorld", policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
            services.AddCors(setup => setup.AddPolicy("LocalHostDevelopment", policy => policy.WithOrigins("http://LcoalHost:4200", "http://LcoalHost:3000", "http://LcoalHost:5000").AllowAnyMethod().AllowAnyHeader()));
            services.AddCors(setup => setup.AddPolicy("LocalHostDevelopment", policy => policy.WithOrigins("TomediaSites???").AllowAnyMethod().AllowAnyHeader()));

            services.AddTransient<EmployeesLogic>();
            services.AddTransient<ShiftsLogic>();
            services.AddTransient<SettingsLogic>();
            services.AddTransient<DataHandler>();

            JwtHelper jwtHelper = new JwtHelper(Configuration.GetValue<string>("JWT:Key"));
            services.AddSingleton(jwtHelper);

            services.AddDbContext<TomediaShiftsManagementContext>(options => options.UseSqlServer(Configuration.GetConnectionString("TomediaShiftsManagement")));
            services.AddControllers();

            services.AddAuthentication(options => jwtHelper.setAuthenticationOptions(options)).AddJwtBearer(options => jwtHelper.setBeareOptions(options));


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors("EntireWorld");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
