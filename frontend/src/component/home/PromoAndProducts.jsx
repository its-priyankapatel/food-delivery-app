import React, { useEffect, useState } from 'react'
import promo1 from '../../assets/promos/promo_11.png'
import promo2 from '../../assets/promos/promo12.png'
import promo3 from '../../assets/promos/promo13.png'
import promo4 from '../../assets/promos/promo14.png'
import promo5 from '../../assets/promos/promo15.png'
import promo6 from '../../assets/promos/promo16.png'
import { motion, AnimatePresence } from 'framer-motion'

const PromoAndProducts = () => {

    const promos = [promo1, promo2, promo3, promo4, promo5, promo6];
    const [[current, direction], setCurrent] = useState([0, 0]);

    const paginate = (newDirection) => {
        setCurrent(([prev]) => {
            let next = prev + newDirection;

            if (next < 0) next = promos.length - 1;
            if (next >= promos.length) next = 0;

            return [next, newDirection];
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            paginate(1);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction > 0 ? -1000 : 1000,
            opacity: 0
        })
    };

    return (
        <div className='mt-5 md:mt-16 w-full flex flex-col items-center pt-14' id='PROMO'>

            <div className='relative w-[95%] md:w-[70%] aspect-3/1 overflow-hidden rounded-3xl bg-primary'>

                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                        key={current}
                        src={promos[current]}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, { offset }) => {
                            if (offset.x < -100) paginate(1);
                            else if (offset.x > 100) paginate(-1);
                        }}
                        className='absolute w-full h-full object-cover'
                    />
                </AnimatePresence>

                {/* Dots */}
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center'>
                    {promos.map((_, idx) => (
                        <div
                            key={idx}
                            className={`rounded-full transition-all duration-300 
            ${idx === current
                                    ? "size-2 md:size-3 bg-white"
                                    : "size-1 md:size-2 bg-white/60"
                                }`}
                        />
                    ))}
                </div>

            </div>

        </div>
    )
}

export default PromoAndProducts