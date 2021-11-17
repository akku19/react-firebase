import { method } from 'lodash';
import React,{useState} from 'react'

const Contactform = () => {
    const [state, setstate] = useState({
        name:'',
        email:''
    })

    let name,value;

    const getdata = (e)=>{        
    name= e.target.name;
    value = e.target.value;
    setstate({...state, [name]:value});
    console.log(state);
    }

    const submitdata = async (e)=>{
        e.preventDefault();
        //const[name,email] = state;
        //console.log(`name ${name} and email is ${email}`);
        const data = await fetch('https://contactform-285e1-default-rtdb.firebaseio.com/akash.json',
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({name:state.name,email:state.email})
           }
        );
    }
    return (
        <div>
            <form method="POST" >
                <div className="container">
                    <div className="row">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Enter your Name" value={state.name}  onChange={getdata}/>
                    </div>

                    <div className="row">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Enter your Name" value={state.email}  onChange={getdata}/>
                    </div>

                    <div className="row">
                        
                        <input type="submit" name="submitform"  onClick={submitdata}/>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default Contactform
