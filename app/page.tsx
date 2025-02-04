"use client"

import { useState, useEffect } from "react"
import { Plus, Moon, Sun, Trash2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { motion, AnimatePresence } from "framer-motion"
import TypewriterComponent from "typewriter-effect"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 py-8">
      <div className="container mx-auto p-4 max-w-md">
        <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6"
            >
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white h-16">
                <TypewriterComponent
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Daily To-Do List Maker")
                      .pauseFor(500)
                      .typeString("<br>Created By Udit")
                      .start()
                  }}
                  options={{
                    delay: 50, // Faster typing speed
                  }}
                />
              </h1>
            </motion.div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Tasks</h2>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} className="ml-4" aria-label="Toggle dark mode">
                <motion.div animate={{ rotate: darkMode ? 360 : 0 }} transition={{ duration: 0.5 }}>
                  {darkMode ? (
                    <Moon className="h-4 w-4 text-yellow-400" />
                  ) : (
                    <Sun className="h-4 w-4 text-yellow-500" />
                  )}
                </motion.div>
              </Switch>
            </div>
            <div className="flex space-x-2 mb-4">
              <Input
                type="text"
                placeholder="Add a new todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
                className="flex-grow transition-all duration-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <Button
                onClick={addTodo}
                size="icon"
                className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <AnimatePresence>
              {todos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-2 group hover:shadow-md transition-all duration-300">
                    <Button
                      onClick={() => toggleTodo(todo.id)}
                      variant="ghost"
                      size="icon"
                      className={`${todo.completed ? "text-green-500" : "text-gray-400"} hover:text-green-600 transition-colors duration-300`}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </Button>
                    <span
                      className={`flex-grow ${todo.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-200"}`}
                    >
                      {todo.text}
                    </span>
                    <Button
                      onClick={() => deleteTodo(todo.id)}
                      variant="ghost"
                      size="icon"
                      className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

