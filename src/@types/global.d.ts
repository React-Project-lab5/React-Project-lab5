interface SearchFormProps {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setDetail: React.Dispatch<React.SetStateAction<string>>;
  createUsers: () => Promise<void>;
  getUsers: () => Promise<void>;
}
