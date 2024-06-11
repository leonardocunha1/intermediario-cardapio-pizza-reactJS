import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  // O useLoaderData é um hook que nos dá acesso aos dados que o loader retornou
  const menu = useLoaderData();
  //   console.log(menu);

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

// This function is called by the router to load data before rendering the component
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
