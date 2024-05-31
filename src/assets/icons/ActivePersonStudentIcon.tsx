import { twMerge } from 'tailwind-merge';

interface ActivePersonStudentIconProps {
  className?: string;
}

const ActivePersonStudentIcon = ({ className }: ActivePersonStudentIconProps) => {
  return (
    <div style={{ height: '80px', margin: '10px 0 -10px 0' }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'
        id='Capa_1'
        x='0px'
        y='0px'
        viewBox='0 0 100 100'
        width='100'
        height='80'
        className={twMerge('h-20 w-20', className)}
        fill='none'
      >
        <g>
          <path
            d='M2 21.8239L50 2L98 21.8239L50 41.6479L2 21.8239Z'
            stroke='white'
            strokeWidth='4'
            strokeLinejoin='round'
          />
          <path
            d='M98 21.584V43.3507'
            stroke='white'
            strokeWidth='4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M23.8184 31.7637V61.1253C23.8184 61.1253 34.8013 72.2959 50.0003 72.2959C65.1993 72.2959 76.1822 61.1253 76.1822 61.1253V31.7637'
            stroke='white'
            strokeWidth='4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </svg>
    </div>
  );
};

export default ActivePersonStudentIcon;
