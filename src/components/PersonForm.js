import React from 'react'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.add}>
      <div>
        nimi:
        <input
          value={props.name}
          onChange={props.nameChange}
        />
      </div>
      <div>
        numero:
        <input
          value={props.number}
          onChange={props.numberChange}
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
 )
}

export default PersonForm
