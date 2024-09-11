import React from 'react';

const CarouselItem = ({ image, title }) => {
  return (
    <div className="flex flex-col justify-center items-center p-2">
      <img
        className="w-[7rem] h-[7rem] md:w-[10rem] md:h-[10rem] lg:w-[12rem] lg:h-[12rem] rounded-full object-cover object-center"
        src={image}
        alt={title}
      />
      <p className="py-2 font-semibold text-md text-gray-600 text-center">
        {title}
      </p>
    </div>
  );
};

export default CarouselItem;