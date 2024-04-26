import './style.css'

export function Select({
  text,
  name,
  options,
  handlerOnChange,
  value
}) {

  const opt = options.map((e) => {
    return <option value={e.id} key={e.id}>{e.sigla}</option>
  })
  return (
    <div className="form_control">
      <label htmlFor={name}>{text}</label>
      <select name={name} id={name} onChange={handlerOnChange}>
        <option value={0}>...{text}</option>
        {opt}
      </select>
    </div>
  )
}
