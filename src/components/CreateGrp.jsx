import React, { useState } from "react"
import axios from "axios"

const CreateGrp = () => {
  const [grpName, setGrpName] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:5000/createGrp",
        {
          groupname: grpName
        },
        {
          // headers: { "Content-Type": "application/json" },
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        }
      )

      // setMessage("Group created successfully")
      setMessage(response.data.message)
      setGrpName("")
    } catch (err) {
      if (!err?.response) {
        setMessage("No Server Response")
      } else {
        setMessage(err.response.data.message)
      }
    }
  }

  return (
    <div>
      <h1>Create Group</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Group Name:</label>
          <input type="text" value={grpName} onChange={e => setGrpName(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default CreateGrp
