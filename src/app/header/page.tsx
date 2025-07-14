import NavBar from "./NavBar"
function Header() {
  return (
    <div className="max-w-5xl mx-auto bg-red-500 p-3 flex items-center justify-between">
        <h1 className="font-black text-lg">Positive</h1>
        <NavBar/>
    </div>
  )
}

export default Header