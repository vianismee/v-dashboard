import type { GetServerSideProps } from 'next';
import { createClient } from '../../../../../supabase/server';

type User = {
    email?: string
}

export const getServerStaticProps: GetServerSideProps<{user: User}> = ( async () => {
    const supabase = await createClient()
    const {data: {user}, error} = await supabase.auth.getUser()
    if(error) {
        console.log(error)
    }
    return {props: {user: user || {}}}
} )