import {
  FcElectricity,
  FcFilmReel,
  FcGlobe,
  FcSalesPerformance,
  FcSupport,
  FcWiFiLogo,
} from "react-icons/fc";
import { CategoryItem } from "./category-item";

const iconMap = {
  Anglais: <FcGlobe />,
  Espagnol: <FcGlobe />,
  "Développement web": <FcWiFiLogo />,
  Finances: <FcSalesPerformance />,
  Acteur: <FcFilmReel />,
  Electricien: <FcElectricity />,
  Menuisier: <FcSupport />,
};

export const Categories = ({ items }) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
          {...item}
        />
      ))}
    </div>
  );
};
