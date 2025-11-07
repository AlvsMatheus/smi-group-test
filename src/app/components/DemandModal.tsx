import React, { useState, useEffect } from 'react'; 
import { ModalProps, Demand } from '../types/types';


const DemandModal = ({ isOpen, onClose, onDemandSaved, demandToEdit }: ModalProps) => {


  const [periodo, setPeriodo] = useState('');
  const [skus, setSkus] = useState(0);
  const [totalPlan, setTotalPlan] = useState(0);
  const [totalProd, setTotalProd] = useState(0); 
  const [status, setStatus] = useState('PLANEJAMENTO');

  //refatch always when theres a change on demandToEdit
  useEffect(() => {
    
    if (isOpen) {
      if (demandToEdit) {
       
        setPeriodo(demandToEdit.periodo);
        setSkus(demandToEdit.skus);
        setTotalPlan(demandToEdit.totalPlan);
        setTotalProd(demandToEdit.totalProd);
        setStatus(demandToEdit.status);
      } else {
        
        setPeriodo('');
        setSkus(0);
        setTotalPlan(0);
        setTotalProd(0); 
        setStatus('PLANEJAMENTO');
      }
    }
  }, [demandToEdit, isOpen]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
    const demandData = {
      periodo,
      skus,
      totalPlan,
      totalProd, 
      status,
    };
    //edit mode or create mode
    try {
      let response;
      
      if (demandToEdit) {
       
        response = await fetch(`http://localhost:4000/api/demands/${demandToEdit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(demandData),
        });
      } else {
      
        response = await fetch('http://localhost:4000/api/demands', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(demandData),
        });
      }

      if (response.ok) {
        onDemandSaved(); 
      } else {
        console.error('Falha ao salvar demanda');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  if (!isOpen) {
    return null;
  }

  // 6. TÍTULO DINÂMICO E NOVO CAMPO
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <form onSubmit={handleSubmit}>
          
          {/* O título agora muda dependendo do modo */}
          <h2 className="text-2xl font-bold mb-4 text-black">
            {demandToEdit ? "Editar Demanda" : "Adicionar Nova Demanda"}
          </h2>

          {/* Campo Período */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Período</label>
            <input
              type="text"
              placeholder="Ex: 01/01/2025 - 07/01/2025"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              required
            />
          </div>

          {/* Campo SKUs */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">SKUs</label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              value={skus}
              onChange={(e) => setSkus(Number(e.target.value))}
              required
            />
          </div>

          {/* Campo Total Planejado */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Total Planejado (Tons)</label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              value={totalPlan}
              onChange={(e) => setTotalPlan(Number(e.target.value))}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Total Produzido (Tons)</label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              value={totalProd}
              onChange={(e) => setTotalProd(Number(e.target.value))}
              required
            />
          </div>

          {/* Campo Status */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="PLANEJAMENTO">Planejamento</option>
              <option value="EM ANDAMENTO">Em Andamento</option>
              <option value="CONCLUIDO">Concluído</option> 
            </select>
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-2">
             <button
              type="button" 
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#f05123] hover:bg-[#d96112] text-white font-bold py-2 px-4 rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DemandModal;