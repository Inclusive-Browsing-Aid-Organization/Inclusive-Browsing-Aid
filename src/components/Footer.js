import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center mt-4 space-x-4 p-2">
      <a
        href="https://efw0517.github.io/"
        className="text-newhite hover:text-nepink"
      >
        Help
      </a>
      <a href="https://github.com/Inclusive-Browsing-Aid-Organization/Inclusive-Browsing-Aid/issues" className="text-newhite hover:text-nepink">
        Feedback
      </a>
      <a
        href="https://github.com/Inclusive-Browsing-Aid-Organization/Inclusive-Browsing-Aid"
        className="text-newhite hover:text-nepink"
      >
        GitHub
      </a>
    </div>
  );
};

export default Footer;
