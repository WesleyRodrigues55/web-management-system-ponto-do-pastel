import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="h-screen flex items-center flex-col justify-center">
      <h1 className="text-4xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-4xl">{error.statusText || error.message}</i>
      </p>
    </div>
  );
}