
 const Home =async ()=> {
  const data = await fetch("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details");
  const userData = await data.json();

  return (
    <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div className="border p-8 rounded">
                <div>
                    Name: {userData?.name}
                </div>
                
                {userData?.email}
            </div>
        </div>
    </div>
  );
}

export default  Home