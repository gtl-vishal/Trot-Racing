import React, { useState, useEffect, SyntheticEvent, FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { authToken } from "../../Store/actions";
import { useAppDispatch, useAppSelector } from "../../Store/react-redux-hook";
import { validateEmail, INVALID_EMAIL, LOGIN, PASSWORD, ROUTES } from "../../helpers";
import { InitialStateType, LoginParamType } from "../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      margin: 2,
      marginBottom: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: "center",
      background: "#212121",
      color: "#fff",
    },
    card: {
      marginTop: "50%",
    },
  })
);

const Login: FC = () => {
  // Initialization of Hooks and States
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [helperText, sethelperText] = useState<string>("");
  const [isButtonDisabled, setisButtonDisabled] = useState<boolean>(true);

  //Redux states
  const { login } = useAppSelector((state: InitialStateType) => state);

  //Useffect for (email || password) change to disable Login button
  useEffect(() => {
    if (email.trim() && password.trim()) {
      setisButtonDisabled(false);
    } else {
      setisButtonDisabled(true);
    }
  }, [email, password]);

  //Handle successfull Login or failure Login
  useEffect(() => {
    if (login && login.data?.token) {
      setIsError(false);
      history.push(ROUTES.RACE); // Redirect to race status
    } else if (login && login.data?.error) {
      // Display validation error
      setIsError(true);
      sethelperText(login.data.error);
    }
  }, [login, history]);

  //On submit Login form
  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      const isValidEmail = validateEmail(email); // Validate Email format

      if (!isValidEmail) {
        //Display validation error
        setIsError(true);
        sethelperText(INVALID_EMAIL);
      } else {
        //Login API call
        const loginCred: LoginParamType = {
          email,
          password,
        };
        await dispatch(authToken(loginCred));
      }
    }
  };

  return (
    <div id="login-wrapper">
      <form id="loginForm" className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title={LOGIN} />
          <CardContent>
            {/* User Email */}
            <div>
              <TextField
                error={isError}
                fullWidth
                id="email"
                type="email"
                label={LOGIN}
                placeholder={LOGIN}
                margin="normal"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              {/* User Password */}
              <TextField
                error={isError}
                fullWidth
                id="password"
                type="password"
                label={PASSWORD}
                placeholder={PASSWORD}
                margin="normal"
                value={password}
                helperText={helperText}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="large" color="secondary" className={classes.loginBtn} onClick={handleLogin} disabled={isButtonDisabled}>
              {LOGIN}
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

export default Login;
