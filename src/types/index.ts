
interface IUser {
    user_id: number
    name: string
    email: string
    title: string
    job?: IJob
}

interface IJob {
    job_id: number
    brand: string

}

export type {IUser, IJob};