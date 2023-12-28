import { useLocation } from 'react-router-dom';

export default function useActiveLink(path: string) {
  const location = useLocation();

  return {
    isActive: path ? location.pathname.includes(path) : false,
  };
}
