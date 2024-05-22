import React from 'react';
import Slider from 'react-slick';
import AddToCart from "./AddToCart";
import {useRouter} from "next/router";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@fortawesome/fontawesome-free/css/all.css';

const ProductCarousel = ({ products }) => {

    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: 'block', background: 'transparent', right: '-25px' }}
                onClick={onClick}
            >
                <i className="fas fa-chevron-right fa-2x" style={{ color: 'black' }}></i>
            </div>
        );
    };

    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: 'block', background: 'transparent', left: '-25px' }}
                onClick={onClick}
            >
                <i className="fas fa-chevron-left fa-2x" style={{ color: 'black' }}></i>
            </div>
        );
    };

    const settings = {
        dots: products.length > 5,
        infinite: products.length > 5,
        speed: 500,
        slidesToShow: Math.min(products.length, 5),
        slidesToScroll: Math.min(products.length, 5),
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: products.length > 5,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(products.length, 3),
                    slidesToScroll: Math.min(products.length, 1),
                    infinite: products.length > 1,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: Math.min(products.length, 2),
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const router = useRouter();

    const clickCard = (pid) => {
        router.push({
            pathname: '/product/' + pid
        });
    };

    return (
        <Slider {...settings}>
            {products.map((product) => (
                <div key={product.id} style={{ padding: '0.5px' }}>
                    <div id={product.id} onClick={() => clickCard(product.id)} style={{ zIndex: 5, width: "90%"}} className="mb-4 d-flex align-items-stretch border-0">
                        <div id={product.id} className="card h-100 box-shadow position-relative border-0" style={{ zIndex: 4 }}>
                            <img src={product.imgUrl} className="card-img-top" alt={product.name} style={{ zIndex: 4 }} />
                            <div className="card-body d-flex flex-column" style={{ zIndex: 4 }}>
                                <h5 className="card-title fs-6 fw-normal text-center" style={{ minHeight: 50 }}>{product.name}</h5>
                                <p className="card-text text-center fw-bolder mt-1 mb-1">{product.price.toFixed(2)} DKK</p>
                                <AddToCart product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default ProductCarousel;