

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
    name: string
    type: sting
    size: number
    packaging: string
    innerbox: string
    spec: string
    catatan: string
}