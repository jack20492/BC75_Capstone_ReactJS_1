import { PlayCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { chooseTrailer } from "../redux/action/user";
import { trailerUrlRegex, trailerYoutube } from "../constants/regex";
import { defaultTrailer } from "../constants/defaultValues";

export default function PlayVideo({
  isCard,
  trailer = defaultTrailer,
  className,
}) {
  const dispatch = useDispatch();

  const handleChooseTrailer = (trailerUrl) => {
    let videoId = "";

    if (trailerYoutube.test(trailerUrl) || trailerUrl.includes("embed")) {
      // Extract videoId from YouTube URL or embedded trailer URL
      const parts = trailerUrl.split("/");
      videoId = parts[parts.length - 1];
    } else {
      // Extract videoId from URL params (like https://www.youtube.com/watch?v=videoId)
      const url = new URL(trailerUrl);
      videoId = url.searchParams.get("v");
    }

    // Dispatch action to update trailer info in Redux
    dispatch(chooseTrailer(videoId || defaultTrailer));
  };

  return (
    <div
      className={`absolute hidden group-hover:block duration-300 ${
        isCard ? "top-1/4" : "top-1/2"
      } text-white left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer mx-auto z-40 ${className}`}
      onClick={() =>
        handleChooseTrailer(
          trailerUrlRegex.test(trailer) ? trailer : defaultTrailer
        )
      }
    >
      <PlayCircle size={52} />
    </div>
  );
}
