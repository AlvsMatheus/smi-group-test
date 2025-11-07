// ManagerSection.tsx

export interface Demand {
  id: number;
  periodo: string;
  skus: number;
  totalPlan: number;
  totalProd: number;
  status: string;
}

// ManagerTable.tsx

export interface TableProps {
  demands: Demand[];
  onDelete: (id: number) => void;
  onEdit: (demand: Demand) => void; 
}

// DemandModal.tsx

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDemandSaved: () => void; 
  demandToEdit: Demand | null; 
}

// ButtonAdd.tsx

export interface ButtonType {
    label: string
    onClick?: () => void
}