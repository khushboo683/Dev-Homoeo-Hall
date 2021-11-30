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
import './Table.css'

// row === pending
function Row(props) {
  const { row } = props;
  const { orderStatus } = props;
  const { cancel } = props;
  const [message,setmessage] =useState(false);
  const [message2,setmessage2] =useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const cart=row.cart;
  const handleClose1 = () => {
    setOpen1(false);
  };
  let history = useHistory();
  const handledone1 = () =>{
    
    axios
        .put(`https://devhomoeoback.herokuapp.com/admin/orders/${row._id}/delivered`)
        .then(res => {
          setOpen1(false);
          history.push('/adminorders/delivered');
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
    .put(`https://devhomoeoback.herokuapp.com/admin/orders/${row._id}/cancel`)
    .then(res => {
      setOpen2(false);
      history.push('/adminorders/cancelled');
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
  const [total,settotal] = useState();
  const [mobile,setmobile] = useState();
  useEffect(() => {
    var sum=0;
    cart.map((item)=>{
      sum=sum+item.price*item.qty;
    })
   
    settotal(sum);
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
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
        {"Want to cancel this order ?"}
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
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell >Price (per piece)</TableCell>
                    <TableCell >Total price (₹)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {row.cart.map((historyRow) => (
                  <TableRow >
                    <TableCell component="th" scope="row">
                      {historyRow.name}
                    </TableCell>
                    <TableCell>{historyRow.qty}</TableCell>
                    <TableCell >{historyRow.price} </TableCell>
                    <TableCell >{historyRow.price*historyRow.qty} </TableCell>
                    
                  </TableRow>
                ))}
                </TableBody>
              </Table>
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
  const { orderStatus } = props;
  const { cancel } = props;
 
  const [open1, setOpen1] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const cart=row.cart;
  const handleClose1 = () => {
    setOpen1(false);
  };
  let history = useHistory();
  const handledone1 = () =>{

    axios
    .put(`https://devhomoeoback.herokuapp.com/admin/orders/${row._id}/notDelivered`)
    .then(res => {
      setOpen1(false);
      history.push('/adminorders/pending');
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
    .put(`https://devhomoeoback.herokuapp.com/admin/orders/${row._id}/cancel`)
    .then(res => {
      setOpen2(false);
      history.push('/adminorders/cancelled');
    })
    .catch(err => {
        console.log(err)
    })
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
    
  };
  const [total,settotal] = useState();
  const [mobile,setmobile] = useState();
  useEffect(() => {
    var sum=0;
    cart.map((item)=>{
      sum=sum+item.price*item.qty;
    })
   
    settotal(sum);
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
const [messagee,setmessagee] = useState("");
const handleOpen = (mobile) =>{
  if (typeof mobile === 'undefined') {
    setmessagee("User doesn't exist")
  }
  else{
  history.push(`/userdetail/${mobile}`);
  }
}
  
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                          {"Confirm this order is not delivered ?"}
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
        {"Want to cancel this order ?"}
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
              <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell >Price (per piece)</TableCell>
                  <TableCell >Total price (₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {row.cart.map((historyRow) => (
                <TableRow >
                  <TableCell component="th" scope="row">
                    {historyRow.name}
                  </TableCell>
                  <TableCell>{historyRow.qty}</TableCell>
                  <TableCell >{historyRow.price} </TableCell>
                  <TableCell >{historyRow.price*historyRow.qty} </TableCell>
                  
                </TableRow>
              ))}
              </TableBody>
            </Table>
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
  const { orderStatus } = props;
  const { cancel } = props;
 
  const [open1, setOpen1] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const cart=row.cart;
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
    .put(`https://devhomoeoback.herokuapp.com/admin/orders/${row._id}/undoCancel`)
    .then(res => {
      setOpen2(false);
      history.push('/adminorders');
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
  const [total,settotal] = useState();
  useEffect(() => {
    var sum=0;
    cart.map((item)=>{
      sum=sum+item.price*item.qty;
    })
   
    settotal(sum);
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
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
        {"Want to uncancel this order again?"}
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
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell >Price (per piece)</TableCell>
                    <TableCell >Total price (₹)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {row.cart.map((historyRow) => (
                  <TableRow >
                    <TableCell component="th" scope="row">
                      {historyRow.name}
                    </TableCell>
                    <TableCell>{historyRow.qty}</TableCell>
                    <TableCell >{historyRow.price} </TableCell>
                    <TableCell >{historyRow.price*historyRow.qty} </TableCell>
                    
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function CollapsibleTable({orderStatus,cancel}) {
  
  const [order,setorder]=useState([]);
  useEffect(() => {
    axios
        .get(`https://devhomoeoback.herokuapp.com/admin/orders`)
        .then(res => {
    console.log(res)
    setorder(res.data)
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
          {order.map((row) => (
            orderStatus===row.orderStatus&&cancel===row.cancel&&orderStatus===false&&cancel===false?
              <Row orderStatus={orderStatus} cancel={cancel}  row={row} />:
             orderStatus===row.orderStatus&&cancel===row.cancel&&orderStatus===true&&cancel===false?
             <Row2 orderStatus={orderStatus} cancel={cancel}  row={row} />:
             cancel===row.cancel&&cancel===true?
             <Row3 orderStatus={orderStatus} cancel={cancel}  row={row} />:
             null
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
