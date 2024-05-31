import { twMerge } from 'tailwind-merge';

interface RegistrationIconProps {
  className?: string;
}

const RegistrationIcon = ({ className }: RegistrationIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      id='Capa_1'
      x='0px'
      y='0px'
      viewBox='-1 -1 24 18'
      width='24'
      height='24'
      className={twMerge('h-20 w-20', className)}
      fill='none'
    >
      <g>
        <path
          d='M16.2475 5.36514L5.74197 15.9395C4.80381 16.8927 1.9982 17.3291 1.3167 16.6966C0.635213 16.0641 1.13083 13.2403 2.06898 12.287L12.5746 1.7127C13.0597 1.24769 13.7062 0.991978 14.376 1.00019C15.0458 1.00841 15.6859 1.27991 16.1596 1.75669C16.6333 2.23346 16.903 2.87776 16.9112 3.55197C16.9194 4.22619 16.6653 4.87689 16.2033 5.36514H16.2475Z'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.9999 17H9.03442'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
};

export default RegistrationIcon;
