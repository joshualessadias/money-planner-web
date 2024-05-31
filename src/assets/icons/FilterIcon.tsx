import { twMerge } from 'tailwind-merge';

interface FilterIconProps {
  className?: string;
}

const FilterIcon = ({ className }: FilterIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      id='Capa_1'
      x='0px'
      y='0px'
      viewBox='0 -4 24 18'
      width='24'
      height='24'
      className={twMerge('h-20 w-20', className)}
      fill='#ED8020'
    >
      <g>
        <rect width='12' height='2' rx='1' />
        <rect x='2' y='3' width='8' height='2' rx='1' />
        <rect x='4' y='6' width='4' height='2' rx='1' />
      </g>
    </svg>
  );
};

export default FilterIcon;
