import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { TableProps } from "../types/types";


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
            <th className="table-title">Editar</th>
            <th className="table-title">Período</th>
            <th className="table-title">SKUs</th>
            <th className="table-title">Total Plan (Tons)</th>
            <th className="table-title">Total Prod. (Tons)</th>
            <th className="table-title">Status</th>
            <th className="table-title">Remover</th>
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
              
              <td className="table-item">{demand.periodo}</td>
              <td className="table-item">{demand.skus}</td>
              <td className="table-item">{demand.totalPlan}</td>
              <td className="table-item">{demand.totalProd}</td>
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