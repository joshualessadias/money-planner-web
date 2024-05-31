import { twMerge } from 'tailwind-merge';

interface ErrorIconProps {
  className?: string;
}

const ErrorIcon = ({ className }: ErrorIconProps) => {
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
        <circle cx='8.625' cy='8' r='7.5' stroke='#D00C0C' />
        <path
          d='M9.3054 3.27273L9.16477 9.43466H7.79261L7.65625 3.27273H9.3054ZM8.47869 12.0938C8.22017 12.0938 7.99858 12.0028 7.81392 11.821C7.6321 11.6392 7.54119 11.4176 7.54119 11.1562C7.54119 10.9006 7.6321 10.6818 7.81392 10.5C7.99858 10.3182 8.22017 10.2273 8.47869 10.2273C8.73153 10.2273 8.95028 10.3182 9.13494 10.5C9.32244 10.6818 9.41619 10.9006 9.41619 11.1562C9.41619 11.3295 9.37216 11.4872 9.28409 11.6293C9.19886 11.7713 9.08523 11.8849 8.94318 11.9702C8.80398 12.0526 8.64915 12.0938 8.47869 12.0938Z'
          fill='#D00C0C'
        />
      </g>
    </svg>
  );
};

export default ErrorIcon;
