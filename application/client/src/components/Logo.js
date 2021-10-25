import { $C, $currPage } from "../service/Service"

export default function Logo() {

  // console.log('Logo render ...', $G)
  
  return (
    <section className={$C[$currPage].logo}>
      <p className={$C[$currPage].logo_text}>TRIVIAL CHAT</p>
    </section>
  )
}