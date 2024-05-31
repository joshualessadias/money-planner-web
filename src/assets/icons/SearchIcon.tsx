import { twMerge } from 'tailwind-merge';

interface SearchIconProps {
  className?: string;
}

const SearchIcon = ({ className }: SearchIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      id='Capa_1'
      x='0px'
      y='0px'
      viewBox='0 1 24 18'
      width='24'
      height='24'
      className={twMerge('h-20 w-20', className)}
      fill='none'
    >
      <g>
        <path
          d='M7.7368 14.4736C11.4574 14.4736 14.4736 11.4574 14.4736 7.7368C14.4736 4.01617 11.4574 1 7.7368 1C4.01617 1 1 4.01617 1 7.7368C1 11.4574 4.01617 14.4736 7.7368 14.4736Z'
          stroke='--dark-gray'
          strokeWidth={1.5}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.7896 12.7891L17 16.9996'
          stroke='--dark-gray'
          strokeWidth={1.5}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
};

export default SearchIcon;
