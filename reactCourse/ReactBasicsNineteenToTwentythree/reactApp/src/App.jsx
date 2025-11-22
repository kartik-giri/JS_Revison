import { useContext, useState, createContext, } from "react";
import Parent from "./Parent";


//useCOntext serves as the container to data that we want to share from higher level component to loweer level component directly.
const BulbContext = createContext();

//This compoenent takes application part and provides access of context values to all its decendants.
const BulbProvider =({children})=>{
   const [plug, setPlug] = useState(true); 
  return (
    <>
    <BulbContext.Provider value={{plug:plug, setPlug:setPlug}}>
      {children}
    </BulbContext.Provider>
    <Parent/>
    </>
  )
}

const App = () => {

  return (
    <>
    {/* //Passing the state from hiher level component to lowest level componet. */}
     {/* <LightBulbTwo plug={plug} setPlug={setPlug}/> */}
      <LightBulb />
     
      {/* Proider compoent wrap the part of application and provides the access to the context to all its decenants */}
      {/* As we can see it looks messy not clean the clean approach is to cerate provider compoent and wrap the application part as its childeren. */}
      {/* <BulbContext.Provider value={{plug:plug, setPlug:setPlug}}>
      <LightBulbTwo/>
      </BulbContext.Provider> */}

      {/* It looks clean and we can expose these function to external package more cleanly */}
      <BulbProvider>
        <LightBulbTwo/>
      </BulbProvider>
    </>
  );
};

const LightBulb = () => {
  const [flag, setFlag] = useState(true); //Roll up the state to the lowest common ancestor to the components who are sharing same state.
  //But is there better way to do state Management, YES we use state mngmt libs like zustand
  return (
    <>
      <BulbRender flag={flag} />
      <BulbToggle setFlag={setFlag} />
    </>
  );
};

const BulbRender = (props) => {
  return (
    <>
      {props.flag ? (
        <img
          src="https://thumbs.dreamstime.com/b/simple-light-bulb-line-icon-isolated-background-idea-sign-concept-simple-light-bulb-line-icon-isolated-white-background-idea-132619436.jpg"
          alt="Off bulb"
          width="200"
          height="200"
        ></img>
      ) : (
        <img
          src="https://as1.ftcdn.net/jpg/01/57/61/52/1000_F_157615259_sJofv2nBJDjoIJBduVYunJrGwjWOUUiD.jpg"
          alt="Off bulb"
          width="200"
          height="200"
        ></img>
      )}
      <img></img>
    </>
  );
};

const BulbToggle = ({ setFlag }) => {
  const toggleBulb = () => {
    setFlag((currentFlag) => {
      return !currentFlag;
    });
  };
  return (
    <>
      <button onClick={toggleBulb}>Toggle Bulb!</button>
    </>
  );
};





//Props drilling and Context API
//We are passing the props to intermediate component even though it is not using the prop and just passing to other lower component.
//This problem can be solved by context API
const LightBulbTwo = () => {
  return (
    <>
      {/* <BulbRenderTwo plug={plug} />
      <BulbToggleTwo setPlug={setPlug} /> */}
      <BulbRenderTwo  />
      <BulbToggleTwo />
    </>
  );
};

const BulbRenderTwo = () => {
  const {plug, plugSet } = useContext(BulbContext); //it allows us access to context value
  return (
    <>
      { plug? (
        <img
          src="https://thumbs.dreamstime.com/b/simple-light-bulb-line-icon-isolated-background-idea-sign-concept-simple-light-bulb-line-icon-isolated-white-background-idea-132619436.jpg"
          alt="Off bulb"
          width="200"
          height="200"
        ></img>
      ) : (
        <img
          src="https://as1.ftcdn.net/jpg/01/57/61/52/1000_F_157615259_sJofv2nBJDjoIJBduVYunJrGwjWOUUiD.jpg"
          alt="Off bulb"
          width="200"
          height="200"
        ></img>
      )}
      <img></img>
    </>
  );
};

const BulbToggleTwo = () => {
  const {plug, setPlug} = useContext(BulbContext); //it allows us access to context value
  const toggleBulb = () => {
    setPlug((currentPlug) => {
      return !currentPlug;
    });
  };
  return (
    <>
      <button onClick={toggleBulb}>Toggle Bulb!</button>
    </>
  );
};
export default App;
