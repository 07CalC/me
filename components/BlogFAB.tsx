
import Link from "next/link"
import { FaPenNib } from "react-icons/fa"



export const BlogFAB = () => {
  return (
    <Link
      href={"/blog"}
      className='fixed shadow-[0_5px_30px_rgba(243,168,168,0.5)] hover:shadow-[0_0_25px_rgba(243, 139, 168, 0.8)] z-10 left-5 drop-shadow-2xl top-5 p-2 flex border-2 border-accent2 rounded-2xl text-white bg-accent2 hover:bg-accent2/50  transition-colors duration-100 animate-bounce group'
    >
      <FaPenNib className='md:text-3xl text-xl group-hover:animate-wiggle' />
      <span className='md:text-lg ml-2 text-sm'>Blog</span>
    </Link>
  )
}
