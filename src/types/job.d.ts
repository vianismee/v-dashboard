

export type IJob = {
    job_id: number
    user: string
    status: "Brief" | "Artwork" | "Approval 1" | "Trial" | "Aproval Customer" | "Revisi" 
    brand: IBrnad []
}

export type IBrnad = {
    brand_id: number
    name: string
    type: string
    product: IProduct []
}

export type IProduct = {
    product_id: number
    name: string
    size: number
    packaging: string
    label_raw: string
    innerbox?: string
}