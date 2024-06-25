import { createContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(Session.user);

  useEffect(() => {
    Session.loadUser();
    setUser(Session.user);
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserContext;
