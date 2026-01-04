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

export const Button = (props: ButtonProps) => {
  return (
    <>
      <button
        className={`text-center inline-flex items-center gap-2 cursor-pointer  ${
          props.variant === "Primary" ? "bg-myBlue" : "bg-myLightBlue"
        } border-none rounded-md ${props.size === "sm"? "py-1 px-4" : ""} ${
          props.size === "md" ? "py-1 px-6" : ""
        } ${props.size === "lg"? "py-2 px-8": ""}`}
        onClick={props.onclick}
      > 
        <span className={`${props.variant === "Primary" ? "text-myLightBlue": ""} ${props.variant==="Secondary"?"text-myBlue":""}`}>{props.startIcon}</span>
        <span className={`${props.variant === "Primary" ? "text-myLightBlue": ""} ${props.variant==="Secondary"?"text-myBlue":""}`}>{props.text}</span>
        <span className={`${props.variant === "Primary" ? "text-myLightBlue": ""} ${props.variant==="Secondary"?"text-myBlue":""}`}>{props.endIcon}</span>
      </button>
    </>
  );
};
