using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Interfaces;
using System.Linq.Expressions;

namespace PatientAdministrationSystem.Application.Services;

public class HospitalResponse
{
    public string GUID { get; set; }
    public string Name { get; set; }
}

