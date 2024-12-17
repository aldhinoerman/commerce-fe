import React from "react";

interface ErrorFetchProps {
  title: string;
  description: string;
  action: () => void;
}

function ErrorFetch({ title, description, action }: ErrorFetchProps) {
  return (
    <div className="text-center w-full">
      <h4>{title}</h4>
      <p>{description}</p>
      <button onClick={action} className="btn btn-primary">
        Retry
      </button>
    </div>
  );
}

export default ErrorFetch;
