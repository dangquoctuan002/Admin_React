import React, { useState, useEffect } from 'react'


function UserTable() {
  const [users, setUsers] = useState([]);
  const [showmodel, setShowmodel] = useState(false)
  const [showmodeledit, setShowmodeledit] = useState(false)
  const [id, setId] = useState('')
  const [userName, setUsername] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [age, setAge] = useState('')
  const [search, setSearch] = useState('')


  const fecthdata = () => {
    fetch('https://bg-smoke.onrender.com/api/user/list')
      .then(response => response.json())
      .then(data => {
        if (data.status === 1) {
          setUsers(data.data);
        } else {
          console.error('Failed to fetch data');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const updateUser = (id) => {
    setShowmodeledit(true)
    fetch(`https://bg-smoke.onrender.com/api/user/${id}`)
      .then(ref => ref.json())
      .then(
        (data) => {
          setId(data.data.id)
          setUsername(data.data.userName)
          setPhoneNumber(data.data.phoneNumber)
          setAge(data.data.age)
        }
      )
  }
  useEffect(() => {
    fecthdata()
  }, []);

  const sub = () => {
    fetch('https://bg-smoke.onrender.com/api/user/create', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": Number(id),
        "userName": userName,
        "phoneNumber": phoneNumber,
        "age": Number(age)
      })
    })
      .then(ref => ref.json())
      .then(ref => {
        if (ref.status === 0) {
          alert("that bai");
        } else {
          setShowmodel(false)
          fecthdata()
          alert("them thanh cong");
        }
      })
  }

  const subEdit = () => {
    fetch('https://bg-smoke.onrender.com/api/user/edit', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": Number(id),
        "userName": userName,
        "phoneNumber": phoneNumber,
        "age": Number(age)
      })
    })
      .then(ref => ref.json())
      .then(ref => {
        if (ref.status === 0) {
          alert("that bai");
        } else {
          setShowmodel(false)
          fecthdata()
          alert("sua thanh cong");
        }
      })
  }


  const del = (id) => {
    fetch(`https://bg-smoke.onrender.com/api/user/delete?id=${id}`, {
      method: 'delete'

    })
      .then(ref => ref.json())
      .then(ref => {
        if (ref.status === 0) {
          alert("that bai");
        } else {
          fecthdata()
          alert("xoa thanh cong");
        }
      })
  }

  const btnSearch = (name) => {
    if (search === '') {
      fecthdata()
    }
    else {
      fetch(`https://bg-smoke.onrender.com/api/user?name=${name}`, {
      })
        .then(ref => ref.json())
        .then(data => {
          if (data.status === 0) {
            alert("that bai");
          } else {
            setUsers([data.data])
          }
        })
    }

  }
  
  return (
    <div>

      <button onClick={() => {
            setId('')
            setUsername('')
            setPhoneNumber('')
            setAge('')
            setShowmodel(true)}
            }>showmodel</button>
      <div>
        <input type="text" onChange={(e) => { setSearch(e.target.value) }} value={search} name="search" id="search" placeholder='Search...' />
        <button onClick={() => btnSearch(search)}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Phone Number</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
         {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.age}</td>

              <button onClick={() => {
                del(user.id)
              }}>X</button>

              <button onClick={() => {
                updateUser(user.id)
              }}>Edit</button>
            </tr>
          ))} 
        </tbody>
      </table>

      {showmodel &&
      <>
        <div onClick={(e) => {
          e.stopPropagation()
          setShowmodel(false)}}
           style={{ width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,.6)', position: 'fixed', top: '0', left: '0' }}>
        </div>
          
          <button style={{ position: 'relative', left: '96%' }} onClick={() => setShowmodel(false)}>X</button>
          <div className='box'>
            <h2 style={{ textAlign: 'center' }}>Create user</h2>
            <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', margin: '0 20%', lineHeight: '2' }}>
              <div className='left' style={{ marginRight: '50px' }}>
                <label htmlFor="">ID</label><br />
                <label htmlFor="">userName</label><br />
                <label htmlFor="">phoneNumber</label><br />
                <label htmlFor="">age</label><br />
              </div>
              <div className='right'>
                <input type="number" onChange={(e) => { setId(e.target.value) }} value={id} name='id' placeholder='id' /> <br />
                <input type="text" onChange={(e) => { setUsername(e.target.value) }} value={userName} name='userName' placeholder='userName' /> <br />
                <input type="text" onChange={(e) => { setPhoneNumber(e.target.value) }} value={phoneNumber} name='phoneNumber' placeholder='phoneNumber' /> <br />
                <input type="text" onChange={(e) => { setAge(e.target.value) }} value={age} name='age' placeholder='age' /> <br />
              </div>
            </div>
            <button style={{ margin: '0 40%' }} onClick={sub}>Submit</button>
          </div>
          </>
      }
      {showmodeledit &&
        <div style={{ width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,.6)', position: 'fixed', top: '0', left: '0' }}>
          <button style={{ position: 'relative', left: '96%' }} onClick={() => setShowmodeledit(false)}>X</button>
          <div className='box'>
            <h2 style={{ textAlign: 'center' }}>Edit user</h2>
            <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', margin: '0 20%', lineHeight: '2' }}>
              <div className='left' style={{ marginRight: '50px' }}>
                <label htmlFor="">ID</label><br />
                <label htmlFor="">userName</label><br />
                <label htmlFor="">phoneNumber</label><br />
                <label htmlFor="">age</label><br />
              </div>
              <div className='right'>
                <input type="number" readOnly onChange={(e) => { setId(e.target.value) }} value={id} name='id' placeholder='id' /> <br />
                <input type="text" onChange={(e) => { setUsername(e.target.value) }} value={userName} name='userName' placeholder='userName' /> <br />
                <input type="text" onChange={(e) => { setPhoneNumber(e.target.value) }} value={phoneNumber} name='phoneNumber' placeholder='phoneNumber' /> <br />
                <input type="text" onChange={(e) => { setAge(e.target.value) }} value={age} name='age' placeholder='age' /> <br />
              </div>
            </div>
            <button style={{ margin: '0 40%' }} onClick={subEdit}>Submit</button>
          </div>
        </div>
      }
    </div>
  );
}

export default UserTable;
