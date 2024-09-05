
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [ispressed, setPressed] = useState(null);
  useState(async () => {
    let data = await axios.get("http://localhost:3000/data");
    console.log(data.data);
    setUsers(data.data);
  }, []);


  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/data/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };
  const onEdit = async (user) => {
    setName(user.name);
    setAge(user.age);
    setPressed(user.id);
  };
  const onSave = async () => {
    if (ispressed) {
      await axios.put(`http://localhost:3000/data/${ispressed}`,{
        name,
        age,
      });
      setUsers(
        users.map((user) =>
          user.id === ispressed ? { ...user, name, age } : user
        )
      );
      setPressed(null);
    }
  };
  return (
    <div style={{marginLeft: "300px"}}>
     <div style={{display: "flex", gap: "50px", alignItems: "center", paddingBottom: "10npm install -g json-serverpx"}}>
     <input type="text" placeholder="name" style={{height: "20px"}}/>
      <input type="text" placeholder="age" style={{height: "20px"}}/>
      <button style={{height: "40px"}}>Create</button>
     </div>

      <table border={1} width={"100%"} >
        <thead>
          <tr >
            <th style={{width: "30px", textAlign: "center"}}>ID</th>
            <th style={{width: "160px"}}>Name</th>
            <th style={{width: "160px"}}>age</th>
            <th style={{width: "160px"}}>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              {ispressed == user.id ? (
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
              {ispressed == user.id ? (
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
             
              <td className="" style={{display:"flex", gap:"5px", paddingLeft: "50px", paddingRight: "50px"}}>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                {ispressed === user.id ? (
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