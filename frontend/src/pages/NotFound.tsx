import {  useNavigate } from "react-router-dom";
import Button from "../components/ui/button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <img
          src="404.gif"
          alt="Lost animation"
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </div>
      <p className="text-xl text-white text-center max-w-md mt-5!">
        The page you're looking for doesn't exist. Don't worry, let's get you
        back on track.
      </p>
      <Button
        onClick={() => {
          navigate("/")
        }}
        variant="primary"
        className="mt-10!"
      >
        Take Me Home
      </Button>
    </div>
  );
}

export default NotFound;
