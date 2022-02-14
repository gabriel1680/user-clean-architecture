export interface ExistsRepository<T> {
	exists(param: string|number): Promise<boolean>;
}

export interface ExistsByIdRepository {
	existsById(id: string): Promise<boolean>;
}

export interface CreateRepository<T> extends ExistsRepository<T> {
	persist(model: T): Promise<void>;
}

export interface FindByIdRepository<T> {
	findById(id: string|number): Promise<T>;
}

export interface ListRepository<T> {
	list(): Promise<T[]>;
}

export interface DeleteRepository<T> extends FindByIdRepository<T>
{
	doDelete(model: T): Promise<void>;
}

export interface UpdateRepository<T> extends FindByIdRepository<T> {
	doUpdate(model: T): Promise<void>;
}

export interface DefaultRepository<T> extends
		ExistsRepository<T>,
		CreateRepository<T>,
		FindByIdRepository<T>,
		ListRepository<T>,
		UpdateRepository<T>,
		DeleteRepository<T>
{}