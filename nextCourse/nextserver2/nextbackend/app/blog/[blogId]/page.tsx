const Blog = async ({params}:{
    params:Promise<{
        blogId: string
    }>
})=>{

    const {blogId}  = await params
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${blogId}`);
    const resobj = await res.json();
    return (
        <>
        <h1>{resobj.title}</h1>
        <p>{resobj.completed? "Completed": "Not completed"}</p>
        </>
    )
}

export default Blog