import Link from "next/link"
import { FaGamepad } from "react-icons/fa"



export const GamesFAB = () => {
    return (
        <Link
            href={"/games"}
            className='fixed shadow-[0_5px_30px_rgba(74,128,222,0.5)] hover:shadow-[0_0_25px_rgba(74,128,222,0.8)] z-10 right-5 drop-shadow-2xl bottom-5 p-2 flex border-2 border-accent rounded-2xl text-white bg-accent hover:bg-accent/50  transition-colors duration-100 animate-bounce group'
        >
            <FaGamepad className='md:text-3xl text-xl group-hover:animate-wiggle' />
            <span className='md:text-lg ml-2 text-sm'>Games</span>
        </Link>
    )
}
