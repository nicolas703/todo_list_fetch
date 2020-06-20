import React, { useState, useEffect } from 'react'
import Notarea from './tareas'

const Apa = props => {

    const [tarea, setTarea] = useState([])
    const [input, setInput] = useState('')
    const id = (tarea.length) ? tarea[tarea.length - 1].id + 1 : 1

    const enviarTarea = (e, tarea, setTarea, input, setInput, data) => {
        e.preventDefault()
        const newList = [...tarea, { id: id, label: input, done: true }]

        setTarea(newList)
        setInput('')


        fetch('https://assets.breatheco.de/apis/fake/todos/user/nicolas703', {

            method: "PUT",
            body: JSON.stringify(newList),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log(resp.ok);
                console.log(resp.status);
                console.log(resp.text());
                console.log("tarea nueva:", input);

                return resp.json;
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('El error es ' + error);
            });


    }

    const eliminarTodo = (e) => {

        const borrarLista = [{ "label": 'Tarea ejemplo', "done": true }];
        const borrarList = [{ "label": 'Vacio', "done": true }];
        setTarea(borrarLista);
        setInput("");
        borrarFetch(borrarList);
    }

    const borrarFetch = (data) => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/nicolas703', {

            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log(resp.ok);
                console.log(resp.status);
                console.log(resp.text());
                console.log("borrado");
                return resp.json;
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('El error es ', error);
            });
    }

    const queHay = () => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/nicolas703', {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                console.log(res.status)
                console.log(res.text());
                return res.json;
            })
            .then(data => {
                console.log(data);
            })


            .catch(error => console.error('Error ', error));
        }
    

    const deleteTarea = (id, tarea, setTarea, data) => {
        setTarea(tarea.filter(note => note.id !== id))

        };

    useEffect(() => {
        queHay();
    });

    return (
        <>
            <h1 className="titulo">To Do List</h1>
            <div className="libreta">
                <div className="dib">
                    <form onSubmit={(e) => enviarTarea(e, tarea, setTarea, input, setInput)}>
                        <input placeholder="Añade una tarea" className="nota" 
                            onChange={(e) => setInput(e.target.value)} value={input} />
                        <button className="agg">+</button>
                        <button className='fas fa-trash-alt trash' onClick={(e) => eliminarTodo(e)}/>

                    </form>
                    {tarea.map((note, i) => (
                        <Notarea key={i} label={note.label} 
                            id={note.id} deleteTarea={(id) => deleteTarea(id, tarea, setTarea)}/>

                    ))}
                </div>
            </div>
        </>
    )

};

export default Apa;