import { useEffect, useState } from "react"
import { useFetch } from "../hooks/fetch.hook"
import { useStorage } from "../hooks/storage.hook"
import { $G, $USR, Emitter } from "../service/Service"
import { $WS } from '../service/ServiceWebSocket'
import TooltipWrap from "./TooltipWrap"
import QuickAnswerText from "./QuickAnswerText"

export default function QuickAnswerWrap({ item, idx }) {
  const { request } = useFetch()
  const { saveCredentials } = useStorage()
  const [ edit, setEdit ] = useState(false)
  const [ data, setData ] = useState({})

  useEffect(() => {
    Emitter.on('selected user', (data) => setData(data))
  }, [])

  useEffect(() => {
    Emitter.on('add new answer', data => addNewAnswer(data))
    Emitter.on('selected user', data => setData(data))
    return () => {
      Emitter.off('add new answer')
      Emitter.off('selected user')
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

  const sendMessage = () => {
    if ($G.INDEX !== undefined && $USR[data.index] !== undefined) {
      $WS.send(JSON.stringify({ 'to': data.user, 'msg': item, 'date': Date.now() }))
      $USR[data.index].msgarr.push({ 'msg0':  item, 'date': Date.now() })
      Emitter.emit('reply to user')
    }
    // console.log('QuickAnswerWrap...', data, $USR, $G)
  }

  // console.log('QuickAnswerWrap...', $G.ACC.answer)

  return (
    <>
      <TooltipWrap className="h-2rem" position="tip" tip="Send quick answer...">
        <img  className="b-icon" alt='send'
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAC4jAAAuIwF4pT92AAADYElEQVR4nNWaW2sTQRiGdybr8af4H3rt+Sxe9caKomJvrFhpJRqxeG5tbbXaohgPpaVFpSqKoojnP+CNIP4FTyDS5PP9Jp8hzWk2yexu9oVkmo+SeZ7Mzm5mNj4ReWFEaa28XG7QI/pGWg+H0gnih/GmAj/sKdWNl6Ty+b+QuBpGX84FyuA5v718/rOnteuuTJwKVMAT/cLrdeT7b1z2UxpnAgI/AviDphABPMeJQFzwnJYFasCvBfzblukCpCUBgR8F/AFTIPopn3wk8JymBQR+DPD7TSEGeE5TAu0Cz2lYoAb8GsC/d04XIA0JCPwVwO8zBaIfMmFjgecEFhD4ccDvNYU2gOcEEmhXeI5VQGUyWuD3mEIbwXPqChj4dLocnifsh0joAqSmQBLgOVUFBP464HebAtF3gf8YKV2AVAgI/ATgu0yhAL8a8J8ipwuQRQJJg+cUBZIIzzECAj8J+F2mmhB4ji/wtwDfaSpEf/CcxRq2A4vxjnjx7PHlbNNZrCi1HM/daOOjaiA+PvF3aLsAnAzisvik9U0cKjwXrhmJwk7XAObA47jhgsRMYkhMQILBWUJDog9z4Avq2Zj5rCmeRgE7CQk+jAoSnneDpVC/HR+ePYsuZDISKfzJixZu+fDKoX4vHjx7Kr5KAHZcJC6LRFZGYip6PHuqfpkD7JgcTiMlEnnUp6PFs6fm12nAjspIDEGC/++OjMRMdHj21F3Q8L6+GQml/kvcVblcnlKp2Yj4rLEuKSFxCRIap9WLRgITGhIEibkoAG0JtKiHxKBInIfEErRTkNgJiQdhA9oSeFsFEhdE4qxIzLSDREMbW5A4JxKnRWIaEjsgMR8WoC0Nby1C4ow5O2l9ChJL0c5CYjskHoUBaEtTm7uQGBCJTInENkg8cQ1oS9Pb65A4aU6xWp+AxDK0c5DYComnLgFtaekGByQyCpc2CKTNQkjr+5DYAolnrgBtafkWEyl1HBIpCPSXSGyGxHMXgLY4uckHiWOQ4Ct2Hx4rIPEQEpsg8cLF+9eLs9uskOiXkegtkdgIiZeu+qgWpze6IXFURuIIHishMQ+JDZB45bKf0jj/qQEkemUkeooSCwvryfdfu+6LE8qPPSBxWEbiEF6yxCq0yRHgQKLHnGKJvob1SxXOPwqctQ8lK3zQAAAAAElFTkSuQmCC"
              onClick={sendMessage}
        />
      </TooltipWrap>
      <QuickAnswerText item={item} edit={edit} idx={idx} />
      {
        edit
          ? <TooltipWrap className="h-2rem" position="tip-left" tip="Save answer...">
              <img  className="b-icon" alt='ok'
                    src="data:image/png;base64,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"
                    onClick={handleClickSave}/>
            </TooltipWrap>
          : <TooltipWrap className="h-2rem" position="tip-left" tip="Edit answer...">
              <img  className="b-icon" alt='edit'
                    src="data:image/png;base64,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" 
                    onClick={handleClickEdit}/>
            </TooltipWrap>
      }
      <TooltipWrap className="h-2rem" position="tip-left" tip="Delete answer...">
        <img  className="b-icon" alt='delete'
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAwCAYAAACMuVOlAAAACXBIWXMAAC4jAAAuIwF4pT92AAADUUlEQVR4nO2Zz0sUYRjHn3fnB7uYi7q4tGKKURAUiiuBHsIuXSQP4nqqQ/9ARBCSYRoKlRBCh24dIqLTioc8FHQpIiJK0MKEwlhiUdEWaUVXZ3eennfdtXVnxp1pHXcO+4V5f8zzPO/74X3mHdd3REQEq2KKchpE8QE1O4Exj6kgxF9UPoGRkTs4PKxamU/8T8APBHfEWiA7RuVtGBpyU91vJdQyJAE+3gVEjFC5YjKymeJkqq+zROIRut0RWyBZMnmOINszgN8gGm3D+vpNU7GIo1QNEqgIsnyJ2ndtgQRB6NltI46ZBUxLUZ4S3GC6zdh5sA0S4GK6REzC+voL8HpNB6Isf6fVXCTAAHU7mMvFUFVN7VqRUthGKxQyASzRBCcz7VWorBxg1t8M2+mSP9Op1EOK3yrgnyS/sEiAUxR01NJUO/43rBLmjXHVlJ8gXOGrt0CXNcjD1YIIS0sXoLY2mN51ThN/9ldWpkUMBDao+67UPIYKBLSbhalqP61qZSl40kJcR5drLPeWNsWMXaOr7tCgtFqkqwBk6aV5rxlDIv4GVb1sK06uXK5nlEGfnmm/lUygILy0CUmj/V7sTko3y9QW0q03SizmpT+HTShJM7r26WkJmptbYHZ2BoNBRddHUVogHv+JNTV/zM5rGpKFwwL09n6m5+YEvaYG6DVxX+PU2vqc7CGqw9Tr04yhqjdBku5BdfUPGu8UhkKpA4WErq5aDrgzG+sw8OrIq/MoM3F8HD4ewFKuNVMXlW5m0NbzKWTfz0cjJ22crIrbODbLcGWdBGkoJ0KW022bnAhZTrdtchLkwfwKKpXKkBZVTrftchJkOd22y0mQ5XQftIpYyfn5Vfp/Onsw/8XAi9+vK2DvBn7Az8cLBnNtxf8K4icSbHPzLMjyGZicfA2hkNYpFuuDqqpOWFt7Az6ds6eJiSHo6XkL29tfjU44zEImMrWXRSJubGzM9gE9nihVUV1Abvf54lRN6QJy+86JxSvw7P0cyZaXK8Dvz34GjJuB/EjX8fRpb0PDHONHgHbL7/fnnNl/yjdrIRVlFCSpm4Iq6GqiO002I/4T4gbNP06P1J7bGkiU5TmmKPwb4jh12wnUfQhw/PPfe0ilbtH88/nmv0Al+fHv4NoGAAAAAElFTkSuQmCC"
              onClick={handleClickDelete}/>
      </TooltipWrap>
    </>
  )
}