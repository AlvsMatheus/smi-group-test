import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// "Our Database"
let demands = [
  {
    id: 1,
    periodo: "23/05/2022 - 29/05/2022",
    skus: 3,
    totalPlan: 5000,
    totalProd: 0,
    status: "PLANEJAMENTO",
  },
  {
    id: 2,
    periodo: "16/05/2022 - 22/05/2022",
    skus: 10,
    totalPlan: 5000,
    totalProd: 2500,
    status: "EM ANDAMENTO",
  },
  {
    id: 3,
    periodo: "09/05/2022 - 15/05/2022",
    skus: 7,
    totalPlan: 5000,
    totalProd: 5000,
    status: "CONCLUIDO",
  },
];

// --- CRUD'S endpoints ---

// [GET] all demands listed
app.get("/api/demands", (req, res) => {
  res.json(demands);
});

// POST Create demand
app.post("/api/demands", (req, res) => {
  const newDemand = {
    id: Date.now(),
    ...req.body,
  };
  demands.push(newDemand);
  res.status(201).json(newDemand);
});

// PUT Edit demand 
app.put("/api/demands/:id", (req, res) => {
  const { id } = req.params;
  const idNumerico = Number(id); 
  const demandData = req.body; 
  const index = demands.findIndex((d) => d.id === idNumerico);
  if (index === -1) {
    return res.status(404).json({ error: "Demanda não encontrada" });
  }

  demands[index] = { ...demands[index], ...demandData };

  res.json(demands[index]);
});


app.delete("/api/demands/:id", (req, res) => {
  const { id } = req.params;
  const idNumerico = Number(id); 

  const demandaExiste = demands.some(d => d.id === idNumerico);
  if (!demandaExiste) {
    return res.status(404).json({ message: "Demanda não encontrada" });
  }

  demands = demands.filter(d => d.id !== idNumerico);
  
  res.status(204).send();
});

// Inicializate
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});