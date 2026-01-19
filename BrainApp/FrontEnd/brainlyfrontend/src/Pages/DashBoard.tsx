import Card from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { PlusIcon } from "../Icons/PlusIcon";
import { ShareIcon } from "../Icons/ShareIcon";
import CreateContentModal from "../components/ui/CreateContentModal";
import { useState } from "react";
import { SideBar } from "../components/ui/SideBar";
import { SideButton } from "../components/ui/SideButton";
import { XIcon } from "../Icons/XIcon";
import { VideoIcon } from "../Icons/VidoeIcon";
import { BrainIcon } from "../Icons/BrainIcon";
import { useContent } from "../hooks/useContent";

const DashBoard = () => {
  const [modaLOpen, setModal] = useState(false);
  const content = useContent();
  console.log(content)

  // const contentList = content.map((elem)=>{
  //   return (
  //     <Card
  //             link= {elem.link}
  //             title="Modi tweet"
  //             type="twitter"
  //           />
  //   )
  // })

  let sideIconsArr = [
    <SideButton text="Tweets" Icon={<XIcon size="md"/>} />,
    <SideButton text="Videos" Icon={<VideoIcon size="md" />} />,
  ];
  return (
    <>
      <div className="flex justify-between min-h-screen bg-sky-50">
        <div>
          <SideBar sideIcon={sideIconsArr} logo={< BrainIcon size="lg" />} />
        </div>

        <div className="">
          <CreateContentModal
            open={modaLOpen}
            onClose={() => {
              setModal(false);
            }}
          />
          <div className="flex items-baseline justify-between  mr-8 mt-6">
            <div className="font-bold text-2xl">All Notes</div>
            <div className="flex gap-4">
              <Button
                variant="Secondary"
                size="lg"
                text="Share Brain"
                startIcon={<ShareIcon size="md" />}
                onclick={() => console.log("Share Brain")}
              />
              <Button
                variant="Primary"
                size="lg"
                text="Add Content"
                startIcon={<PlusIcon size="md" />}
                onclick={() => {
                  setModal(true);
                }}
              />
            </div>
          </div>

          {/* <div className=" grid md:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"> */}
          <div className="columns-1 sm:columns-2 md:columns-2 md:gap-4 lg:columns-3 lg:gap-8 mt-8 mr-8">

            {content.map(({link,title, type})=>{
              return (
                  <Card
              link={link}
              title={title}
              type={type}
            />
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
