import { twMerge } from 'tailwind-merge';

interface ArrowIconProps {
  className?: string;
}

const ArrowIcon = ({ className }: ArrowIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      id='Capa_1'
      x='0px'
      y='0px'
      viewBox='0 0 13 8'
      width='13'
      height='13'
      className={twMerge('h-20 w-20', className)}
      fill='none'
    >
      <g>
        <path strokeWidth={1.5} d='m1 1 4.293 4.293a1 1 0 0 0 1.414 0L11 1' />
      </g>
    </svg>
  );
};

export default ArrowIcon;
