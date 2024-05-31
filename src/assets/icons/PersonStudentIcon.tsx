import { twMerge } from 'tailwind-merge';

interface PersonStudentIconProps {
  className?: string;
}

const PersonStudentIcon = ({ className }: PersonStudentIconProps) => {
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
          <rect width='100' height='76' />
          <g id='Formul&#195;&#161;rio Externo - Desktop (Passo 1)'>
            <rect x='-375.5' y='-336.5' width='1379' height='775' rx='79.5' />
            <rect
              x='-375.5'
              y='-336.5'
              width='1379'
              height='775'
              rx='79.5'
              stroke='#ED8020'
            />
            <g id='Frame 2' clipPath='url(#clip0_2_16619)'>
              <g id='Frame 11'>
                <g id='ID 4'>
                  <g id='BG' filter='url(#filter0_d_2_16619)'>
                    <rect x='-62' y='-65' width='224' height='240' rx='16' />
                    <rect x='-61.5' y='-64.5' width='223' height='239' rx='15.5' />
                  </g>
                  <g id='Icone'>
                    <path
                      id='Vector'
                      d='M2 22.3239L50 2.5L98 22.3239L50 42.1479L2 22.3239Z'
                      stroke='#ED8020'
                      strokeWidth='4'
                      strokeLinejoin='round'
                    />
                    <path
                      id='Vector_2'
                      d='M98 22.584V44.3507'
                      stroke='#ED8020'
                      strokeWidth='4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      id='Vector_3'
                      d='M23.8184 32.7637V62.1253C23.8184 62.1253 34.8013 73.2959 50.0003 73.2959C65.1993 73.2959 76.1822 62.1253 76.1822 62.1253V32.7637'
                      stroke='#ED8020'
                      strokeWidth='4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <defs>
            <filter
              id='filter0_d_2_16619'
              x='-111'
              y='-100'
              width='322'
              height='338'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feMorphology
                radius='4'
                operator='dilate'
                in='SourceAlpha'
                result='effect1_dropShadow_2_16619'
              />
              <feOffset dy='14' />
              <feGaussianBlur stdDeviation='22.5' />
              <feComposite in2='hardAlpha' operator='out' />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
              />
              <feBlend
                mode='normal'
                in2='BackgroundImageFix'
                result='effect1_dropShadow_2_16619'
              />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='effect1_dropShadow_2_16619'
                result='shape'
              />
            </filter>
            <clipPath id='clip0_2_16619'>
              <rect width='800' height='454' transform='translate(-86 -191)' />
            </clipPath>
          </defs>
        </g>
      </svg>
    </div>
  );
};

export default PersonStudentIcon;
