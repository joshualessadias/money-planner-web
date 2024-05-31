import { twMerge } from 'tailwind-merge';

interface AccessesIconProps {
  className?: string;
}

const AccessesIcon = ({ className }: AccessesIconProps) => {
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
        <path
          d='M12.1168 9.44328C14.7077 9.44328 16.8081 7.55319 16.8081 5.22164C16.8081 2.89009 14.7077 1 12.1168 1C9.52588 1 7.42554 2.89009 7.42554 5.22164'
          strokeWidth='1.5'
        />
        <path
          d='M17.0001 9.44333C17.0001 7.01644 14.8138 5.04907 12.1169 5.04907C9.42005 5.04907 7.23389 7.01644 7.23389 9.44333C7.23389 11.308 8.52953 12.8916 10.3507 13.5298V20.9431L12.1169 23L13.8832 20.9431V13.5298C15.7045 12.8916 17.0001 11.308 17.0001 9.44333Z'
          strokeWidth='1.5'
        />
        <path
          d='M6.23381 12.4702L1.36734 16.8495L1 19.4278L3.86517 19.0972L8.73164 14.7179'
          strokeWidth='1.5'
        />
      </g>
    </svg>
  );
};

export default AccessesIcon;
