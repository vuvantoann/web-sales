import axios from "./customize-axios";

function FecthAllUser (page) {
    return (
        axios.get(`/api/users?page= ${page}`)
    )
}


function PostCreateUser (name, job) {
    return (
        axios.post("/api/users", {name: name, job: job})
    )
}

function PutCreateUser (name, job) {
    return (
        axios.put("/api/users/2", {name: name, job: job})
    )
}

function DeleteCreateUser (id) {
    return (
        axios.delete("/api/users/2", {id: id})
    )
}




export {FecthAllUser, PostCreateUser, PutCreateUser, DeleteCreateUser };