//����� ��������� �� ����� ��������� � ������� ���������� ������� ������� 
//��� ��������
//Add-migration initial
//Update-database
// ��������� ������
using Microsoft.EntityFrameworkCore;
using DeliveryCrab.Models;

var builder = WebApplication.CreateBuilder();
ConfigurationManager configuration = builder.Configuration;

// ��������� �������� ApplicationContext � �������� ������� � ����������
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<UserContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    
}
app.UseStaticFiles();
app.UseRouting();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
app.Run();



