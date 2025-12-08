const App = ()=>{
  return (
    <>
    <div>

      {/* Flex */}
      <div className="flex justify-around bg-amber-300">
        <p className="bg-red-500">Element 1</p>
        <p className="bg-red-500">Element 2</p>
        <p className="bg-red-500">Element 3</p>
      </div>

      {/* Grid */}
      <div className=" grid grid-cols-12 mt-6">
        <p className="col-span-6 bg-amber-300 border-rose-600 border-4">Element 1</p>
        <p className="col-span-3 bg-amber-300 border-rose-600 border-4">Element 2</p>
        <p className="col-span-3 bg-amber-300 border-rose-600 border-4">Element 3</p>

        <p className="col-span-6 bg-amber-300 border-rose-600 border-4 ">Element 1</p>
        <p className="col-span-3 bg-amber-300 border-rose-600 border-4">Element 2</p>
        <p className="col-span-3 bg-amber-300 border-rose-600 border-4">Element 3</p>
      </div>

      {/* Tailwind uses mobile first approach means with prefixes propeties will used for default here default means for mobile
      but to make site responsive for laptop or tab than we have to use breack points like sm and md means sm screen ke baad ye properties lgado */}
      {/* till mobile screen bg will be purple after, sm breakpoint till tab break bg will become red,
       md: from tab size till laptop size it will be amber,lg:than from laptop size to desktop it will be green  */}
      <div className="bg-purple-800 sm:bg-red-600 md:bg-amber-400 lg:bg-green-500">
        Responsive break points!
      </div>

      {/* Responsite container with grid it much more easy and clean */}
      <div className="md:grid grid-cols-10 mt-12">
        <div className="bg-amber-400 md:col-span-4">Child 1</div>
        <div className="bg-red-600 md:col-span-4">Child 2</div>
        <div className="bg-green-700 md:col-span-2">Child 3</div>
      </div>
    </div>
    </>
  )
}

export default App;