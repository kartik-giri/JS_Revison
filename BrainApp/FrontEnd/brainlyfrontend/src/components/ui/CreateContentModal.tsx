import { CloseIcon } from "../../Icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";

// interface ModalProps {}

const CreateContentModal = ({ open, onClose }: {open:boolean, onClose:()=>void}) => {
  return (
    <>
      <div>
        {open && (
          <div className="w-screen h-screen fixed top-0 left-0 bg-slate-500/60 flex justify-center items-center">
            <span className="bg-white p-4 rounded-sm">
                <div className="flex justify-end cursor-pointer" onClick={onClose}>
                    <CloseIcon size="md"/>
                </div>
                <div className="">
                    <Input placeholder="Title.." onchange={()=>{}}/>
                    <Input placeholder="Link.." onchange={()=>{}}/>
                </div>
                <div className="flex justify-center">
                <Button variant="Primary" size="md" text="Submit" onclick={()=>{}}/>
                </div>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateContentModal;


