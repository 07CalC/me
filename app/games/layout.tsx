import { Metadata } from "next";



export const metadata: Metadata ={
    title: 'Games',
    description: 'Old school 2D games with the worst graphics ever',
}


export default function GamesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            {children}
        </div>
    );
}