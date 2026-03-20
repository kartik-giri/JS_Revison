import React from "react"

const Card = (props) => {
    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '20px',
            margin: '10px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
        }}>
            {props.children}
        </div>
    );
};

const App = () => {

  const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];

    return (
        <div>
          {/* Passing Container! compoenet as the children prop for ErrorBoundry component. */}
          <ErrorBoundary>
             <Container1/>
          </ErrorBoundary>

          <Container2/>
          <ProductList products={products}/>
            <Card>
              {/* Passing react elements or other components as children props to other compoenent */}
                <h2>Card Title</h2>
                <p>This is some content inside the card.</p>
            </Card>
            <Card>
                <h2>Another Card</h2>
                <p>This card has different content!</p>
            </Card>
        </div>
    );
};

const ProductList =({products})=>{
  return (
    <ul style={{backgroundColor:"lightGrey", width:"30vw", borderRadius:10, padding:10, listStyle:"none"}}>
      {products.map((product)=>{
        return <li key={product.id}>
          {product.title}
        </li>
      })}
    </ul>
  )
}


const Container1 = ()=>{

  //Our whole website has crashed cause one compoenet has throw an error.
  //In this case we should use error boundry. for function component we can use external lib cause it is the concept of class component.

  throw new Error("Error occured while fetch request!")
  return (
    <>
    <div style={{width:200, height:100, backgroundColor:"lightGrey", marginBottom:30}}>Container 1</div>
    </>
  )
}

const Container2 = ()=>{
  return (
    <>
   <div style={{width:200, height:100, backgroundColor:"lightGrey"}}>Container 2</div>
    </>
  )
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div style={{width:200, height:100, backgroundColor:"lightGrey", marginBottom:30}}>Sorry we can't load this tab cause of error...</div>
        }
//If no error render the prop component
        return this.props.children; 
    }
}
export default App
