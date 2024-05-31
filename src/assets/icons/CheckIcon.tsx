import { twMerge } from 'tailwind-merge';

interface CheckIconProps {
  className?: string;
}

const CheckIcon = ({ className }: CheckIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      id='Capa_1'
      x='0px'
      y='0px'
      viewBox='0 -1 56 58'
      width='40'
      height='40'
      className={twMerge('h-20 w-20', className)}
      fill='none'
    >
      <g>
        <circle cx='28' cy='28' r='28' fill='#18AA41' />
        <path
          d='M17 27.5L25.5 36L40.5 21'
          stroke='white'
          strokeWidth='4'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
};

export default CheckIcon;
