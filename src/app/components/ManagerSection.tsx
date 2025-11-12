"use client";

import React, { useEffect, useState } from "react";
import ButtonAdd from "./ButtonAdd";
import ManagerTable from "./ManagerTable";
import DemandModal from "./DemandModal";
import { Demand } from "../types/types";

const ManagerSection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [demands, setDemands] = useState<Demand[]>([]);
  const [editingDemand, setEditingDemand] = useState<Demand | null>(null);

  const fetchDemands = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/demands");
      const data = await response.json();
      setDemands(data);
    } catch (err) {
      console.error(`Erro ao buscar demandas: ${err}`);
    }
  };

  useEffect(() => {
    fetchDemands();
  }, []);

  const handleSaveSuccess = () => {
    setIsModalOpen(false);
    setEditingDemand(null);
    fetchDemands();
  };

  const handleDeleteDemand = async (id: number) => {
    if (window.confirm("Tem certeza que deseja remover esta demanda?")) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/demands/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchDemands();
        } else {
          console.error("Falha ao remover demanda");
        }
      } catch (error) {
        console.error("Erro de rede:", error);
      }
    }
  };

  const handleEditClick = (demand: Demand) => {
    setEditingDemand(demand); // what we will edit
    setIsModalOpen(true); // open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDemand(null);
  };

  return (
    <article className="flex flex-col gap-4 h-[40rem] md:mt-[5rem] lg:mt-0 w-[80%]">
      <h1 className="text-black text-2xl font-bold uppercase">
        Demanda de Produção de latinhas
      </h1>
      <div>
        <ButtonAdd onClick={() => setIsModalOpen(true)} label="Adicionar" />
      </div>
      <ManagerTable
        onEdit={handleEditClick}
        onDelete={handleDeleteDemand}
        demands={demands}
      />
      <DemandModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDemandSaved={handleSaveSuccess}
        demandToEdit={editingDemand}
      />
    </article>
  );
};

export default ManagerSection;
