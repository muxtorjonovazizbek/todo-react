

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isPressed, setPressed] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      let data = await axios.get("http://localhost:3000/data");
      console.log(data.data);
      setUsers(data.data);
    };
    fetchData();
  }, []);

  
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/data/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  
  const onEdit = (user) => {
    setName(user.name);
    setAge(user.age);
    setPressed(user.id);
  };

  const onSave = async () => {
    if (isPressed) {
      await axios.put(`http://localhost:3000/data/${isPressed}`, {
        name,
        age,
      });
      setUsers(
        users.map((user) =>
          user.id === isPressed ? { ...user, name, age } : user
        )
      );
      setPressed(null); 
      setName(""); 
      setAge("");
    }
  };

  
  const handleCreate = async () => {
    if (name && age) {
      const newUser = { name, age };
      const response = await axios.post("http://localhost:3000/data", newUser);
      setUsers([...users, response.data]); 
      setName(""); 
      setAge("");
    }
  };

  return (
    <div style={{ marginLeft: "300px" }}>
      <div
        style={{
          display: "flex",
          gap: "50px",
          alignItems: "center",
          paddingBottom: "10px",
        }}
      >
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)} 
          style={{ height: "20px" }}
        />
        <input
          type="number"
          placeholder="age"
          value={age}
          onChange={(e) => setAge(e.target.value)} 
          style={{ height: "20px" }}
        />
        <button onClick={handleCreate} style={{ height: "40px" }}>
          Create
        </button>
      </div>

      <table border={1} width={"100%"}>
        <thead>
          <tr>
            <th style={{ width: "30px", textAlign: "center" }}>ID</th>
            <th style={{ width: "160px" }}>Name</th>
            <th style={{ width: "160px" }}>Age</th>
            <th style={{ width: "160px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,ind) => (
            <tr key={user.id}>
              <td>{ind + 1}</td> 
              {isPressed === user.id ? (
                <td>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </td>
              ) : (
                <td>{user.name}</td>
              )}
              {isPressed === user.id ? (
                <td>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </td>
              ) : (
                <td>{user.age}</td>
              )}

              <td
                style={{
                  display: "flex",
                  gap: "5px",
                  paddingLeft: "50px",
                  paddingRight: "50px",
                }}
              >
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                {isPressed === user.id ? (
                  <button onClick={onSave}>Save</button>
                ) : (
                  <button onClick={() => onEdit(user)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

