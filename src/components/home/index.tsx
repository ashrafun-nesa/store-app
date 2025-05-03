"use client"
import { useEffect, useState } from "react";

interface InputData {
    id: number;
    input1: string;
    input2: string;
  }

export default function HomePage() {
    const [inputs, setInputs] = useState({ input1: '', input2: '' });
    const [data, setData] = useState<InputData[]>([]);
    const [latest, setLatest] = useState<InputData[]>([]);
    const [editId, setEditId] = useState<number | null>(null);

    const handleChange = (e: any) => {
        const {name, value} = e.target;

        setInputs(prev => ({
            ...prev,
            [name]: value,
        }))

    }

    const handleAdd = () => {
        if (inputs.input1 == "" && inputs.input2 == "") return;
        if(editId != null) {
           setData(prev => {
            const updated = [...prev]
            updated[editId] = {...inputs}
            return updated;
           })
           console.log({editId})
           setInputs({ input1: '', input2: '' });
           setEditId(null);
        }else{
            setData(prev => [...prev, inputs])
            setInputs({ input1: '', input2: '' });
        }
        
    }
    

    const handlePlus = () => {
        if (inputs.input1.trim() === "" && inputs.input2.trim() === "") return; 
        const newId = data.length;
        const newEntry: InputData = {
            id: newId,
            input1: inputs.input1,
            input2: inputs.input2
        };
        setData(prev => [...prev, newEntry]);
        setLatest(prev => [...prev, newEntry]);
        setInputs({ input1: '', input2: '' });
    };

    const handleDelete = (id: number) => {
        setLatest(prev => prev.filter(item => item.id !== id));
        setData(prev => prev.filter(item => item.id !== id));
    };

    const handleEdit = (item: any, id: number) => {
        console.log({id})
        setInputs({ input1: item.input1, input2: item.input2 });
        setEditId(id);
        console.log({editId})
    }
    
    return (
        <div className="flex flex-col items-center justify-center p-5">
            <div className="flex gap-2 mb-10">
                <input name="input1" className="border-1 rounded" value={inputs.input1} onChange={handleChange} type="text"  />
                <input name="input2" className="border-1 rounded" value={inputs.input2} onChange={handleChange} type="text"  />
                <button className="px-5 py-2 bg-gray-400 cursor-pointer " onClick={handleAdd}>Add</button>
                <button className="px-5 py-2 bg-gray-400 cursor-pointer " onClick={handlePlus}>Plus</button>
            </div>
            <div className="flex flex-col gap-3 mt-5 w-full max-w-md">
                {latest.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <input
                            className="border-2 rounded px-2 py-1 flex-1"
                            type="text"
                            defaultValue={item.input1}
                            
                        />
                        <input
                            className="border-2 rounded px-2 py-1 flex-1"
                            type="text"
                            defaultValue={item.input2}
                            
                        />
                        <button
                            className="px-3 py-1 bg-red-500 text-white rounded"
                            onClick={() => handleDelete(item.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            {data.length > 0 && (
                <table className="table-auto border-collapse border border-gray-400 mt-5">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">Input 1</th>
                            <th className="border border-gray-400 px-4 py-2">Input 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-gray-400 px-4 py-2">{item.input1}</td>
                                <td className="border border-gray-400 px-4 py-2">{item.input2}</td>
                                <td className="border border-gray-400 px-4 py-2"><button className=" bg-blue-800 text-white cursor-pointer border py-1 px-2" onClick={() => handleEdit(item, index)}>edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>

    )
}