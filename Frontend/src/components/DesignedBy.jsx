import React from "react";
import byteleap from "../assets/byteleap-transparent.png";

const DesingedBy = () => {
  return (
    <>
      {/* Designed & Developed By Section */}
      <div className="bg-gradient-to-r from-[#3d6c26] to-[#124c5f] py-4 flex justify-center items-center text-white font-JosefinSans">
        {/* Company Logo */}
        <img
          src={byteleap}
          alt="ByteLeap Solutions"
          className="w-40 h-16 mr-2 object-cover"
        />

        <div className="flex flex-col items-center">
          <p className="text-sm">
            Designed & Developed by <strong>ByteLeap Solutions</strong>
          </p>
          <p className="text-sm">
            Contact:{" "}
            <a href="tel:+251932070575" className="text-[#b6910f]">
              +251 932 070 575
            </a>{" "}
            /{" "}
            <a href="tel:+251951051322" className="text-[#b6910f]">
              +251 951 051 322
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default DesingedBy;