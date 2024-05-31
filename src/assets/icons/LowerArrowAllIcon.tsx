import { twMerge } from 'tailwind-merge';

interface LowerArrowAllIconProps {
  className?: string;
}

const LowerArrowAllIcon = ({ className }: LowerArrowAllIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      id='Capa_1'
      x='0px'
      y='0px'
      viewBox='1 -0.3 10 10'
      width='10'
      height='10'
      className={twMerge(className)}
      fill='none'
    >
      <g>
        <path
          d='M6.78977 4.30939L6.78977 4.99121L1.30114 7.78667V6.69576L5.51136 4.66735L5.47727 4.73553V4.56507L5.51136 4.63326L1.30114 2.60485V1.51394L6.78977 4.30939Z'
          fill='black'
        />
        <line x1='8.5' y1='0.758789' x2='8.5' y2='8.75879' stroke='black' />
      </g>
    </svg>
  );
};

export default LowerArrowAllIcon;
