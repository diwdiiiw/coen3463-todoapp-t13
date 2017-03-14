import axios from 'axios';
var TodoApi = {
    onAddTodo: (toDo)=>{
        return axios.post('/todo/addtodo',toDo)
        .then((res)=>{
            return res;
        }).catch((err)=>{
            throw(err);
        });
    },
    onGetTodo: (id)=>{ //[32312312]
        console.log(id);
        return axios.get('/api/v1/Todo')
            .then((mytodo)=>{
                return mytodo.data.filter(todo=>todo.user===id);
            });
    },

    getCountCompleted: (id)=>{ //[32312312]
        console.log(id);
        return axios.get('/api/v1/Todo')
            .then((mytodo)=>{
                return mytodo.data.filter(todo=>todo.user===id && todo.isCompleted===true);
            });
    },

    onGetOpen: (id)=>{ //[32312312]
        console.log(id);
        return axios.get('/api/v1/Todo')
            .then((mytodo)=>{
                return mytodo.data.filter(todo=>todo.isCompleted===false && todo.user===id);
            });
    },

    onGetCompleted: (id)=>{ //[32312312]
        console.log(id);
        return axios.get('/api/v1/Todo')
            .then((mytodo)=>{
                return mytodo.data.filter(todo=>todo.isCompleted===true && todo.user===id);
            });
    },

    onEdit: (id,field,value)=>{
        console.log(value);
        return axios.patch('/todo/'+id+'/'+field+'/'+value)
            .then(res=>{
                return res;
            }).catch(err=>{
                throw(err);
            });
    },

    onDelete: id=>{
        console.log(id);
        return axios.delete('/todo/'+id)
            .then(todo=>{
                return todo;
            }).catch(err=>{
                throw(err);
            });
    },

    onDelAllComplete: id=>{
        return axios.delete('/todo/delAllComplete/'+id)
            .then(res=>{
                return res;
            }).catch(err=>{
                throw(err);
            });
    },
}

export default TodoApi;