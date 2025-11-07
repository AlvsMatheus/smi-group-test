import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";

// Interface Demand
interface Demand {
  id: number;
  periodo: string;
  skus: number;
  totalPlan: number;
  totalProd: number;
  status: string;
}

// Props da Tabela
interface TableProps {
  demands: Demand[];
  onDelete: (id: number) => void;
  onEdit: (demand: Demand) => void; 
}

const ManagerTable = ({ demands, onDelete, onEdit }: TableProps) => {
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case "PLANEJAMENTO":
        return "bg-[#FAD2E1] text-[#D9006C]";
      case "EM ANDAMENTO":
        return "bg-[#CCEBFB] text-[#0065A1]";
      case "CONCLUIDO":
        return "bg-[#D1FAD0] text-[#056303]";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <article className="w-full h-full bg-white rounded-lg shadow-lg overflow-y-auto">
      <table className="w-full">
      
        <thead className="sticky top-0 bg-gray-100 border-b border-gray-300">
          <tr className="bg-[#d1d1d1]">
            <th className="p-3 text-sm text-center font-semibold text-gray-600 uppercase">Editar</th>
            <th className="p-3 text-sm text-center font-semibold text-gray-600 uppercase">Período</th>
            <th className="p-3 text-sm text-center font-semibold text-gray-600 uppercase">SKUs</th>
            <th className="p-3 text-sm text-center font-semibold text-gray-600 uppercase">Total Plan (Tons)</th>
            <th className="p-3 text-sm text-center font-semibold text-gray-600 uppercase">Total Prod. (Tons)</th>
            <th className="p-3 text-sm text-center font-semibold text-gray-600 uppercase">Status</th>
            <th className="p-3 text-sm text-center font-semibold text-gray-600 uppercase">Remover</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-200 overflow-y-auto">
          
          {demands.map((demand) => (
            <tr key={demand.id} className="hover:bg-gray-50">
            
              <td className="text-center p-3">
                {demand.status !== "CONCLUIDO" ? (
                  <button 
                    onClick={() => onEdit(demand)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaPen/>
                  </button>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              
              <td className="p-3 text-sm text-gray-700">{demand.periodo}</td>
              <td className="p-3 text-sm text-gray-700">{demand.skus}</td>
              <td className="p-3 text-sm text-gray-700">{demand.totalPlan}</td>
              <td className="p-3 text-sm text-gray-700">{demand.totalProd}</td>
              <td className={`p-3 text-center text-xs font-semibold ${getStatusClass(demand.status)}`}>
                {demand.status}
              </td>
            
              <td className="text-center p-3">
                <button 
                  onClick={() => onDelete(demand.id)}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Remover demanda"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default ManagerTable;