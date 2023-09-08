import { ReactNode } from "react"

type IconHoverEffectProps = {
    children: ReactNode
    red?:boolean
}

export function IconHoverEffect({
    children, red = false 
}: IconHoverEffectProps){
    const colorClasses = red ? "outline-red-400 hover:bg-red-200 group-hover:bg-red-200 group-focus-visible:bg-red-200 focus-visible:big-red-200 " : "outline-zinc-400 hover:bg-zinc-800 group-hover:bg-zinc-800 group-focus-visible:bg-zinc-800 focus-visible:bg-zinc-800";

    return (
        <div className={`rounded-full p-2 transition-colors duration-200 ${colorClasses}`}>

            {children}
        </div>
    )
}