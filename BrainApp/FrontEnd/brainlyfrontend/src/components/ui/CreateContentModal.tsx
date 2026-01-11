import { CloseIcon } from "../../Icons/CloseIcon";
import { Button } from "./Button";

interface ModalProps {}

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

const Input = ({placeholder,onchange}:{placeholder: string, onchange:()=>void})=>{
    return (
        <>
        <div>
            <input type="text" placeholder={placeholder} className="px-4 py-2 w-100 border rounded-sm my-2 border-slate-200" onChange={onchange} />
        </div>
        </>
    )
}
