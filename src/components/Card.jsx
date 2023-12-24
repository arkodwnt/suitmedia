import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';

const Card = () => {
  var settings = {
    1: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1390,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1390,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [product, setProduct] = useState();
  const [selectedSize, setSelectedSize] = useState('10');
  const [selectedPublish, setSelectedPublish] = useState('-published_at');

  const getCard = async () => {
    try {
      const response = await axios.get(`https://suitmedia-backend.suitdev.com/api/ideas?page[number]=1&page[size]=${selectedSize}&append[]=small_image&append[]=medium_image&sort=${selectedPublish}`);
      setProduct(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handler function to update the selected option
  const handleSelectChange = (event) => {
    setSelectedSize(event.target.value);
  };

  // Handler function to update the selected option
  const handleSelectPublish = (event) => {
    setSelectedPublish(event.target.value);
  };

  useEffect(() => {
    getCard();
  }, [selectedSize, selectedPublish]);

  return (
    <div className="h-auto w-full px-10 lg:px-[72px] my-10 flex flex-col gap-5">
      <form className="grid grid-cols-3 gap-4 mt-[-90px] z-10">
        <div>Showing 1-{selectedSize} of 100</div>
        <label className="ml-[180px] ">
          Show per page:
          <select name="card" id="card" value={selectedSize} onChange={handleSelectChange}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </label>
        <label className="ml-[145px] ">
          Sort by:
          <select name="sort" id="sort" value={selectedPublish} onChange={handleSelectPublish}>
            <option value="-published_at">Newlest</option>
            <option value="published_at">Latest</option>
          </select>
        </label>
      </form>

      <Slider {...settings}>
        {product?.map((item, i) => {
          return (
            <div key={i} className="p-2">
              <div className="w-[200px]  h-[150px] my-5">
                <img src={item.small_image[0].url} alt="" className=" w-[200px]  h-[150px] rounded-t-xl shadow-md" />
              </div>
              <div className="w-[200px] h-[120px]  bg-slate-0 rounded-b-xl shadow-md">
                <span className="text-[#607274] pl-5 pt-5 text-sm">{item.published_at}</span>
                <h1 className="text-black pl-5 pt-2 text-md">{item.title}</h1>
                {/* <p className="pl-5 text-sm">{item.desc}</p> */}
              </div>
              <div className="w-[200px]  h-[150px] my-5">
                <img src={item.small_image[0].url} alt="" className=" w-[200px]  h-[150px] rounded-t-xl shadow-md" />
              </div>
              <div className="w-[200px] h-[120px]  bg-slate-0 rounded-b-xl shadow-md">
                <span className="text-[#607274] pl-5 pt-5 text-sm">{item.published_at}</span>
                <h1 className="text-black pl-5 pt-2 text-md">{item.title}</h1>
                {/* <p className="pl-5 text-sm">{item.desc}</p> */}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Card;
