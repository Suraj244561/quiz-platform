import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

const getStored = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export function AppProvider({ children }) {
  const [cmsUser, setCmsUser] = useState(() => getStored('cmsUser'));
  const [studentUser, setStudentUser] = useState(() => getStored('studentUser'));

  useEffect(() => {
    if (cmsUser) localStorage.setItem('cmsUser', JSON.stringify(cmsUser));
    else localStorage.removeItem('cmsUser');
  }, [cmsUser]);

  useEffect(() => {
    if (studentUser) localStorage.setItem('studentUser', JSON.stringify(studentUser));
    else localStorage.removeItem('studentUser');
  }, [studentUser]);

  const value = useMemo(() => ({
    cmsUser,
    setCmsUser,
    studentUser,
    setStudentUser
  }), [cmsUser, studentUser]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
