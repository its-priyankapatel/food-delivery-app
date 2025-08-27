import icon1 from "../../assets/icons/1.png";
import icon2 from "../../assets/icons/2.png";
import icon3 from "../../assets/icons/3.png";
import icon4 from "../../assets/icons/4.png";
import icon5 from "../../assets/icons/5.png";
import icon6 from "../../assets/icons/6.png";
import icon7 from "../../assets/icons/7.png";
import icon8 from "../../assets/icons/8.png";
import icon9 from "../../assets/icons/9.png";
import icon10 from "../../assets/icons/10.png";
import icon11 from "../../assets/icons/11.png";
import icon12 from "../../assets/icons/12.png";
import icon13 from "../../assets/icons/13.png";
import icon14 from "../../assets/icons/14.png";
import icon15 from "../../assets/icons/15.png";
import icon16 from "../../assets/icons/16.png";
import icon17 from "../../assets/icons/17.png";
import icon18 from "../../assets/icons/18.png";
import icon19 from "../../assets/icons/8.png";
import icon20 from "../../assets/icons/12.png";
import icon21 from "../../assets/icons/3.png";
import icon22 from "../../assets/icons/15.png";
import icon23 from "../../assets/icons/6.png";
import icon24 from "../../assets/icons/7.png";
import icon25 from "../../assets/icons/8.png";
import icon26 from "../../assets/icons/9.png";
import icon27 from "../../assets/icons/10.png";
import icon28 from "../../assets/icons/11.png";
import icon29 from "../../assets/icons/12.png";
import icon30 from "../../assets/icons/13.png";
import icon31 from "../../assets/icons/14.png";
import "./row.css";
const Row = ({ reverse }) => {
  const icons = [
    icon1,
    icon2,
    icon3,
    icon4,
    icon5,
    icon6,
    icon7,
    icon8,
    icon9,
    icon10,
    icon11,
    icon12,
    icon13,
    icon14,
    icon15,
    icon16,
    icon17,
    icon18,
    icon19,
    icon20,
    icon21,
    icon22,
    icon23,
    icon24,
    icon25,
    icon26,
    icon27,
    icon28,
    icon29,
    icon30,
    icon31,
  ];

  return (
    <>
      {reverse ? (
        <div className="flex gap-8 row1 mt-8">
          {icons.reverse().map((icon, index) => (
            <img key={index} src={icon} alt={`icon-${index}`} className="h-8" />
          ))}
        </div>
      ) : (
        <div className="flex gap-8 row2 mt-8">
          {icons.map((icon, index) => (
            <img key={index} src={icon} alt={`icon-${index}`} className="h-8" />
          ))}
        </div>
      )}
    </>
  );
};

export default Row;
