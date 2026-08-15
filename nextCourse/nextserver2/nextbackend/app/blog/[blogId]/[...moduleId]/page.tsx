const course = async ({params}: {
    params: Promise<{
        moduleId: string[]
    }>
})=>{

    const {moduleId} = await params;
    return (
        <>
        {JSON.stringify(moduleId)}
        </>
    )
}

export default  course