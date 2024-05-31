"use client";

interface ButtonProps {
  label?: string;
  icon?: React.ReactNode;
  styleType?:
    | "contained"
    | "outlined"
    | "text"
    | "containedError"
    | "announcementButton";
  type?: "button" | "submit";
  color?: string;
  hoverColor?: string;
  paddingX?: string;
  shadow?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  width?: string;
  startIcon?: any;
  heigth?: string;
}

export const Button = ({
  width = "min-w-[190px]",
  styleType = "outlined",
  type = "button",
  icon,
  startIcon = "",
  label,
  paddingX = "10",
  shadow = "md",
  onClick,
  heigth = "h-16",
  disabled = false,
  color = "--primary",
  hoverColor = "--hover",
  className,
}: ButtonProps) => {
  const buttonStyle = {
    contained: `bg-[${color}] text-white hover:bg-[${hoverColor}]`,
    containedError: `bg-[--error] text-white hover:bg-[--error-hover]`,
    outlined: `border-[1px] border-[${color}] text-[${color}] hover:bg-[rgba(0,0,0,0.05)]`,
    text: `text-[${color}] hover:text-[${hoverColor}] shadow-none underline`,
    announcementButton: `text-[${color}] shadow-none flex gap-2 text-2xl text-[--primary] font-semibold`,
  };
  const borderBottomForP = () => {
    if (styleType == "announcementButton") {
      return `border-b-2 ${buttonStyle[styleType]} border-[--primary]`;
    }
  };

  const paddingXOptions = `px-${paddingX}`;
  const shadowOptions = `shadow-${shadow}`;
  const disabledStyle =
    disabled &&
    "cursor-not-allowed opacity-50 hover:cursor-not-allowed hover:opacity-50";

  return (
    <button
      onClick={() => !disabled && onClick && onClick()}
      type={type}
      className={`
        flex ${heigth} ${width} 
        items-center
        justify-center rounded-xl text-lg
        font-bold transition-all duration-300 ease-in-out
        
        ${buttonStyle[styleType]}
        ${paddingXOptions}
        ${shadowOptions}
        ${disabledStyle}
        
      `}
    >
      {startIcon}
      {label && <p className={`${icon && "ml-4"}  `}></p>}
      {label && <p className={`${borderBottomForP()} `}>{label}</p>}
      {icon && <div className="ml-2">{icon}</div>}
    </button>
  );
};
