"use client";

import { useAuthContext } from "@/contexts/auth/authContext";
import { AuthenticationRequestDTO } from "@/entities/money-planner-api";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

const Page = () => {
  const { handleLogin } = useAuthContext();
  const { handleSubmit, register } = useForm<AuthenticationRequestDTO>();

  const onSubmit: SubmitHandler<AuthenticationRequestDTO> = (data) => {
    handleLogin(data);
  };

  return (
    <Stack
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      marginX="auto"
      padding={2}
      height="100vh"
      gap={4}
    >
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <img src="/favicon.svg" alt="logo" className="w-8 h-8" />
        <Typography fontWeight="bold" fontSize="xx-large">
          Nosso Planner
        </Typography>
      </Stack>
      <Paper sx={{ padding: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={4}>
            <Typography fontWeight="bold" fontSize="x-large">
              Entre na sua conta
            </Typography>
            <TextField
              type="email"
              required
              label="Email"
              fullWidth
              {...register("email")}
            ></TextField>
            <TextField
              type="password"
              required
              label="Senha"
              fullWidth
              {...register("password")}
            ></TextField>
            <Stack display="flex" flexDirection="row" gap={2}>
              <FormControlLabel label="Lembrar de mim" control={<Checkbox />} />
              <Button>Esqueci a senha</Button>
            </Stack>
            <Button type="submit" variant="contained">
              Entrar
            </Button>
          </Box>
        </form>
      </Paper>
    </Stack>
  );
};

export default Page;
