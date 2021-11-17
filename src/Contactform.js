import { method } from 'lodash';
import React,{useState,useEffect} from 'react'

const Contactform = () => {
    const [state, setstate] = useState({
        name:'',
        email:''
    })
    const [userdata, setuserdata] = useState([]);

   const getuserdata = useEffect( async () => {
    fetch(
        "https://contactform-285e1-default-rtdb.firebaseio.com/akash.json")
                    .then((res) => res.json())
                    .then((json) => {                        
                        const entries = Object.entries(json);
                        setuserdata(entries);
                         console.log(entries);
                    })
          
        
    }, [])

    let name,value;

    const getdata = (e)=>{        
    name= e.target.name;
    value = e.target.value;
    setstate({...state, [name]:value});
    //console.log(state);
    }

    const submitdata = async (e)=>{
        e.preventDefault();
      
        const data = await fetch('https://contactform-285e1-default-rtdb.firebaseio.com/akash.json',
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({name:state.name,email:state.email})
           }
        );
        if(data.status=='200'){
            alert('Data recived');
            //setuserdata({...state, [name]:value});
            fetch(
                "https://contactform-285e1-default-rtdb.firebaseio.com/akash.json")
                            .then((res) => res.json())
                            .then((json) => {                        
                                const entries = Object.entries(json);
                                setuserdata(entries);
                                 console.log(entries);
                            })
        }
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <table className="table">
  <thead>
    <tr>

      <th scope="col">Name</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
  {userdata.map((user,keys) => (
      <>
      {console.log(user.name)}
        <tr key={keys}>     
        <td>{user[1].name} </td>
        <td>{user[1].email}</td>
      </tr>
      </>
      ))}
    
  

  </tbody>
</table>
                    </div>
                </div>
            </div>
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
