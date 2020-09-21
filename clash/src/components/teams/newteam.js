import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(10),
  },
  formCrd: {
    padding: theme.spacing(10),
  },
}));

const NewTeam = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Card>
        <form className={classes.formCrd}>
          <TextField id="name" label="Nombre del Equipo" variant="outlined" />
          <TextField
            id="description"
            label="Descripción"
            variant="outlined"
            rowsMax={4}
            multiline
          />
        </form>
      </Card>
    </Container>
  );
};

export default NewTeam;
