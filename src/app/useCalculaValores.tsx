import { useState, useEffect } from "react";
import { IExpense } from "./backend";

interface CategoriaSoma {
  total: number;
  objetos: IExpense[];
}

interface HookResult {
  categoriasSoma: { [categoria: string]: CategoriaSoma };
  somaTotal: number;
}

function useCalculaValores(objetos: IExpense[]): HookResult {
  const [categoriasSoma, setCategoriasSoma] = useState<{
    [categoria: string]: CategoriaSoma;
  }>({});
  const [somaTotal, setSomaTotal] = useState(0);

  useEffect(() => {
    const calcularSomaPorCategoria = () => {
      const categorias: { [categoria: string]: CategoriaSoma } = {};
      let totalGeral = 0;

      objetos.forEach((objeto) => {
        const { categoria, valor } = objeto;

        if (!categorias[categoria]) {
          categorias[categoria] = {
            total: 0,
            objetos: [],
          };
        }

        categorias[categoria].total += valor;
        categorias[categoria].objetos.push(objeto);
        totalGeral += valor;
      });

      setSomaTotal(totalGeral);
      return categorias;
    };

    const result = calcularSomaPorCategoria();
    setCategoriasSoma(result);
  }, [objetos]);

  return { categoriasSoma, somaTotal };
}

export default useCalculaValores;
