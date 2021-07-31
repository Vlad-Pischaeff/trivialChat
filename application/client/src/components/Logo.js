import { cn, GS } from "../js/classNames"

export default function Logo() {

  return (
    <section className={cn[GS.page].logo}>
      <p className={cn[GS.page].logo_text}>TRIVIAL CHAT</p>
    </section>
  )
}