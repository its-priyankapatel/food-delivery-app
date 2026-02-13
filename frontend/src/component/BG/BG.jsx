import { motion } from "framer-motion";
const BG = () => {
  const pizza = "https://res.cloudinary.com/driqu2cgm/image/upload/w_1000/q_auto/f_auto/v1770914429/pngwing.com_1_zflcx4.png";
  const brownBread = "https://res.cloudinary.com/driqu2cgm/image/upload/w_1000/q_auto/f_auto/v1770914413/pngwing.com_2_fctkkk.png";
  const frenchFries = "https://res.cloudinary.com/driqu2cgm/image/upload/w_1000/q_auto/f_auto/v1770914412/pngwing.com_3_n9s3hs.png";
  const pasta = "https://res.cloudinary.com/driqu2cgm/image/upload/w_1000/q_auto/f_auto/v1770914412/pngwing.com_4_ahv60r.png";
  const wheat = "https://res.cloudinary.com/driqu2cgm/image/upload/w_1000/q_auto/f_auto/v1770914411/pngwing.com_5_jraspy.png";
  return (
    <div className="h-screen w-full overflow-clip relative bg-white hidden md:block">
      <motion.img
        initial={{ x: -75, y: -75 }}
        animate={{ x: 1, y: 1 }}
        transition={{ duration: 1 }}
        src={pizza} alt={pizza} className="absolute h-80 -top-10 -left-20" />
      <motion.img
        initial={{ x: 75, y: -75 }}
        animate={{ x: 1, y: 1 }}
        transition={{ duration: 1 }}
        src={brownBread} alt={brownBread} className="absolute h-64 -top-10 -right-20" />
      <motion.img
        initial={{ x: 75, y: 75 }}
        animate={{ x: 1, y: 1 }}
        transition={{ duration: 1 }}
        src={pasta} alt={pasta} className="absolute h-75 -bottom-20 -right-20" />
      <motion.img
        initial={{ x: 100, y: 75 }}
        animate={{ x: 1, y: 1 }}
        transition={{ duration: 1 }}
        src={wheat} alt={wheat} className="absolute h-44 bottom-0 -left-25 -rotate-20 scale-x-[-1]" />
    </div>
  );
};

export default BG;
