import React,{useState,useEffect} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import './Table.css'

// row === pending
function Row(props) {
  const { row } = props;
  const { rxStatus } = props;
  const { cancel } = props;
 console.log(row);
  const [message,setmessage] =useState(false);
  const [message2,setmessage2] =useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const handleClose1 = () => {
    setOpen1(false);
  };
  let history = useHistory();
  const handledone1 = () =>{
    
    axios
        .put(`https://devhomoeoback.herokuapp.com/admin/rx/${row._id}/delivered`)
        .then(res => {
          setOpen1(false);
          history.push('/adminRx/delivered');
        })
        .catch(err => {
            console.log(err)
        })
    
  };
  const handleClickOpen1 = () => {
    
    setOpen1(true);
    
  };
  const handleClickOpen3 = () => {
    
    setOpen3(true);
    
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose3 = () => {
    settotal(row.amount);
    
    setOpen3(false);
  };

  const handleOpenRx = (mobile) =>{
    history.push(`/rxpage/${mobile}`);
  }
  const handledone2 = () =>{
    axios
    .put(`https://devhomoeoback.herokuapp.com/admin/rx/${row._id}/cancel`)
    .then(res => {
      setOpen2(false);
      history.push('/adminrx/cancelled');
    })
    .catch(err => {
        console.log(err)
    })
    
  };
  const [total,settotal] = useState(row.amount);
  const handledone3 = () =>{
   console.log(row._id);
    axios
    .put(`https://devhomoeoback.herokuapp.com/admin/rx/${row._id}/amount`,{amount:total})
    .then(res => {
        console.log(total);
      setOpen3(false);
    })
    .catch(err => {
        console.log(err)
    })
    
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
    
  };
  const [messagee,setmessagee] = useState("");
  const handleOpen = (mobile) =>{
    if (typeof mobile === 'undefined') {
      setmessagee("User doesn't exist")
    }
    else{
    history.push(`/userdetail/${mobile}`);
    }
  }
  
  const [mobile,setmobile] = useState();
  
  useEffect(() => {
    
    axios
    .get(`https://devhomoeoback.herokuapp.com/user/${row.user}/details`)
    .then(res => {
console.log(res)
setmobile(res.data.mobile)
console.log(res.data);

    })
    .catch(err => {
        console.log(err)
    })
   
}, [])
  
const handleChange = event => {
  settotal(event.target.value);
  };
  
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { brxBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell ><Button variant="outlined" color="primary" onClick={handleClickOpen3}>₹ {total}.00 </Button></TableCell>
        <Dialog
        open={open3}
        onClose={handleClose3}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Write total amount of Rx(Order) ?"}
        </DialogTitle>
        <DialogContent>
       
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Total Amount"
          type="email"
          fullWidth
          variant="standard"
          value={total} 
          onChange={handleChange}
        />
        
      </DialogContent>
        <DialogActions>
            <Button onClick={handleClose3}>Discard</Button>
            <Button  onClick={handledone3} autoFocus>
              Done
            </Button>
          </DialogActions>
        </Dialog>
        <TableCell ><Button variant="contained" color="success" endIcon={<LocalShippingIcon />} onClick={handleClickOpen1}>
        Delivery
      </Button>
      <Dialog
                        open={open1}
                        onClose={handleClose1}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Confirm this Rx delivery ?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose1}>Disagree</Button>
                            <Button  onClick={handledone1} autoFocus>
                              Agree
                            </Button>
                          </DialogActions>
                        </Dialog>
      </TableCell>
        <TableCell ><Button variant="contained" color="error" endIcon={<CancelIcon />} onClick={handleClickOpen2}>
        Cancel
      </Button>
      <Dialog
      open={open2}
      onClose={handleClose2}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Want to cancel this Rx ?"}
      </DialogTitle>
      <DialogActions>
          <Button onClick={handleClose2}>Disagree</Button>
          <Button  onClick={handledone2} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      </TableCell>
      
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
              <a onClick={() => handleOpen(mobile)} style={{cursor:'pointer'}}> 
              User Details
              </a>
              <div id="error1"><strong>{messagee}</strong></div>
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
              <a onClick={() => handleOpenRx(row._id)} style={{cursor:'pointer'}}> 
              Rx Details
              </a>
              </Typography>
              
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
//row2 == delivered

function Row2(props) {
  const { row } = props;
  const { rxStatus } = props;
  const { cancel } = props;
 
  const [open1, setOpen1] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  
  const handleClose1 = () => {
    setOpen1(false);
  };
  let history = useHistory();
  const handledone1 = () =>{

    axios
    .put(`https://devhomoeoback.herokuapp.com/admin/rx/${row._id}/notDelivered`)
    .then(res => {
      setOpen1(false);
      history.push('/adminrx/pending');
    })
    .catch(err => {
        console.log(err)
    })

  };
  const handleClickOpen1 = () => {
    setOpen1(true);
    
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handledone2 = () =>{
    axios
    .put(`https://devhomoeoback.herokuapp.com/admin/rx/${row._id}/cancel`)
    .then(res => {
      setOpen2(false);
      history.push('/adminrx/cancelled');
    })
    .catch(err => {
        console.log(err)
    })
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
    
  };
  const [total,settotal] = useState(row.amount);
  const [mobile,setmobile] = useState();
 
  const [messagee,setmessagee] = useState("");
  const handleOpen = (mobile) =>{
    if (typeof mobile === 'undefined') {
      setmessagee("User doesn't exist")
    }
    else{
    history.push(`/userdetail/${mobile}`);
    }
  }
const handleOpenRx = (mobile) =>{
    history.push(`/rxpage/${mobile}`);
  }
  useEffect(() => {
    
    axios
    .get(`https://devhomoeoback.herokuapp.com/user/${row.user}/details`)
    .then(res => {
console.log(res)
setmobile(res.data.mobile)
console.log(res.data);

    })
    .catch(err => {
        console.log(err)
    })
   
}, [])
  
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { brxBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell >₹ {total}.00</TableCell>
        <TableCell ><Button variant="contained" color="error" endIcon={<LocalShippingIcon />} onClick={handleClickOpen1}>
        Undo Delivery
      </Button>
      <Dialog
                        open={open1}
                        onClose={handleClose1}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Confirm this Rx is not delivered ?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose1}>Disagree</Button>
                            <Button  onClick={handledone1} autoFocus>
                              Agree
                            </Button>
                          </DialogActions>
                        </Dialog>
      </TableCell>
        <TableCell ><Button variant="contained" color="error" endIcon={<CancelIcon />} onClick={handleClickOpen2}>
        Cancel
      </Button>
      <Dialog
      open={open2}
      onClose={handleClose2}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Want to cancel this Rx ?"}
      </DialogTitle>
      <DialogActions>
          <Button onClick={handleClose2}>Disagree</Button>
          <Button  onClick={handledone2} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      </TableCell>
      
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
              <a onClick={() => handleOpen(mobile)} style={{cursor:'pointer'}}> 
              User Details
              </a>
              <div id="error1"><strong>{messagee}</strong></div>
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
              <a onClick={() => handleOpenRx(row._id)} style={{cursor:'pointer'}}> 
              Rx Details
              </a>
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// row3 == cancelled

function Row3(props) {
  const { row } = props;
  const { rxStatus } = props;
  const { cancel } = props;
 
  const [open1, setOpen1] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
 
  let history = useHistory();
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handledone1 = () =>{
    setOpen1(false);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
    
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handledone2 = () =>{
    axios
    .put(`https://devhomoeoback.herokuapp.com/admin/rx/${row._id}/undoCancel`)
    .then(res => {
      setOpen2(false);
      history.push('/adminrx');
    })
    .catch(err => {
        console.log(err)
    })
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
    
  };
  const [messagee,setmessagee] = useState("");
const handleOpen = (mobile) =>{
  if (typeof mobile === 'undefined') {
    setmessagee("User doesn't exist")
  }
  else{
  history.push(`/userdetail/${mobile}`);
  }
}
  const handleOpenRx = (mobile) =>{
    history.push(`/rxpage/${mobile}`);
  }
  const [mobile,setmobile] = useState();
  const [total,settotal] = useState(row.amount);
  useEffect(() => {
    
    axios
    .get(`https://devhomoeoback.herokuapp.com/user/${row.user}/details`)
    .then(res => {
console.log(res)
setmobile(res.data.mobile)
console.log(res.data);

    })
    .catch(err => {
        console.log(err)
    })
   
}, [])
  
  
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { brxBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell >₹ {total}.00</TableCell>
        <TableCell ><Button variant="contained" color="success" endIcon={<LocalShippingIcon />} onClick={handleClickOpen1} disabled>
        Delivered
      </Button>
      <Dialog
                        open={open1}
                        onClose={handleClose1}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Confirm this delivery ?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose1}>Disagree</Button>
                            <Button  onClick={handledone1} autoFocus>
                              Agree
                            </Button>
                          </DialogActions>
                        </Dialog>
      </TableCell>
        <TableCell ><Button variant="contained" color="success" endIcon={<CheckCircleIcon />} onClick={handleClickOpen2}>
        Undo Cancel
      </Button>
      <Dialog
      open={open2}
      onClose={handleClose2}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Want to uncancel this Rx again?"}
      </DialogTitle>
      <DialogActions>
          <Button onClick={handleClose2}>Disagree</Button>
          <Button  onClick={handledone2} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      </TableCell>
      
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
              <a onClick={() => handleOpen(mobile)} style={{cursor:'pointer'}}> 
                User Details
                </a>
                <div id="error1"><strong>{messagee}</strong></div>
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
              <a onClick={() => handleOpenRx(row._id)} style={{cursor:'pointer'}}> 
              Rx Details
              </a>
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function CollapsibleTable2({rxStatus,cancel}) {
  
  const [rx,setrx]=useState([]);
  
  useEffect(() => {
    axios
        .get(`https://devhomoeoback.herokuapp.com/admin/rxes`)
        .then(res => {
    console.log(res)
    setrx(res.data)
    console.log(res.data);
    
        })
        .catch(err => {
            console.log(err)
        })
}, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
          <TableCell id="cellme">Details</TableCell>
            <TableCell id="cellme">Date</TableCell>
            <TableCell id="cellme">Amount</TableCell>
            
           
            <TableCell id="cellme">Status</TableCell>
            <TableCell id="cellme">
            Cancellation</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rx.map((row) => (
            rxStatus===row.rxStatus&&cancel===row.cancel&&rxStatus===false&&cancel===false?
              <Row rxStatus={rxStatus} cancel={cancel}  row={row} />:
             rxStatus===row.rxStatus&&cancel===row.cancel&&rxStatus===true&&cancel===false?
             <Row2 rxStatus={rxStatus} cancel={cancel}  row={row} />:
             cancel===row.cancel&&cancel===true?
             <Row3 rxStatus={rxStatus} cancel={cancel}  row={row} />:
             null
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
