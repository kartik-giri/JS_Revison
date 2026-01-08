//Create a gneric button component.

import type { ReactElement } from "react";

//Type for button props type.
export interface ButtonProps {
  variant: "Primary" | "Secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: any; //ReactElement is type means other react component,
  endIcon?: any;
  onclick: () => void;
}

const variantStyle = {
    Primary: "bg-myBlue text-myLightBlue",
    Secondary: "bg-myLightBlue text-myBlue"
}

const sizeStyle = {
    sm:"py-0 px-1  text-sm",
    md:"py-1 px-6 text-md",
    lg:"py-2 pl-6 pr-3 text-lg"
}
export const Button = (props: ButtonProps) => {
  return (
    <>
      <button
        className={`text-center inline-flex items-center gap-2 cursor-pointer border-none rounded-md ${variantStyle[props.variant]} ${sizeStyle[props.size]}   `}
        onClick={props.onclick}
      > 
        <span >{props.startIcon}</span>
        <span >{props.text}</span>
        <span>{props.endIcon}</span>
      </button>
    </>
  );
};
