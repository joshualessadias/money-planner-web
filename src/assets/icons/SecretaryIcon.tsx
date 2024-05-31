import { twMerge } from 'tailwind-merge';

interface SecretaryIconProps {
  className?: string;
}

const SecretaryIcon = ({ className }: SecretaryIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      id='Capa_1'
      x='0px'
      y='0px'
      viewBox='0 -2 24 18'
      width='24'
      height='24'
      className={twMerge('h-20 w-20', className)}
      fill='none'
    >
      <g>
        <path
          d='M16.269 5.03834V3.423C16.269 2.97694 15.9074 2.61534 15.4613 2.61534H7.38463L6.57696 1H2.53862L1.9015 2.27427C1.78934 2.49856 1.73096 2.74589 1.73096 2.99667V5.03834'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
        />
        <path
          d='M2.46855 13.9224H15.5314C15.9492 13.9224 16.298 13.6039 16.3358 13.1879L16.9966 5.91885C17.0396 5.44589 16.6672 5.03809 16.1923 5.03809H1.80773C1.3328 5.03809 0.960383 5.44589 1.00338 5.91885L1.6642 13.1879C1.70202 13.6039 2.05082 13.9224 2.46855 13.9224Z'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
        />
      </g>
    </svg>
  );
};

export default SecretaryIcon;
