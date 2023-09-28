import { ChangeEvent, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory, useParams } from "react-router-dom";
import { IExpense, apiGetAllDB } from "./backend";
import { UserMenu } from "./UserMenu";
import useCalculaValores from "./useCalculaValores";

const useStyles = makeStyles({
  formControl: {
    display: "inline-block",
    marginTop: 10,
    marginLeft: 20,
    minWidth: 50,
  },
  selectEmpty: {
    marginTop: 100,
  },
  table: {
    minWidth: 500,
  },
});

export default function TelaDespesas() {
  const classes = useStyles();
  const [year, setYear] = useState<string>("2020");
  const [month, setMonth] = useState<string>("6");
  const years = [2020, 2021];
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const params = useParams<{ yearMonth: string }>();
  const history = useHistory();
  let yearMonth = params.yearMonth;

  function mudaAnoMes(year: string, month: string) {
    yearMonth = `${year}-${month.toString().padStart(2, "0")}`;
    history.push(`/despesas/${yearMonth}`);
  }

  const [expenses, setExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    async function getAllDB() {
      try {
        const backEndAllDB = await apiGetAllDB(
          `${year}-${month.toString().padStart(2, "0")}`
        );
        setExpenses(backEndAllDB);
        mudaAnoMes(year, month);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    getAllDB();
  }, [year, month]);

  const handleChangeYear = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const newValue: string = event.target.value as string;
    setYear(newValue);
    mudaAnoMes(year, month);
  };

  const handleChangeMonth = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const newValue: string = event.target.value as string;
    setMonth(newValue);
    mudaAnoMes(year, month);
  };

  const { categoriasSoma, somaTotal } = useCalculaValores(expenses);

  const [tabelaSelecionada, setTabelaSelecionada] = useState("resumo");

  const handleTabelaSelecionada = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTabelaSelecionada((event.target as HTMLInputElement).value);
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        margin="0 20px"
        alignItems="flex-end"
        padding="0 2rem"
      >
        <h1>Despesas</h1>
        <UserMenu />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Box flex="1">
          <FormControl className={classes.formControl}>
            <InputLabel id="select-year">Ano</InputLabel>
            <Select
              labelId="select-year"
              id="year"
              value={year}
              onChange={handleChangeYear}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-month">Mês</InputLabel>
            <Select
              labelId="select-month"
              id="month"
              value={month}
              onChange={handleChangeMonth}
            >
              {months.map((month, index) => (
                <MenuItem key={month} value={index + 1}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Typography variant="subtitle1" gutterBottom>
          Despesa total: R$ {somaTotal.toLocaleString("pt-BR")}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <FormControl component="fieldset">
          <RadioGroup
            row
            name="tabela"
            value={tabelaSelecionada}
            onChange={handleTabelaSelecionada}
          >
            <FormControlLabel
              value="resumo"
              control={<Radio />}
              label="RESUMO"
            />
            <FormControlLabel
              value="detalhes"
              control={<Radio />}
              label="DETALHES"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="Tabela de despesas"
          >
            <TableHead>
              {tabelaSelecionada === "resumo" ? (
                <TableRow>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Valor (R$)</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell>Despesa</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Dia</TableCell>
                  <TableCell align="right">Valor (R$)</TableCell>
                </TableRow>
              )}
            </TableHead>
            {expenses && expenses.length > 0 ? (
              tabelaSelecionada === "resumo" ? (
                <TableBody>
                  {Object.keys(categoriasSoma).map((categoria) => (
                    <TableRow key={categoria}>
                      <TableCell>{categoria}</TableCell>
                      <TableCell>
                        {categoriasSoma[categoria].total.toLocaleString(
                          "pt-BR"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {expenses.map((row: IExpense) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.descricao}
                      </TableCell>
                      <TableCell>{row.categoria}</TableCell>
                      <TableCell>{row.dia}</TableCell>
                      <TableCell align="right">
                        {row.valor.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )
            ) : (
              <caption>Nenhum dado de despesa disponível.</caption>
            )}
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
