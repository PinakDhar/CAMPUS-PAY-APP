// Simple user data management using localStorage

export interface UserData {
  name: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  semester: string;
  avatar: string;
  bio: string;
  bloodGroup: string;
  dateOfBirth: string;
  enrollmentYear: string;
  address: string;
  emergencyContact: string;
  emergencyContactName: string;
}

const USER_DATA_KEY = 'campusPay_userData';
const AUTH_KEY = 'campusPay_isAuthenticated';

export const saveUserData = (data: Partial<UserData>) => {
  const currentData = getUserData();
  const updatedData = { ...currentData, ...data };
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedData));
};

export const getUserData = (): UserData => {
  const stored = localStorage.getItem(USER_DATA_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Default data if nothing is stored
  return {
    name: "Guest User",
    email: "guest@kiit.ac.in",
    phone: "+91 00000 00000",
    studentId: "0000000000",
    department: "Not Set",
    semester: "Not Set",
    avatar: "GU",
    bio: "Welcome to Campus Pay",
    bloodGroup: "Not Set",
    dateOfBirth: "Not Set",
    enrollmentYear: "Not Set",
    address: "Not Set",
    emergencyContact: "Not Set",
    emergencyContactName: "Not Set"
  };
};

export const setAuthenticated = (isAuth: boolean) => {
  localStorage.setItem(AUTH_KEY, isAuth.toString());
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
  // Optionally clear user data on logout
  // localStorage.removeItem(USER_DATA_KEY);
};

export const getInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const formatDate = (dateString: string): string => {
  if (!dateString || dateString === "Not Set") return "Not Set";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
};
