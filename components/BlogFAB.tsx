
import Link from "next/link"
import { FaPenNib } from "react-icons/fa"



export const BlogFAB = () => {
  return (
    <Link
      href={"/blog"}
      className='fixed z-10 left-5 top-5 p-2 flex border-2 border-border  text-white bg-accent2 hover:bg-accent2/50  group transition-all 
  ease-in-out 
  duration-200 
  shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] 
  active:translate-y-2
  active:translate-x-2
  active:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)]'
    >
      <FaPenNib className='md:text-3xl text-xl group-hover:animate-wiggle' />
      <span className='md:text-lg ml-2 text-sm'>Blog</span>
    </Link>
  )
}
