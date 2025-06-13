import { createClient } from "../../../supabase/client";
import { redirect } from "next/navigation";


export async function updatePassword(formData: FormData) {
    const supabase = await createClient()
    const data = {
        password: formData.get('password') as string
    }

    const {error} = await supabase.auth.updateUser(data)
    if (error) {
        console.log('error')
    }

    redirect('/login')
}

export async function updateEmail(formData: FormData) {
    const supabase = await createClient()
    const data = {
        email: formData.get('email') as string
    }

    console.log(data)

    const {error} = await supabase.auth.updateUser(data)
    if (error) {
        console.log('error')
    }

}