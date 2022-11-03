import { useUser } from "../context/user.context";
import { NextPage } from "next";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import { fetcherSSR } from "../lib/fether-ssr";
import { fetcherSSRPost } from '../lib/fetchpost'
import Link from "next/link";

interface UserDocument {
    id: string
    email: string
    password: string
    refresh_token: string
    created_at: Date
    updated_at:Date
    balance: number
}

interface UserCheckout {
  checkout:string
}

const MeSSR: NextPage<{user:UserDocument, checkout:UserCheckout}> = ({user,checkout}) => {

  return (
    <main className="flex items-center justify-center h-full">
      <div className="text-center space-y-4">
        <h1 className="px-4 py-2 text-lg font-medium bg-gray-200 rounded">
          Server side authentication
        </h1>
        <p>Hi, {user!.id} 👋</p>
        <Link href={checkout!.checkout}>Checkout</Link>
      </div>
    </main>
  )
}

export default MeSSR;



export const getServerSideProps:GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const {req, res} = ctx;
    const [error, user] = await fetcherSSR(req, res, 'https://api.firdausismail.online/user/profile')

    if(!user) return {redirect: {statusCode:307, destination: '/login'}}
    
    const [err, checkout] = await fetcherSSRPost(req, res, 'https://api.firdausismail.online/payment/checkout', 'price_1LzPxhC3J13TnkehVXwawAAK', 10)

    return {props:{user, checkout}}
}