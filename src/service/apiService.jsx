import { read } from "./httpService";

export async function apiGetAllDB(month) {
  const allDB = await read(`despesas?mes=${month}&_sort=dia`);
  return allDB;
}
