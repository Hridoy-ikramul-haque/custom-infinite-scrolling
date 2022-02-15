import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  let increase = 10;
  const [student, setStudent] = useState([]);
  const loadStudent = () => {
    axios.get("http://localhost:5000/api/getInfo").then(({ data }) => {
      let fetchedData = data.slice(0, increase);
      const allStudent = [];
      fetchedData.forEach((s) => {
        allStudent.push({
          id: s.id,
          name: s.name,
          email: s.email,
          increase: increase,
        });
      });
      setStudent(allStudent);
    });
    increase += 5;
  };

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      loadStudent();
    }
  };

  useEffect(() => {
    loadStudent();
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <h1>Welcome to Infinite Scroll!</h1>
      <div className="studentTable">
        <table>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </thead>
          <tbody>
            {student.map((p) => {
              return (
                <tr>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
