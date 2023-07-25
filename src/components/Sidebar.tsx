import React from 'react'

const Sidebar = () => {
    return (
        <div className="w-48 bg-stone-600 h-screen flex justify-center">
            <div className="p-2 flex flex-col gap-6">
                <div className="p-4 bg-red-300 flex justify-center items-center rounded-md">
                    <h1>LOGO</h1>
                </div>
                <div className="flex flex-col gap-2">
                    <p>Dashboard</p>
                    <p>Outros</p>
                    <p>Sobre</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
