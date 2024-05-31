import { twMerge } from 'tailwind-merge';

interface SettingsIconProps {
  className?: string;
}

const SettingsIcon = ({ className }: SettingsIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      id='Capa_1'
      x='0px'
      y='0px'
      viewBox='0 0 24 18'
      width='24'
      height='24'
      className={twMerge('h-20 w-20', className)}
      fill='none'
    >
      <g>
        <path
          d='M9.00008 11.3996C10.3256 11.3996 11.4001 10.3251 11.4001 8.99959C11.4001 7.67412 10.3256 6.59961 9.00008 6.59961C7.67461 6.59961 6.6001 7.67412 6.6001 8.99959C6.6001 10.3251 7.67461 11.3996 9.00008 11.3996Z'
          strokeLinecap='round'
          strokeWidth={1.5}
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M7.45515 2.09024C7.97203 0.636588 10.0279 0.636588 10.5447 2.09023C10.8703 3.00567 11.916 3.4388 12.7935 3.02169C14.1869 2.35934 15.6405 3.81298 14.9782 5.20639C14.5611 6.08389 14.9942 7.12958 15.9096 7.45515C17.3633 7.97203 17.3633 10.0279 15.9096 10.5447C14.9942 10.8703 14.5611 11.916 14.9782 12.7935C15.6405 14.1869 14.1869 15.6405 12.7935 14.9782C11.916 14.5611 10.8703 14.9942 10.5447 15.9096C10.0279 17.3633 7.97203 17.3633 7.45515 15.9096C7.12958 14.9942 6.08389 14.5611 5.20639 14.9782C3.81298 15.6405 2.35934 14.1869 3.02169 12.7935C3.4388 11.916 3.00567 10.8703 2.09023 10.5447C0.636588 10.0279 0.636588 7.97203 2.09024 7.45515C3.00567 7.12958 3.4388 6.08389 3.02169 5.20639C2.35934 3.81298 3.81298 2.35934 5.20639 3.02169C6.08389 3.4388 7.12958 3.00567 7.45515 2.09024Z'
          strokeLinecap='round'
          strokeWidth={1.5}
        />
      </g>
    </svg>
  );
};

export default SettingsIcon;
