import { ShareIcon } from "../../Icons/ShareIcon";

interface CardProps {
  link: string;
  title: string;
  type: "twitter" | "youtube";
}
//break-inline-avoid Prevents a card from being split between columns.
const Card = (props: CardProps) => {
  return (
    <>
      <div className="bg-white rounded-md  p-4 border-2 border-gray-200 max-w-80 min-w-80 break-inside-avoid mb-4">
        <div className="flex justify-between">
          <div className="inline-flex items-center gap-2">
            <ShareIcon size="md" />
            <p className="text-lg">{props.title}</p>
          </div>
          <div className="inline-flex items-center gap-2 text-gray-500">
            <a href={props.link} target="_blank" className="cursor-pointer">
              <ShareIcon size="md" />
            </a>
            <ShareIcon size="md" />
          </div>
        </div>

        <div className="pt-2">
          {props.type === "youtube" ? (
            <iframe
              className="w-full"
              src={props.link.replace("youtu.be", "youtube.com/embed").replace("www.youtube.com/live", "youtube.com/embed")}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <blockquote className="twitter-tweet">
              <a href={props.link.replace("x", "twitter")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
