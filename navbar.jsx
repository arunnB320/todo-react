import React from 'react'
const Navbar = () => {
    return (
        <>
            <nav className='bg-black text-white flex justify-between h-20 py-2 align-middle'>
                <div className='logo'><span className='font-bold text-xl mx-8'>iToDo</span></div>
                <ul className='flex gap-8 mx-9'>
                    <li className='cursor-pointer'>Home</li>
                    <li className='cursor-pointer'>About</li>
                    <li className='cursor-pointer'>Contact</li>
                </ul>

            </nav>
        </>
    )
}
export default Navbar;