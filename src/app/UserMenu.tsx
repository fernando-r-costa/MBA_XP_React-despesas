import { signOutEndpoint } from "./backend";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthContext } from "./authContext";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  userDetails: {
    marginBottom: "8px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    "& > *": {
      marginBottom: "8px",
    },
  },
});

export function UserMenu() {
  const { user, onSignOut } = useAuthContext();

  const classes = useStyles();

  function signOut() {
    signOutEndpoint();
    onSignOut();
  }

  return (
    <div className={classes.userDetails}>
      <div>
        <div>Olá {user.nome}</div>
      </div>
      <Button variant="outlined" onClick={signOut}>SAIR</Button>
    </div>
  );
}
