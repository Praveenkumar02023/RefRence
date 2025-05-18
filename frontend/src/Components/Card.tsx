import { useEffect } from "react";
import { TwiiterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { DeleteIcon } from "../icons/DeleteIcon";

// Types
interface CardProps {
  title: string;
  link: string; 
  type : "youtube" | "twitter" | null
}

export const Card = ({ title, type, link }: CardProps) => {
  const isYouTube = (type === "youtube")
  const isTweet =  (type === "twitter")

  // Extract YouTube video ID
  const getYouTubeId = (url: string): string => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/;
    const match = url.match(regex);
    return match ? match[1] : url;
  };

  // Load Twitter widget script (only if a tweet is embedded)
  useEffect(() => {
    if (isTweet && typeof window !== "undefined") {
      const scriptExists = document.querySelector("script[src='https://platform.twitter.com/widgets.js']");
      if (!scriptExists) {
        const script = document.createElement("script");
        script.setAttribute("src", "https://platform.twitter.com/widgets.js");
        script.setAttribute("async", "true");
        script.setAttribute("charset", "utf-8");
        document.body.appendChild(script);
      } else {
        // Re-render existing widgets
        (window as any).twttr?.widgets?.load();
      }
    }
  }, [link]);

  return (
    <div className="mr-2 mt-2 w-2xs text-gray-700 bg-white rounded-xl shadow-md p-4 space-y-4 max-h-90 ">
      <div className="flex justify-between">
        {isTweet ? <TwiiterIcon size="lg"/> : <YoutubeIcon size="lg"/>}
        <h2 className="text-xl font-semibold">{title}</h2>
       <div className="cursor-pointer">
         {<DeleteIcon size="lg"/>}
       </div>
      </div>

      {isYouTube && (
        <div className="relative pb-[80%] h-0 overflow-hidden rounded-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${getYouTubeId(link)}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {isTweet && (
        <div className="max-h-64 overflow-auto">
          <blockquote
            className="twitter-tweet"
            data-lang="en"
            style={{ maxWidth: "100%" }}
          >
            <a href={link}></a>
          </blockquote>
        </div>
      )}

      {!isYouTube && !isTweet && (
        <p className="text-red-500">Unsupported content type.</p>
      )}
    </div>
  );
};
