export default function SettingsTab({idx, setIdx}) {
  const tab = ['Header', 'Greeting']

  return (
    <>
      {
        tab.map((item, i) => (
          <div  className={i === idx ? "tab_front" : "tab_back"} 
                onClick={() => setIdx(i)} key={i}>
            {item}
          </div>
        ))
      }
    </>
  )
}