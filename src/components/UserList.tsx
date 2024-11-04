import { useEffect, useState } from "react";

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: string };
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  address: Address;
  company: Company;
  phone: string;
  username: string;
  website: string;
};

export const UserList: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchUserList() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setUserList(data);
    } catch (e) {
      setError("Failed to load users.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isLoading && !error && userList.length === 0 && (
        <div>No users found</div>
      )}
      {userList.length > 0 && (
        <div className="board">
          {userList.map((user) => (
            <div key={user.id} className="card">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
