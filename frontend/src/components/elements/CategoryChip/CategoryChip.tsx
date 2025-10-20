import { memo } from 'react';
import { Chip } from '@mui/material';
import {
  DirectionsCar,
  LocalHospital,
  Home,
  Favorite,
  Business,
  Flight,
  Category as CategoryIcon,
} from '@mui/icons-material';
import type { ClaimCategory } from '@types';

interface CategoryChipProps {
  category: ClaimCategory;
  size?: 'small' | 'medium';
}

const getCategoryConfig = (category: ClaimCategory) => {
  const configs = {
    AUTO: { 
      icon: <DirectionsCar />, 
      color: '#3b82f6',
      label: 'Auto',
    },
    HEALTH: { 
      icon: <LocalHospital />, 
      color: '#ef4444',
      label: 'Health',
    },
    HOME: { 
      icon: <Home />, 
      color: '#f59e0b',
      label: 'Home',
    },
    LIFE: { 
      icon: <Favorite />, 
      color: '#ec4899',
      label: 'Life',
    },
    PROPERTY: { 
      icon: <Business />, 
      color: '#8b5cf6',
      label: 'Property',
    },
    TRAVEL: { 
      icon: <Flight />, 
      color: '#14b8a6',
      label: 'Travel',
    },
    OTHER: { 
      icon: <CategoryIcon />, 
      color: '#64748b',
      label: 'Other',
    },
  };

  return configs[category] || configs.OTHER;
};

const CategoryChipComponent = ({ category, size = 'medium' }: CategoryChipProps) => {
  const categoryInfo = getCategoryConfig(category);

  return (
    <Chip
      icon={categoryInfo.icon}
      label={categoryInfo.label}
      sx={{
        bgcolor: `${categoryInfo.color}15`,
        color: categoryInfo.color,
        borderColor: categoryInfo.color,
        fontWeight: 500,
        '& .MuiChip-icon': {
          color: categoryInfo.color,
        },
      }}
      variant="outlined"
      size={size}
    />
  );
};

export const CategoryChip = memo(CategoryChipComponent);

