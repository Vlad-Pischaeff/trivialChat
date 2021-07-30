import { cn, gStates } from "../js/classNames"

export default function Logo() {

  return (
    <section className={cn[gStates.page].logo}>
      <p className={cn[gStates.page].logo_text}>TRIVIAL CHAT</p>
    </section>
  )
}