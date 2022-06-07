import { createEffect, createSignal, onMount, Switch, Match, Show } from "solid-js";
import Navbar from "./components/Navbar";
import {DeleteIcon} from './components/Icons'
import { v4 } from "uuid";

const App = () => {

  const initialValue = [
    {name: 'Navbar', state: true},
    {name: 'Clear all', state: true},
    {name: 'Tasks list', state: true},
    {name: 'Add new task', state: true},
    {name: 'Toggle task state', state: true},
    {name: 'Delete tasks', state: false},
    {name: 'Local Storage', state: false},
  ]
  const [input, setInput] = createSignal('')
  const [edit, setEdit] = createSignal(false)
  const [tasks, setTasks] = createSignal([])
  const [darkMode, setDarkMode] = createSignal(true)

  const clearTasks = () => setTasks([])
  const deleteTask = id => setTasks(tasks().filter(task => task.id !== id))
  const toggleTask = id => setTasks(tasks().map(task => task.id === id ? {...task, state:!task.state} : task))
  const addTask = (e) => {
    e.preventDefault()
    if (tasks().find(task => task.name === input())) return
    setTasks([...tasks(), {name: input(), state: false, id: v4()}])
    setInput('')
  }
  const editTask = id => {
    return event => setTasks(tasks().map(task => task.id === id ? {...task, name: event.target.value} : task));
  }
  
  onMount(() => {
    const storedTasks = window.localStorage.getItem('tasks')
    setTasks(JSON.parse(storedTasks) || initialValue)
  })

  createEffect(() => tasks().length === 0 && setEdit(false))
  createEffect(() => window.localStorage.setItem('tasks', JSON.stringify(tasks())))
  // createEffect(() => console.log('tasks', tasks()))

  return (
    <div className={darkMode() ? 'dark' : ''}>
      <div className="h-screen flex flex-col text-black bg-white dark:text-white dark:bg-gray-800 ">
        
        <Navbar darkMode={darkMode()} setDarkMode={setDarkMode} />
        
        <div className="w-full sm:w-10/12 md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto p-5">
          <header className="flex flex-row justify-between items-center py-5 ">
            <div className="text-3xl">Your tasks</div>
            <div className="flex gap-3">
              <Show when={tasks().length > 0}>
                <button onClick={() => setEdit(!edit())} className="px-3 py-1 text-gray-400 border border-gray-400 rounded-lg hover:text-white hover:border-white transition duration-200">Edit</button>
              </Show>
              <button onClick={clearTasks} className="px-3 py-1 text-gray-400 border border-gray-400 rounded-lg hover:text-red-400 hover:border-red-400 transition duration-300">Clear all</button>
            </div>
          </header>

         
          <div className="flex flex-col dark:bg-gray-900 w-full p-1 rounded-lg shadow-2xl text-lg">
            <For each={tasks()}> 
            { (task) =>
              <div className="flex flex-row items-center gap-2 px-3 py-2">
                <Switch>
                  <Match when={edit() === false}>
                    <div onClick={[toggleTask, task.id]} className={`p-2 rounded-full border ${task.state ? 'bg-blue-500 border-blue-500' : 'border-gray-600'}`}></div>
                    <div>{task.name}</div>
                  </Match>
                  <Match when={edit() === true}>
                    <button onClick={[deleteTask, task.id]} className='text-red-400'> <DeleteIcon /> </button>
                    <input type="text" className="bg-inherit" placeholder="input" value={task.name} onChange={editTask(task.id)} />
                  </Match>
                </Switch>
              </div>          
            }
            </For>

            <Show when={!edit()}>
              <form onSubmit={addTask} className="flex flex-row justify-center items-center">
                <input type="text" value={input()} onInput={e => setInput(e.target.value)} className="flex-1 px-3 py-1 bg-inherit" placeholder="New task..."  />
                <button type="submit" className="px-3 py-1 text-gray-400 border border-gray-400 rounded-lg hover:text-blue-400 hover:border-blue-400 transition duration-200">Add</button>
              </form>
            </Show>

          </div>

        </div>
      </div>
    </div>
  )
}

export default App;
