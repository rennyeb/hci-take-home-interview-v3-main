using System.ComponentModel.DataAnnotations.Schema;

namespace PatientAdministrationSystem.Application.Services;

//TODO describe
public abstract class EntityResponse<TKey> where TKey : struct
{
	public TKey Id { get; set; }

	public DateTime CreatedTime { get; set; }

	public DateTime UpdatedTime { get; set; }
}


