import React from 'react'

const PersonInfo = ({persons, deletePerson}) => {
  return (
    <table>
      <tbody>
          {persons.map(p =>
            <tr key={p.name}>
              <td>{p.name}</td>
              <td>{p.number}</td>
              <td>
                <button onClick={deletePerson(p)}>poista</button>
                </td>
            </tr>
        )}
      </tbody>
    </table>
  )
}

export default PersonInfo
