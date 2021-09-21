import { useEffect, useRef, useState } from "react"
import { useFetch } from "../hooks/fetch.hook"
import { useStorage } from "../hooks/storage.hook"
import { $URL, $G, Emitter } from "../service/Service"
import TooltipWrap from "./TooltipWrap"
import QuickAnswerText from "./QuickAnswerText"

export default function QuickAnswerWrap(props) {
  const { item, idx } = props
  const { request } = useFetch()
  const { saveCredentials } = useStorage()
  const [ edit, setEdit ] = useState(false)

  useEffect(() => {
    Emitter.on('add new answer', data => addNewAnswer(data))
    return () => {
      Emitter.off('add new answer')
    }
  }, [])

  const addNewAnswer = (data) => {
    data === idx ? handleClickEdit() : setEdit(false)
  }

  const handleClickEdit = () => {
    setEdit(true)
  }

  const handleClickSave = async () => {
    setEdit(false)
    await updateUserProfile()
  }

  const handleClickDelete = async () => {
    $G.ACC.answer.splice(idx, 1)
    await updateUserProfile()
  }

  const updateUserProfile = async () => {
    const body = {"answer": $G.ACC.answer}
    try {
      const data = await request(`/api/auth/user/${$G.ACC._id}`, 'PATCH', body)
      let newdata = { ...data, token: $G.ACC.token }
      saveCredentials(newdata)
      Emitter.emit('update user profile')
    } catch(e) {
      alert('Error while update site name ...', e)
    }
  }

  // console.log('QuickAnswerWrap...', $G.ACC.answer)

  return (
    <>
      <TooltipWrap className="h-2rem" position="tip" tip="Send quick answer...">
        <img  className="b-icon" alt='send'
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAC4jAAAuIwF4pT92AAADYElEQVR4nNWaW2sTQRiGdybr8af4H3rt+Sxe9caKomJvrFhpJRqxeG5tbbXaohgPpaVFpSqKoojnP+CNIP4FTyDS5PP9Jp8hzWk2yexu9oVkmo+SeZ7Mzm5mNj4ReWFEaa28XG7QI/pGWg+H0gnih/GmAj/sKdWNl6Ty+b+QuBpGX84FyuA5v718/rOnteuuTJwKVMAT/cLrdeT7b1z2UxpnAgI/AviDphABPMeJQFzwnJYFasCvBfzblukCpCUBgR8F/AFTIPopn3wk8JymBQR+DPD7TSEGeE5TAu0Cz2lYoAb8GsC/d04XIA0JCPwVwO8zBaIfMmFjgecEFhD4ccDvNYU2gOcEEmhXeI5VQGUyWuD3mEIbwXPqChj4dLocnifsh0joAqSmQBLgOVUFBP464HebAtF3gf8YKV2AVAgI/ATgu0yhAL8a8J8ipwuQRQJJg+cUBZIIzzECAj8J+F2mmhB4ji/wtwDfaSpEf/CcxRq2A4vxjnjx7PHlbNNZrCi1HM/daOOjaiA+PvF3aLsAnAzisvik9U0cKjwXrhmJwk7XAObA47jhgsRMYkhMQILBWUJDog9z4Avq2Zj5rCmeRgE7CQk+jAoSnneDpVC/HR+ePYsuZDISKfzJixZu+fDKoX4vHjx7Kr5KAHZcJC6LRFZGYip6PHuqfpkD7JgcTiMlEnnUp6PFs6fm12nAjspIDEGC/++OjMRMdHj21F3Q8L6+GQml/kvcVblcnlKp2Yj4rLEuKSFxCRIap9WLRgITGhIEibkoAG0JtKiHxKBInIfEErRTkNgJiQdhA9oSeFsFEhdE4qxIzLSDREMbW5A4JxKnRWIaEjsgMR8WoC0Nby1C4ow5O2l9ChJL0c5CYjskHoUBaEtTm7uQGBCJTInENkg8cQ1oS9Pb65A4aU6xWp+AxDK0c5DYComnLgFtaekGByQyCpc2CKTNQkjr+5DYAolnrgBtafkWEyl1HBIpCPSXSGyGxHMXgLY4uckHiWOQ4Ct2Hx4rIPEQEpsg8cLF+9eLs9uskOiXkegtkdgIiZeu+qgWpze6IXFURuIIHishMQ+JDZB45bKf0jj/qQEkemUkeooSCwvryfdfu+6LE8qPPSBxWEbiEF6yxCq0yRHgQKLHnGKJvob1SxXOPwqctQ8lK3zQAAAAAElFTkSuQmCC"
        />
      </TooltipWrap>
      <QuickAnswerText item={item} edit={edit} idx={idx} />
      {
        edit
          ? <TooltipWrap className="h-2rem" position="tip-left" tip="Save answer...">
              <img  className="templates_body-itemicon" alt='ok'
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAErklEQVRoge2ZTUgcZxjH/8/MrAeJtFhXsn600hLd3VgLXbUUUtCQi8XFrGZNW1vooaQVDfReClsovZe6NubQk4eoUVd2TSmE4LEYhRYbbYT0kFiVbpQGF0V3Z54eojHdeXdnZmf0Ev+3fd6P+f3nfXbeL+BEJ3qxRU50Eh4NyztKppklrVViCmiAlwAPAacAgIEUmFaJ+L5GPC+p8p3AQsNsJBLR7D7bloGOWEe1pkl9DHwM4kqLzVdAPKyqcvTnromVQhkKMtA2GnYrrvS3DHwKoKjQh+9rD8Q/kax9HQ/GH1ttbNlAMNbxETP9AKDUalsDbTBT/3Tn5A0rjUwbCAxdcXncyUEQf2adzbyYaWg96b46//n1tJn6pgwE48Fizsg3AbTZojOvW6So4Xgwvm1UUTKqEBi64jpmeAB4nzPyVHg0bPj/MjTgcScHcbzwB7qwU7T3vVGlvCnUPhHqAfGwc0wFiPiDxMWpkZzFuQpCE6FX0sR/Aig7EjDz2iRFrcv1ic2ZQhni73CM8GUlxbmKSrWM/E2uQuEItI13VsmS9gD2JylTqj1diu7mevz6YAW37/0lqrJHinomHow/zC4QjoBC3I9jhlckCefOvIoLZ18XVStiVeoVFegMRCIRiYl7nAYVyedx43Lzm1CkQ4x336iGW5ROmvRJeDQsZ4d1BuYafn8HQJWzqHrVni5FV5MPsnSYxarGuHl3EcktwfxFXLnjSgeywzoDLGmtzqLq5a8o0735A/iltWTOdsR0PjumM0Ca1OgQp1D+ijJ0NZ4Vvvl88ADAgPEIAKi1C5lLduABgIjrsmN6A8Qes0B5vt06+TxuW/AAwICOTTQCp8x01uKtQW9rE3wet2Fdf0UZLjX5bcHvqyQ7YLiYE6nFW4MWbw1kiXCpyZ/XhN20MZLIQCpfA3dJMd6rfe3Z73wmjgB+KzugN8C0lq+H5NY2RmYXkNEODxRkidDd7Ed9VflRwoMAHZtoBJaNOlpe38To7B//M0FE6Ar4UF9VfmRpw0z3s2OiiWzOTGfL65sYv7sEVeNnMSJC6G2fEH587p7tnBex6QxIqnzHbIdLa0lhOone/OKq5RMTnURsOgOBhYZZAI/MdipKpwM5+bUB8DCw0DCfHdSt7mZmZrj2w7pygM6Z7XkjtYP1J1vwVbgh0dO37zA8AAxe7712OzsonAdUVY4C2LPS+/MjcQTwu1AyUVFBzj1xe6zjRzB9YfVJ/oqnu1Ancv45DSRCsauigpwzcXqv6CsAlikWVx87Db9BippzT5zTwC/dY5vMJHR9nGKm3nyHvnnXQtOdkzeYach5LJMijk53To7lq2K4mCvOKH0AYo5BmRQRT6deevKlUT1DA2PdYyopag+AW46QmVMCstY90zqTMapoajkdD8a31/4pvwjia/bZDEQcTb38b8jMyTRQwAVHe6zjMpgG4PypXZKZ+oxyPluWNzSJi1MjLiYvA4MAdq22F2gXwEA67fJahQdsXvK1x9srocr9YOoBUG2x+SMAw1Ay0UQw8XehDI5cs0YiEWnurd8aiek8AwEirmOgEof76xSYVgAss6TN7V+zzjtxzXqiE73o+g+dpfqwWeHHNgAAAABJRU5ErkJggg=="
                    onClick={handleClickSave}/>
            </TooltipWrap>
          : <TooltipWrap className="h-2rem" position="tip-left" tip="Edit answer...">
              <img  className="templates_body-itemicon" alt='edit'
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAuUlEQVRIie3VoQrCQAAG4E+x+xJisxnMghar0ZcwGbXpW1gtPo3dZlRMVg06mMPhhN0NYT9cuB3cdz8HO+r8eea44IB+LHSFe2pcMYiNpvG35s3QJ3mljW1oJK/1OQS0KoDPy0aTjTeZtUVqbRkKTcan5tlvpaN5zaOgwfAiaJQ7rdEa/Tljz/f0G1rqzyHJrAoURlWg0I2J9jIbdzDEFLdQKKzlt5qEQuEo0j22MvMTGthhHxKuEy0PMEmbFgT9Aw4AAAAASUVORK5CYII=" 
                    onClick={handleClickEdit}/>
            </TooltipWrap>
      }
      <TooltipWrap className="h-2rem" position="tip-left" tip="Delete answer...">
        <img  className="templates_body-itemicon" alt='delete'
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADbklEQVRoge2aTUgVURTHf5qCSBASfbwWbqqFWJKLIIyohBbV1o0ULVqE2LJVRfRWJrlrYwkuaqNBH9ZOhBZ9UBnyIpVHQdgiCrMiI8tImxZzpjczbz7u+O6dl+EfLm/umTP3/M/9OPfcmQcr+H+xGRgFngJbysxlyWgFPgKWlE/AgZhn9gCDwBVgjVF2ijgJ/MJ24C5wW64XgFM+3RrgOJATnUX5nQJaUuJbhGrgshD5DXQBlUAFkBWZBVwDtsr9GZHNABeAeuAI8AW7M7JAVZpOrAXuCal54FiAzmFsgpar5IATQK1Ptx64LzqprbEm7KlgAW+BnRG624DXovsV2B2hWwWcxx6ZWeyR0oZHeHu0nOVBFNGKGEcsVY9TQihf1YUV57BpxHZoZRos0oDqiPxrU6wIcSPyMBUWaohc7CoYwR6Rn/I7DqyXMu6TESJfqq5jc6RUJwB6pLFLwITLaBAxB36CS9GdEJuWcCgZR6WxG8A64AWF2J4HNoY8p0P3ptRjN0eVqJWT3x0h95OE5qRh3LGZi9RSRBXwHTsJnCS9qTUpNn+gMZEcpXjY3dMhD2RE1y8vRddJIrWhj8ICdPeovzcbCe/9pLpOYOnT6UinNNofcM9N0DkoBU2hpLr9cr+zRO4etEijYyH3G13EFqUeBlXdMdGJSv0TY7UYncc+GbphYkSqxdai2NaKl2K4OYSYzjXSLPJXup0AuI436gRFHALkpegOmnDkNIWQmMY+YgFnDPjBIZcB0ymKUw6qkktysHoeIjeZooTZLBnTpDe1po14IBgWI20BBHSdR9qkPmzSkW4xkpW6P+o0ERydkuhmRdZt0A/axciQS6Z7QxwSebtm7h40iJEpn1xniuK8xWzQwDcUq4A57HNCnch0jkidtD0ntoziiRDYT/y8z7ieU1kjrVJ/bNoJgF4x1hVAJIhwkhTlolz3puAHHXh3X537iFM6DHH3YJfLYNTC9hMMWzfgDQCW2DCOWuzPau4cKhOgF5RrqegtUPwhyBjyYnQWtbOHyhnFaStvmLsHA2L0XABJ1RTFLzsr1wMp+vF3h38GbCJ57/v1MtghV/vLhjjUAG/E8B1gH4WXd6oboiXP7AVuSf0DZfjmvh347CJVavmG3SFlwQbsfy68iyAYV94DV1nGf/tYwQqWA/4A49UuO8DKyiAAAAAASUVORK5CYII="
              onClick={handleClickDelete}/>
      </TooltipWrap>
    </>
  )
}