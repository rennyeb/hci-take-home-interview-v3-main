namespace PatientAdministrationSystem.Application.Services;

/// <summary>
/// Base class for all responses for entities.
/// </summary>
/// <typeparam name="TKey">The type of the key to the entity</typeparam>
public abstract class EntityResponse<TKey> where TKey : struct
{
	/// <summary>
	/// The unique identifier of the entity.
	/// </summary>
	public TKey Id { get; set; }

	/// <summary>
	/// The date/time that the entity was created.
	/// </summary>
	public DateTime CreatedTime { get; set; }

	/// <summary>
	/// The date/time that the entity was last updated.
	/// </summary>
	public DateTime UpdatedTime { get; set; }
}


