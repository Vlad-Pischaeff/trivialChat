import { $C, $G } from "../service/Service"

export default function Logo() {

  // console.log('Logo render ...', $G)
  
  return (
    <section className={$C[$G.PAGE].logo}>
      <p className={$C[$G.PAGE].logo_text}>TRIVIAL CHAT</p>
    </section>
  )
}