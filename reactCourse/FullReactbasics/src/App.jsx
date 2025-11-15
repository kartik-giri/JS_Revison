const App= ()=>{
  return (
    <>
    <div style={{backgroundColor:"#dfe6e9", height:"100vh", width:"100vw", display:"flex",flexDirection:"column",alignItems:"center" }}>
      <div>
         <PostComponent/>
      </div>
          <div>
         <PostComponent/>
      </div>
    </div>
    </>
  )
}
export default App;

const PostComponent = ()=>{
  
  return (
    <>
    <div style={{width:500,height:200, padding:10,margin:10, borderRadius:3, backgroundColor:"white"}}>
      <div style={{display: "flex", justifyContent:"left"}}>
        <img src={"https://media.istockphoto.com/id/931336618/vector/clock-vector-icon-isolated.jpg?s=612x612&w=0&k=20&c=I8EBJl8i6olqcrhAtKko74ydFEVbfCQ6s5Pbsx6vfas="} alt="ProfilePic"
        style = {
          {height: 40, width:40, paddingTop:9}
        } />
        <div style={{paddingLeft:8}} >
          <p style={{fontSize:15}}>100X Devs</p>
          <p style={{fontSize:12}}>1,023 Followers</p>
          <p style={{fontSize:12}}>12m</p>
        </div>
      </div>

      <div>
        <p>Wanna know how our devs are earning $3000 in bounties?</p>
      </div>
    </div>
    </>
  )
}