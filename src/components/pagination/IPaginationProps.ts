export interface IProps {
    items: any[],
    onChangePage: (pageOfItems: any[]) => void,
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