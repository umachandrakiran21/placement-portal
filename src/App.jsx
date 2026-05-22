import { useState } from "react"

function App() {

  // LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // STUDENTS
  const [students, setStudents] = useState([])

  const [name, setName] = useState("")
  const [branch, setBranch] = useState("")
  const [status, setStatus] = useState("")

  const [search, setSearch] = useState("")

  const [editId, setEditId] = useState(null)

  // LOGIN
  function login() {

    if (
      username.toLowerCase() === "admin" &&
      password === "admin123"
    ) {
      setIsLoggedIn(true)
    } else {
      alert("Invalid Credentials")
    }
  }

  // ADD OR UPDATE
  function handleSubmit() {

    if (name === "" || branch === "" || status === "") {
      alert("Please fill all fields")
      return
    }

    // IGNORE CAPITAL / SMALL LETTERS
    const formattedStatus =
      status.toLowerCase() === "placed"
        ? "Placed"
        : "Pending"

    // UPDATE
    if (editId !== null) {

      const updatedStudents = students.map((student) =>
        student.id === editId
          ? {
              ...student,
              name: capitalize(name),
              branch: branch.toUpperCase(),
              status: formattedStatus
            }
          : student
      )

      setStudents(updatedStudents)

      setEditId(null)

    } else {

      // ADD
      const newStudent = {
        id: Date.now(),
        name: capitalize(name),
        branch: branch.toUpperCase(),
        status: formattedStatus
      }

      setStudents([...students, newStudent])
    }

    setName("")
    setBranch("")
    setStatus("")
  }

  // DELETE
  function deleteStudent(id) {

    const filtered = students.filter(
      (student) => student.id !== id
    )

    setStudents(filtered)
  }

  // EDIT
  function editStudent(student) {

    setEditId(student.id)

    setName(student.name)
    setBranch(student.branch)
    setStatus(student.status)
  }

  // CAPITALIZE NAME
  function capitalize(text) {

    return text
      .toLowerCase()
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ")
  }

  // SEARCH IGNORING CASE
  const filteredStudents = students.filter((student) =>
    student.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  // COUNTS
  const placedCount = students.filter(
    (s) => s.status.toLowerCase() === "placed"
  ).length

  const pendingCount = students.filter(
    (s) => s.status.toLowerCase() === "pending"
  ).length

  // LOGIN PAGE
  if (!isLoggedIn) {

    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f3f4f6"
        }}
      >

        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "10px",
            width: "350px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h1 style={{ textAlign: "center" }}>
            Placement Portal
          </h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "20px"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px"
            }}
          />

          <button
            onClick={login}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px"
            }}
          >
            Login
          </button>

          <p style={{ marginTop: "20px" }}>
            Username: admin
          </p>

          <p>
            Password: admin123
          </p>

        </div>

      </div>
    )
  }

  // MAIN PAGE
  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "30px"
      }}
    >

      <h1>
        Placement Portal Dashboard
      </h1>

      {/* DASHBOARD CARDS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap"
        }}
      >

        <div
          style={cardStyle("#2563eb")}
        >
          <h3>Total Students</h3>
          <h1>{students.length}</h1>
        </div>

        <div
          style={cardStyle("green")}
        >
          <h3>Placed Students</h3>
          <h1>{placedCount}</h1>
        </div>

        <div
          style={cardStyle("red")}
        >
          <h3>Pending Students</h3>
          <h1>{pendingCount}</h1>
        </div>

      </div>

      {/* SIMPLE CHART */}
      <div
        style={{
          background: "white",
          padding: "20px",
          marginTop: "30px",
          borderRadius: "10px"
        }}
      >

        <h2>Placement Statistics</h2>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "50px",
            height: "200px",
            marginTop: "20px"
          }}
        >

          <div>

            <div
              style={{
                width: "100px",
                height: `${placedCount * 30}px`,
                background: "green",
                borderRadius: "10px"
              }}
            ></div>

            <p style={{ textAlign: "center" }}>
              Placed
            </p>

          </div>

          <div>

            <div
              style={{
                width: "100px",
                height: `${pendingCount * 30}px`,
                background: "red",
                borderRadius: "10px"
              }}
            ></div>

            <p style={{ textAlign: "center" }}>
              Pending
            </p>

          </div>

        </div>

      </div>

      {/* FORM */}
      <div
        style={{
          background: "white",
          padding: "20px",
          marginTop: "30px",
          borderRadius: "10px"
        }}
      >

        <h2>
          {editId ? "Update Student" : "Add Student"}
        </h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap"
          }}
        >

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Enter Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            style={inputStyle}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={inputStyle}
          >

            <option value="">
              Select Status
            </option>

            <option value="Placed">
              Placed
            </option>

            <option value="Pending">
              Pending
            </option>

          </select>

          <button
            onClick={handleSubmit}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            {editId ? "Update" : "Add"}
          </button>

        </div>

      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Student"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          borderRadius: "5px",
          border: "1px solid gray"
        }}
      />

      {/* STUDENT CARDS */}
      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px"
        }}
      >

        {
          filteredStudents.map((student) => (

            <div
              key={student.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)"
              }}
            >

              <h2>
                {student.name}
              </h2>

              <p>
                Branch: {student.branch}
              </p>

              <span
                style={{
                  background:
                    student.status === "Placed"
                      ? "green"
                      : "red",
                  color: "white",
                  padding: "5px 15px",
                  borderRadius: "20px"
                }}
              >
                {student.status}
              </span>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "10px"
                }}
              >

                <button
                  onClick={() => editStudent(student)}
                  style={{
                    background: "orange",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteStudent(student.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  )
}

// CARD STYLE
function cardStyle(color) {

  return {
    background: color,
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    flex: 1,
    minWidth: "200px"
  }
}

// INPUT STYLE
const inputStyle = {
  padding: "12px",
  borderRadius: "5px",
  border: "1px solid gray"
}

export default App