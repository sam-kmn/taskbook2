import { MoonIcon, SunIcon } from "./Icons";
import { Switch, Match } from "solid-js";

const Navbar = (props) => {
  return (
    <header className="bg-white dark:bg-gray-900 dark:text-white">
      <nav className="container mx-auto flex flex-row justify-between items-center p-6">
        <div className="text-2xl tracking-widest">
          TaskBook 
          <span className="text-sm font-mono tracking-normal text-blue-600 ">v2</span>
        </div>
        {/* <button onClick={() => props.setDarkMode(!props.darkMode)}>test</button> */}
        <Switch>
          <Match when={props.darkMode === true}>
            <button onClick={() => props.setDarkMode(!props.darkMode)} className='text-gray-300' ><MoonIcon /></button>
          </Match>

          <Match when={props.darkMode === false}>
            <button onClick={() => props.setDarkMode(!props.darkMode)} className='text-amber-500'><SunIcon /></button>
          </Match>
        </Switch>
        
      </nav>
    </header>
  );
}
 
export default Navbar;