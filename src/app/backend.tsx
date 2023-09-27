export interface IUser {
  nome: string;
  email: string;
}

export interface IExpense {
    length: number;
    map: any;
    id: number;
    descricao: string;
    categoria: string;
    valor: number;
    mes: string;
    dia: string;
  }

export function apiGetAllDB(date: string): Promise<IExpense[]> {
    return fetch(`http://localhost:3001/despesas?mes=${date}&_sort=dia`, {
      credentials: "include",
    }).then(handleResponse);
  }

export async function getUserEndpoint(): Promise<IUser> {
  const resp = await fetch(`http://localhost:3001/sessao/usuario`, {
    credentials: "include",
  });
  return handleResponse(resp);
}

export async function signInEndpoint(
  email: string,
  senha: string
): Promise<IUser> {
  const resp = await fetch(`http://localhost:3001/sessao/criar`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });
  return handleResponse(resp);
}

export async function signOutEndpoint(): Promise<IUser> {
  const resp = await fetch(`http://localhost:3001/sessao/finalizar`, {
    credentials: "include",
    method: "POST",
  });
  return handleResponse(resp);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
