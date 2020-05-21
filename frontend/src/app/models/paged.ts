export interface PaginateResult<T> {
    docs: T[];
    readonly totalDocs: number;
    readonly limit: number;
    readonly page?: number;
    readonly totalPages: number;
    readonly nextPage?: number | boolean | T[] | undefined; //TODO: Revisar error paginate
    readonly prevPage?: number | boolean | T[] | undefined; //TODO: Revisar error paginate
    readonly pagingCounter: number;
    readonly hasPrevPage: boolean;
    readonly hasNextPage: boolean;
    readonly meta?: any;
    readonly [customLabel: string]: T[] | number | boolean | undefined | object; //* Added object
}