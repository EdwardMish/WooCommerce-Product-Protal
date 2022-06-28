import React from "react";

export default function Breadcrumb({ crumbs }) {
  const isLast = crumbs.length - 1;

  return (
    <nav className="container">
      <ol className="list-reset py-4 pl-4 rounded flex bg-grey-light text-grey">
        {crumbs.map((crumb, index) => {
          return index !== isLast ? (
            <li key={index} className="px-2" data-ref={index}>
              <a href={crumb} className="no-underline text-indigo">
                {crumb} /
                </a>
            </li>
          ) : (
            <li key={index} className="px-2" data-ref={index}>
              {crumb}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
