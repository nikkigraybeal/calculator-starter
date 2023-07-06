import Grid2 from "@mui/material/Unstable_Grid2";
import { Operation } from "../enums/Operation";
import {
  Box,
  Paper,
  TextField,
  FormControl,
  NativeSelect,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { OutlinedInput } from "@mui/material";
import axios from "axios";

import { useState, useRef, useEffect, FormEvent, MouseEvent } from "react";

const Calculator = () => {
  const [operation, setOperation] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const firstRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const welcomeMessage = "Calculator is ready!";

  useEffect(() => {
    setResult(welcomeMessage);
  }, []);

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = {
      operation: operation,
      first: firstRef.current!.value,
      second: secondRef.current!.value,
    };

    axios
      .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
      .then((res) => {
        setResult(res.data.result);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOperation("");
    setResult(welcomeMessage);
    firstRef.current!.value = "";
    secondRef.current!.value = "";
  };

  const operationOptions = {
    [Operation.ADD]: "+",
    [Operation.SUBTRACT]: "-",
    [Operation.MULTIPLY]: "*",
    [Operation.DIVIDE]: "/",
  }

  return (
    <form id="calculator-form" onSubmit={handleCalculate}>
      <Grid2 container spacing={1}>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              id="first"
              label="First Number"
              variant="outlined"
              inputRef={firstRef}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <NativeSelect
              input={<OutlinedInput />}
              value={operation}
              inputProps={{
                name: "operation",
                id: "operation",
              }}
              onChange={e => setOperation(e.target.value)}
            >
              <option value="">Op</option>
              {Object.entries(operationOptions).map(([opName, opSymbol], idx) => {
                return (
                  <option key={idx} value={opName}>{opSymbol}</option>
                )
              })}
            </NativeSelect>
          </FormControl>
        </Grid2>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              id="second"
              label="Second Number"
              variant="outlined"
              inputRef={secondRef}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={10}>
          <FormControl fullWidth>
            <Button variant="contained" type="submit">
              Calculate
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <Divider />
        </Grid2>
        <Grid2 xs={12}>
          <Box>
            <Paper>
              <Typography align="center" variant="h3" gutterBottom>
                {result}
              </Typography>
            </Paper>
          </Box>
        </Grid2>
      </Grid2>
    </form>
  );
};
export default Calculator;




























