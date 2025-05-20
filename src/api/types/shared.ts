/* Common types used in the API */

export type Images = {
    micro: string
    small: string
    medium: string
    large: string
    image_path: string
    image_path_url: string
}

export type ResponsePaging = {
    count: number
    total: number
    prev_url: string
    next_url: string
    page: number
    pages: number
    paging_links: ResponsePagingLink[]
}

export type ResponsePagingLink = {
    url: string
    title: string
    is_link: true
    is_current: boolean
}
