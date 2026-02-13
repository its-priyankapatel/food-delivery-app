import React from 'react'
import { motion } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';

const MobileBG = () => {
    const thali = "https://res.cloudinary.com/driqu2cgm/image/upload/w_1000/q_auto/f_auto/v1771006564/pngwing.com_7_uxipud.png";
    const gulabjamun = "https://res.cloudinary.com/driqu2cgm/image/upload/w_1000/q_auto/f_auto/v1771006554/pngwing.com_9_bzrj5v.png";
    const dhaniya = "https://res.cloudinary.com/driqu2cgm/image/upload/w_1000/q_auto/f_auto/v1771006554/pngwing.com_8_o9zvic.png";
    const pizza = "https://res.cloudinary.com/driqu2cgm/image/upload/w_1000/q_auto/f_auto/v1770914429/pngwing.com_1_zflcx4.png";
    return (
        <div className='h-screen absolute w-full block md:hidden'>
            <motion.img
                initial={{ x: 75, y: -75 }}
                animate={{ x: 0, y: 0 }}
                transition={{ duration: 1 }}
                src={pizza} alt="pizza" className="absolute h-48 top-0 -right-10" />
            <motion.img
                initial={{ x: 75, y: 75, rotate: 45 }}
                animate={{ x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 1 }}
                src={thali} alt="Indian Thali" className="absolute h-56 -bottom-10 -right-5" />
            <HashLink smooth to="/#PROMO">
                <motion.img
                    src={dhaniya}
                    alt="dhaniya"
                    className="absolute h-20 bottom-[37%] left-[30%] z-10"
                    initial={{ y: -400, rotate: -10, x: 0 }}
                    animate={{
                        y: 0,
                        x: [0, -20, 20, -10, -10, -10, 30, 0], // side swing
                        rotate: [-10, 10, -5, 50, 5, 0] // natural rotation
                    }}
                    transition={{
                        y: {
                            delay: 0.5,
                            duration: 4,
                            ease: "easeIn"
                        },
                        x: {
                            delay: 0.5,
                            duration: 4,
                            ease: "easeInOut"
                        },
                        rotate: {
                            delay: 0.5,
                            duration: 4,
                            ease: "easeInOut"
                        }
                    }}
                />
            </HashLink>
            <motion.img
                initial={{ x: 75, y: 75, rotate: -45 }}
                animate={{ x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 1 }}
                src={gulabjamun} alt="gulab jamun" className="absolute h-40 bottom-32 -right-8" />

        </div>
    )
}

export default MobileBG