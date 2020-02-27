export interface IProps {
    totalItems: number,
    onChangePage: (pageNumber: number) => void,
    initialPage: number,
    pageSize: number,
    maxPages: number,
    labels: ILabels
}

export interface ILabels {
    first: string,
    last: string,
    previous: string,
    next: string
}