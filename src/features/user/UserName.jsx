import { useSelector } from 'react-redux';

function UserName() {
  // o useSelector é uma função que permite acessar o estado global da aplicação do Redux
  const username = useSelector((state) => state.user.userName);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default UserName;
