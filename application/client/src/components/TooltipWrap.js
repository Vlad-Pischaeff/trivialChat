import { Emitter } from "../service/Service"

export default function TooltipWrap({tip, children}) {

  return (
    <div  onMouseEnter={() => Emitter.emit('show tip', {'show': true, 'tip': tip })}
          onMouseLeave={() => Emitter.emit('show tip', {'show': false, 'tip': tip })}
          onClick={() => Emitter.emit('show tip', {'show': false, 'tip': tip })}
          onMouseMove={e => Emitter.emit('move tip', e)}>

      {children}
    </div>
  )
}