import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputLabel, Input, FormControl, Button, Modal, Box } from '@mui/material';

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = React.useState(false);
  const [updateId, setUpdateId] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    axios.get(`http://localhost:8000`)
      .then(res => {
        setData(res.data)
      })
  }

  const handleSubmitTask = () => {
    axios.post(`http://localhost:8000`, {
      title,
      description
    }).then(res => {
      getData();
    })
  };

  const handleRemoveTask = (id) => {
    axios.delete(`http://localhost:8000/${id}`).then(res => {
      getData();
    })
  };

  const handleOpen = (id) => {
    axios.get(`http://localhost:8000/${id}`)
      .then(res => {
        setUpdateId(res.data.id)
        setUpdateTitle(res.data.title)
        setUpdateDescription(res.data.description)
      })
    setOpen(true)
  };

  const handleClose = () => setOpen(false);

  const handleUpdateTask = () => {
    axios.put(`http://localhost:8000/${updateId}`, {
      title: updateTitle,
      description: updateDescription
    }).then(res => {
      getData();
      handleClose()
    })
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="App">
      <h1>Create a Task</h1>
      <FormControl fullWidth>
        <InputLabel htmlFor="my-input">Title</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" onChange={e => setTitle(e.target.value)} />
      </FormControl>
      <br />
      <br />
      <FormControl fullWidth>
        <InputLabel htmlFor="my-input">Description</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" onChange={e => setDescription(e.target.value)} />
      </FormControl>
      <br />
      <br />
      <Button variant="contained" onClick={handleSubmitTask}>Submit</Button>

      <br />
      <br />
      <h1>View Data</h1>
      <div className='view'>
        <table>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
          {
            data.map(value => {
              return (
                <tr key={value.id}>
                  <td>{value.id}</td>
                  <td>{value.title}</td>
                  <td>{value.description}</td>
                  <td>
                    <Button variant="contained" onClick={() => handleOpen(value.id)}>Update</Button> &nbsp;&nbsp;
                    <Button variant="contained" onClick={() => handleRemoveTask(value.id)}>Remove</Button>
                  </td>
                </tr>
              )
            })
          }
        </table>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2>Update a task</h2>
            <FormControl fullWidth>
              <InputLabel htmlFor="my-input">Title</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" value={updateTitle} onChange={e => setUpdateTitle(e.target.value)} />
            </FormControl>
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel htmlFor="my-input">Description</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" value={updateDescription} onChange={e => setUpdateDescription(e.target.value)} />
            </FormControl>
            <br />
            <br />
            <Button variant="contained" onClick={handleUpdateTask}>Update</Button>
          </Box>
        </Modal>

      </div>

    </div>
  );
}

export default App;
