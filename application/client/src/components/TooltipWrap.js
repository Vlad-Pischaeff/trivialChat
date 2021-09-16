import { Emitter } from "../service/Service"

export default function TooltipWrap({position = "tip", tip, children}) {

  return (
    <div  onMouseEnter={() => Emitter.emit('show tip', {'show': true, 'tip': tip, 'pos': position })}
          onMouseLeave={() => Emitter.emit('show tip', {'show': false, 'tip': tip, 'pos': position })}
          onClick={() => Emitter.emit('show tip', {'show': false, 'tip': tip, 'pos': position })}
          onMouseMove={e => Emitter.emit('move tip', e)}
          onMouseOver={e => Emitter.emit2('show tip2', {'show': true, 'tip': tip, 'pos': position}, e)}
          >
      {children}
    </div>
  )
}