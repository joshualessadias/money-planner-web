import { twMerge } from 'tailwind-merge';

interface AcademicIconProps {
  className?: string;
}

const AcademicIcon = ({ className }: AcademicIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      id='Capa_1'
      x='0px'
      y='0px'
      viewBox='0 -1 24 18'
      width='22'
      height='24'
      className={twMerge('h-20 w-20', className)}
      fill='none'
    >
      <g>
        <path strokeWidth={1.5} d='M1 5.48 11 1l10 4.48-10 4.48L1 5.48Z' />
        <path
          strokeWidth={1.5}
          d='M21 5.54v4.918M5.545 7.84v6.635S7.834 17 11 17s5.454-2.525 5.454-2.525V7.84'
        />
      </g>
    </svg>
  );
};

export default AcademicIcon;
