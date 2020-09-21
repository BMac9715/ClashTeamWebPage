import React from "react";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontSize: 18,
    },
    body: {
      fontSize: 16,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  function createData(team, journey, validity) {
    return { team, journey, validity };
  }
  
  const rows = [
    createData('Team Quesito', "06 septiembre", 1),
    createData('Team Kinal', "16 agosto", 0, 37),
    createData('Kohaku', "01 julio", 0),
    createData('LED', "20 julio", 0),
    createData('GT', "21 junio", 0),
  ];
  
  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 700,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginTop: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    btnedit:{
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      backgroundColor: theme.palette.success.main,
    },
    btndelete:{
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.common.white,
    },
  }));
 
const TeamsMain = () => {

    const classes = useStyles();

    return (
      <main className={classes.content}>
        <Typography variant="h5">Mis Equipos</Typography>

        <Button 
          variant="contained" 
          size="large"
          color="primary" 
          className={classes.button}
          startIcon={<AddIcon />}
        >
        CREAR
        </Button>
        
        <TableContainer component={Paper}>
            <Table color="primary-ligth" className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Equipo</StyledTableCell>
                  <StyledTableCell align="center">Jornada</StyledTableCell>
                  <StyledTableCell align="center">Vigencia</StyledTableCell>
                  <StyledTableCell align="center">Acciones</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.team}>
                    <StyledTableCell align="center">{row.team}</StyledTableCell>
                    <StyledTableCell align="center">{row.journey}</StyledTableCell>
                    <StyledTableCell align="center">{row.validity}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="contained" color="success" className={classes.btnedit}>Editar</Button>
                      <Button variant="contained" color="error" className={classes.btndelete} size="" startIcon={<DeleteIcon />}>Eliminar</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>      
      </main>    
    );
};

export default TeamsMain;