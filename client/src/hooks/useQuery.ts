import { useHistory, useLocation } from 'react-router';
import { History, Location } from 'history';

export type UseQuery = {
  searchParams: URLSearchParams;
  getParam: (key: string) => string | null;
  setParam: (key: string, value: string) => void;
  history: History;
  location: Location;
};

const useQuery = (): UseQuery => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const getParam = (key: string) => searchParams.get(key);
  const setParam = (key: string, value: string) => {
    searchParams.set(key, value);
    history.push({ pathname: location.pathname, search: searchParams.toString() });
  };
  return { searchParams, getParam, setParam, history, location };
};

export default useQuery;
