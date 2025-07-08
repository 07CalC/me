import Link from "next/link"
import { FaGamepad } from "react-icons/fa"



export const GamesFAB = () => {
    return (
        <Link
            href={"/games"}
            className='fixed  z-10 right-5 drop-shadow-2xl top-5 p-2 flex border-2 border-border  text-white bg-accent hover:bg-accent/50 group transition-all 
  ease-in-out 
  duration-200 
  shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] 
  active:translate-y-2
  active:translate-x-2
  active:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)]'
        >
            <FaGamepad className='md:text-3xl text-xl group-hover:animate-wiggle' />
            <span className='md:text-lg ml-2 text-sm'>Games</span>
        </Link>
    )
}
