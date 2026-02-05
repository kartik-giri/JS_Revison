import { useRef, useState } from "react";
import { CloseIcon } from "../../Icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";

  // enum contentType {
  //   video = "video",
  //   article= "article"
  // }

  const contentType={
    youtube:"youtube",
    twitter:"twitter"
  }as const
// interface ModalProps {}

const CreateContentModal = ({ open, onClose }: {open:boolean, onClose:()=>void}) => {

  // 1. Create a Type from your object
  type ContentType = typeof contentType[keyof typeof contentType];

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  // const typekRef = useRef<HTMLInputElement>(null);
  let [type,setType] = useState<ContentType>(contentType.youtube);

  const submit = async ()=>{
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    // const type = typekRef.current?.value;

    const response = await axios.post(`${BACKEND_URL}api/v1/content`,{
      link:link,
      type:type,
      title:title
    },
    {
      headers:{
        authorization: localStorage.getItem("jwt_Token")
      }
    }
  )
    
    alert(response.data.message)
    onClose();
  }
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
                    <Input ref={titleRef} placeholder="Title.." onchange={()=>{}}/>
                    <Input ref={linkRef} placeholder="Link.." onchange={()=>{}}/>
                </div>
                <div>
                  <div className="flex gap-2 my-4">
                  <Button text="Youtube" variant={type=== "youtube"? "Primary": "Secondary"} size="md" onclick={()=>setType(contentType.youtube)}/>
                  <Button text="X" variant={type=== "twitter"? "Primary": "Secondary"} size="md" onclick={()=>setType(contentType.twitter)}/>
                  </div>
                </div>
                <div className="flex justify-center">
                <Button variant="Primary" size="md" text="Submit" onclick={submit}/>
                </div>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateContentModal;


