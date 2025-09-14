import { TbBrandNexo } from "react-icons/tb";

const Header = () => {
  return (
    <div className="flexColSec">
      <div className="flex-center md:gap-4 sm:gap-3 gap-2 mt-10 ">
        <h1 className="text-3xl md:text-6xl lg:text-7xl  sm:text-5xl tracking-wide">
          BioScope
        </h1>
        <div className="text-[#e0c6f7] text-4xl sm:text-5xl md:text-6xl  lg:text-7xl">
          <TbBrandNexo />
        </div>
      </div>
      <p className="mt-1 sm:text-[18px] text-[14px] tracking-wider">
        Learn From PDF documents and images
      </p>
      <hr className="mt-9 lg:w-[70vw] sm:w-[65vw]  w-80 " />
    </div>
  );
};

export default Header;
