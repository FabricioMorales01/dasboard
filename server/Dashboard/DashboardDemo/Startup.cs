using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using DevExpress.DashboardAspNetCore;
using DevExpress.DashboardWeb;
using DevExpress.AspNetCore;
using Microsoft.Extensions.FileProviders;

namespace DashboardDemo
{
  public class Startup
  {
      public Startup(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
      {
        Configuration = configuration;
        FileProvider = hostingEnvironment.ContentRootFileProvider;
      }

      public IConfiguration Configuration { get; }
      public IFileProvider FileProvider { get; }

      public void ConfigureServices(IServiceCollection services)
      {
      // Add a DashboardController class descendant with a specified dashboard storage
      // and a connection string provider.
      services.AddCors(options =>
                   options.AddPolicy("MyPolicy", builder =>
                   {
                     builder.AllowAnyOrigin()
                              .AllowAnyMethod()
                              .AllowCredentials()
                              .AllowAnyHeader();
                   }));

      services
            .AddMvc()
            .AddDefaultDashboardController(configurator => {
              configurator.SetDashboardStorage(new DashboardFileStorage(FileProvider.GetFileInfo("App_Data/Dashboards").PhysicalPath));
              configurator.SetConnectionStringsProvider(new DashboardConnectionStringsProvider(Configuration));
            });
        // 
        services.AddDevExpressControls();
      }

      public void Configure(IApplicationBuilder app, IHostingEnvironment env)
      {
        if (env.IsDevelopment())
        {
          app.UseDeveloperExceptionPage();
        }
        else
        {
          app.UseExceptionHandler("/Home/Error");
        }
      app.UseCors("MyPolicy");
      app.UseStaticFiles();
        // Register the DevExpress middleware.
        app.UseDevExpressControls();
        app.UseMvc(routes => {
          // Map dashboard routes.
          routes.MapDashboardRoute("api/dashboard");
          routes.MapRoute(
              name: "default",
              template: "{controller=Home}/{action=Index}/{id?}");
        });
      }
    }

}
