import React,{useState,useEffect,useRef} from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import './Table.css'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#2596be',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  //Search bar
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '9ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Product List',
  },
  {
    id: 'Edit',
    numeric: true,
    disablePadding: false,
    label: 'Edit',
  },
  {
    id: 'Delete',
    numeric: true,
    disablePadding: false,
    label: 'Delete',
  }
];

function EnhancedTableHead(props) {
    
    const inputEl = useRef("");
    
  
  const getSearchTerm = () => {
      
    props.searchKeyword(inputEl.current.value);
  };
  return (
    
   
    <TableHead >
    
      <TableRow >
      
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={ 'center'}
           
            color="secondary"
          >
            
              {headCell.label}
              
          </StyledTableCell>
        ))}
        <StyledTableCell >
        <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
        inputRef={inputEl}
        type="text"
          placeholder="Search.."
          value={props.term}
          onChange={getSearchTerm}
         
        />
      </Search>
        </StyledTableCell>
      </TableRow>
      
    </TableHead>
   
  );
}

export default function EnhancedTable({setedititem}) {
  //app.js
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [deleteid,setdeleteid] = useState("");
  const [showprod,setshowprod]=useState("");
  const [rows,setrows]=useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [open, setOpen] = React.useState(false);
    var history = useHistory();
  
  const handleDialogOpen = (product) => {
    history.push(`/product/admin/${product.name}/${product._id}`);
  };
    const handleClickOpen = (name,idd) => {
      setOpen(true);
      setshowprod(name);
      setdeleteid(idd);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  useEffect(() => {
    axios
        .get(`https://devhomoeoback.herokuapp.com/admin/products`)
        .then(res => {
    console.log(res)
    setrows(res.data)
    console.log(res.data);
        })
        .catch(err => {
            console.log(err)
        })
}, [])

const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    console.log(searchTerm);
    if (searchTerm !== "") {
      const newProductList = rows.filter((row) => {
          console.log(Object.values(row.name).join("").toLowerCase());
          console.log(searchTerm.toLowerCase());
        return Object.values(row.name)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newProductList);
      console.log(searchResults);
    } else {
      setSearchResults(rows);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  //delete
  const deleteproduct =async (id) =>{
    console.log(id);
    const response= await fetch(`https://devhomoeoback.herokuapp.com/admin/products/${id}`, {
        method:"DELETE"
    });
    const newproductlist = rows.filter((oldrow)=>{
      return oldrow._id !== id;
    });
    setrows(newproductlist);
    setOpen(false);
  };
  //edit
  const editproduct = (item) =>{
    console.log(item);
    setedititem(item);
    history.push(`/editproduct/${item.name}`);
  };
  //deletesearch
  const deletesearchproduct =async (id) =>{
    console.log(id);
    const response= await fetch(`https://devhomoeoback.herokuapp.com/admin/products/${id}`, {
        method:"DELETE"
    });
    const newproductlist = searchResults.filter((oldrow)=>{
      return oldrow._id !== id;
    });
    setSearchResults(newproductlist);
    const newproductlist2 = rows.filter((oldrow)=>{
      return oldrow._id !== id;
    });
    setrows(newproductlist2);
    setOpen(false);
  };
  //editsearch
  const editsearchproduct = (id) =>{
    console.log(id);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        
        <TableContainer>
          <Table 
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              term={searchTerm}
             searchKeyword={searchHandler}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {searchTerm.length < 1 ? rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      
                      key={row.name}
                      selected={isItemSelected}
                    >
                      
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                       
                      >
                      <a onClick={() => handleDialogOpen(row)} style={{cursor:'pointer'}}>
                        {row.name}
                        </a>
                        <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Do you want to delete "+showprod+" ?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button  onClick={() => deleteproduct(deleteid)} autoFocus>
                              Agree
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                      <TableCell align="center"> <a onClick={() => editproduct(row)} style={{cursor:'pointer'}}><Fab color="primary" aria-label="add"><EditIcon /></Fab></a></TableCell>
                     <TableCell align="center">  <a onClick={() =>handleClickOpen(row.name,row._id)} style={{cursor:'pointer'}}><Fab color="error" aria-label="delete"> <DeleteIcon /></Fab></a> </TableCell>
                      <TableCell></TableCell>
                     
                    </TableRow>
                  );
                }) :searchResults.length>0? searchResults
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      
                      key={row.name}
                      selected={isItemSelected}
                    >
                      
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                     
                      >
                      <a onClick={() => handleDialogOpen(row)} style={{cursor:'pointer'}}>
                      {row.name}
                      </a>
                      </TableCell>
                      <TableCell align="center"> <a onClick={() => editproduct(row)} style={{cursor:'pointer'}}><Fab color="primary" aria-label="add"><EditIcon /></Fab></a></TableCell>
                      <TableCell align="center">  <a onClick={() => handleClickOpen(row.name,row._id)} style={{cursor:'pointer'}}><Fab color="error" aria-label="delete"> <DeleteIcon /></Fab></a> </TableCell>
                      <TableCell></TableCell>
                      <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                      {"Do you want to delete "+showprod+" ?"}
                      </DialogTitle>
                      <DialogActions>
                          <Button onClick={handleClose}>Disagree</Button>
                          <Button  onClick={() => deletesearchproduct(deleteid)} autoFocus>
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableRow>
                  );
                }) 
                : <div id="notavailable">Not available</div>}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    
    </Box>
  );
}
