import React from 'react'

interface ButtonType {
    label: string
    onClick?: () => void
}

const ButtonAdd = ({ label, onClick }: ButtonType) => {
  return (
    <button 
    className='flex justify-center items-center gap-1 p-2 bg-[#f05123] text-white font-bold hover:bg-[#d96112] transition duration-200'
    onClick={onClick}
    >
      + {label}
    </button>
  )
}

export default ButtonAdd
