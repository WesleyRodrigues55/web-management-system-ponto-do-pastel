interface ButtonProps {
  colorButton?: string;
  texto: any;
  tamanho?: 'sm' | 'md' | 'lg';
  onClick: (e: any) => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ colorButton, texto, tamanho, onClick, type} : ButtonProps) {

  let tamanhoClasses = '';
  if (tamanho === 'sm') {
    tamanhoClasses = 'py-1 px-2 text-sm';
  } else if (tamanho === 'lg') {
    tamanhoClasses = 'py-3 px-6 text-lg';
  } else {
    tamanhoClasses = 'py-2 px-4 text-base';
  }

  const botaoClasses = `w-full flex justify-center border border-transparent rounded-md shadow-sm font-medium text-white ${colorButton} focus:outline-none focus:ring-2 focus:ring-offset-2 ${tamanhoClasses}`;

  return (
    <button type={type} className={botaoClasses} onClick={onClick}>
      {texto}
    </button>
  )
}
