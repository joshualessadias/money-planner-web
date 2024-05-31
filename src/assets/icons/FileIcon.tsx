interface FileIconProps {
  className?: string;
}

const FileIcon = ({ className }: FileIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      className=''
      height='14'
      viewBox='0 0 14 14'
      fill='none'
    >
      <path
        d='M7.00117 8.8V1M7.00117 1L8.80117 3.1M7.00117 1L5.20117 3.1'
        stroke='#000000'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.6 13.0001H9.4C11.097 13.0001 11.9456 13.0001 12.4728 12.4729C13 11.9457 13 11.0972 13 9.40012V8.80012C13 7.10308 13 6.25456 12.4728 5.72734C12.0117 5.26631 11.305 5.20844 10 5.20117M4 5.20117C2.69498 5.20844 1.98824 5.26631 1.52721 5.72734C1 6.25456 1 7.10308 1 8.80012V9.40012C1 11.0972 1 11.9457 1.52721 12.4729C1.70709 12.6528 1.92437 12.7713 2.2 12.8494'
        stroke='#000000'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default FileIcon;
